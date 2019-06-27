// Imports
import styles from "./styles";

// Libraries
import React, { Component } from "react";
import { View, Text, Dimensions, Animated } from "react-native";
import PropTypes from "prop-types";
import Interactable from "react-native-interactable";

//
const { width, height } = Dimensions.get("window");

//
class component extends Component {
  //

  constructor(props) {
    super(props);

    //
    this.childrenRefs = [];

    //
    this.children = Array.isArray(props.children)
      ? Object.assign([], props.children)
      : [props.children];

    //
    this.childrenAnimated = [
      new Animated.Value(0),
      ...this.children.map(() => {
        return new Animated.Value(0);
      })
    ];

    //
    this.state = {
      containerWidth: width,
      containerHeight: height,
      activeCard: this.children.length - 1,
      activeLastCard: null,
      isSuperlike: false
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  //

  setActiveCard = (index, actionCallback) => {
    this.setState(
      {
        activeCard: index - 1,
        activeLastCard: index
      },
      () => {
        actionCallback(index);
        this.canBeUndone();
        this.onCardIsOver(index);
      }
    );
  };

  onLike = index => {
    this.setActiveCard(index, this.props.onLike);
  };

  onDislike = index => {
    this.setActiveCard(index, this.props.onDislike);
  };

  onSuperlike = index => {
    this.setActiveCard(index, this.props.onSuperlike);
  };

  onCardIsOver = index => {
    if (index === 0) {
      this.props.onCardIsOver();
    }
  };

  canBeUndone = () => {
    if (this.state.activeCard <= 0) {
      this.props.canBeUndone(false);
    } else {
      this.props.canBeUndone(true);
    }
  };

  like = () => {
    this.childrenRefs[this.state.activeCard].snapTo({ index: 1 });
  };

  dislike = () => {
    this.childrenRefs[this.state.activeCard].snapTo({ index: 2 });
  };

  superlike = () => {
    this.setState({ isSuperlike: true }, () => {
      this.childrenRefs[this.state.activeCard].snapTo({ index: 1 });
    });
  };

  undo = () => {
    if (this.state.activeLastCard !== null) {
      this.props.onUndo(this.state.activeLastCard);
      this.childrenRefs[this.state.activeLastCard].snapTo({ index: 0 });
      this.setState(prevState => {
        return {
          activeCard: prevState.activeLastCard,
          activeLastCard: prevState.activeLastCard
        };
      });
    }
  };

  //

  renderCard = (item, index) => {
    if (
      this.state.activeCard === index ||
      this.state.activeCard - 1 === index ||
      this.state.activeLastCard === index
    ) {
      return item;
    }
  };

  renderCards = () => {
    //
    let { containerWidth } = this.state;
    let { inactiveCardScale } = this.props;

    //
    this.props.onAnimated(this.childrenAnimated[this.state.activeCard]);

    //
    return this.children.map((item, index) => {
      //
      if (item.type.displayName !== "Card") {
        console.error("Cardstack only receives the Card component.");
      }

      //
      let rotate = this.childrenAnimated[index].interpolate({
        useNativeDriver: true,
        inputRange: [-containerWidth, 0, containerWidth],
        outputRange: [
          "-" + this.props.activeCardRotate + "deg",
          "0deg",
          this.props.activeCardRotate + "deg"
        ]
      });

      //
      let scaleDefault =
        index === this.children.length - 1 ? 1 : inactiveCardScale;

      //
      let scale = this.childrenAnimated[index + 1].interpolate({
        useNativeDriver: true,
        inputRange: [-containerWidth, 0, containerWidth],
        outputRange: [1, scaleDefault, 1]
      });

      //
      return (
        <Interactable.View
          style={[styles.cards]}
          ref={ref => {
            this.childrenRefs[index] = ref;
          }}
          animatedValueX={this.childrenAnimated[index]}
          horizontalOnly={true}
          snapPoints={[
            { x: 0, y: 0 },
            { x: containerWidth + 75, y: 0 },
            { x: -(containerWidth + 75), y: 0 }
          ]}
          alertAreas={[
            {
              id: "like", // and superlike
              influenceArea: { right: containerWidth }
            },
            {
              id: "dislike",
              influenceArea: { left: -containerWidth }
            }
          ]}
          onAlert={event => {
            if (event.nativeEvent.like === "leave") {
              if (this.state.isSuperlike) {
                this.setState({ isSuperlike: false }, () => {
                  this.onSuperlike(index);
                });
              } else {
                this.onLike(index);
              }
            } else if (event.nativeEvent.dislike === "leave") {
              this.onDislike(index);
            }
          }}
        >
          <Animated.View
            style={{
              flex: 1,
              transform: [{ rotate }, { scale }],
              padding: this.props.padding
            }}
          >
            {this.renderStampsContent(index)}
            {this.renderCard(item, index)}
          </Animated.View>
        </Interactable.View>
      );
    });
  };

  renderStampsContent = index => {
    //
    let activeAnimated = this.childrenAnimated[this.state.activeCard];

    //
    if (index === this.state.activeCard) {
      return (
        <View
          style={[
            styles.overlay,
            { zIndex: 999998, margin: this.props.padding }
          ]}
          pointerEvents="none"
        >
          {this.props.renderStamps(
            activeAnimated === undefined
              ? new Animated.Value(0)
              : activeAnimated,
            this.state.activeCard
          )}
        </View>
      );
    } else {
      return null;
    }
  };

  renderOverlayContent = () => {
    //
    let activeAnimated = this.childrenAnimated[this.state.activeCard];

    return (
      <View
        style={[styles.overlay, { zIndex: 999998 }]}
        pointerEvents="box-none"
      >
        {this.props.renderOverlay(
          activeAnimated === undefined ? new Animated.Value(0) : activeAnimated
        )}
      </View>
    );
  };

  render() {
    //
    if (this.state.activeCard === -1 && this.props.renderNoMoreCard !== null) {
      return this.props.renderNoMoreCard();
    }

    //
    return (
      <View
        style={[styles.container, this.props.style]}
        onLayout={({ nativeEvent }) => {
          this.setState({
            containerWidth: nativeEvent.layout.width,
            containerHeight: nativeEvent.layout.height
          });
        }}
      >
        {this.renderCards()}
        {this.renderOverlayContent()}
      </View>
    );
  }
}

//
component.displayName = "CardStack";

// Default Props
component.defaultProps = {
  padding: 16,
  inactiveCardScale: 0.95,
  activeCardRotate: 10,
  renderNoMoreCard: null,
  onLike: () => {},
  onDislike: () => {},
  onSuperlike: () => {},
  onUndo: () => {},
  onCardIsOver: () => {},
  canBeUndone: () => {},
  onAnimated: () => {},
  renderOverlay: () => {},
  renderStamps: () => {}
};
component.propTypes = {
  padding: PropTypes.number,
  inactiveCardScale: PropTypes.number,
  activeCardRotate: PropTypes.number,
  renderNoMoreCard: PropTypes.func,
  onLike: PropTypes.func,
  onDislike: PropTypes.func,
  onSuperlike: PropTypes.func,
  onUndo: PropTypes.func,
  onCardIsOver: PropTypes.func,
  canBeUndone: PropTypes.func,
  onAnimated: PropTypes.func,
  renderOverlay: PropTypes.func,
  renderStamps: PropTypes.func
};

export default component;
