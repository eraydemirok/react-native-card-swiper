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
      new Animated.ValueXY(),
      ...this.children.map(() => {
        return new Animated.ValueXY();
      })
    ];

    //
    this.state = {
      containerWidth: width,
      containerHeight: height,
      activeCard: this.children.length - 1,
      activeLastCard: null
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
        this.canBeUndone();
        this.onCardIsOver(index);
        actionCallback(index);
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
    this.childrenRefs[this.state.activeCard].snapTo({ index: 3 });
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
    let { containerWidth, containerHeight } = this.state;

    //
    this.props.onAnimated(this.childrenAnimated[this.state.activeCard]);

    //
    return this.children.map((item, index) => {
      //
      if (item.type.displayName !== "Card") {
        console.error("Cardstack only receives the Card component.");
      }

      //
      let rotate = this.childrenAnimated[index].x.interpolate({
        inputRange: [-containerWidth, 0, containerWidth],
        outputRange: [
          "-" + this.props.activeCardRotate + "deg",
          "0deg",
          this.props.activeCardRotate + "deg"
        ]
      });

      //
      let activeCardScale = index === this.children.length - 1 ? 0.5 : 0.515;
      let inactiveCardScale = this.props.inactiveCardScale / 2;
      let scaleDefault =
        index === this.children.length - 1
          ? activeCardScale
          : inactiveCardScale;

      //
      let scale1 = this.childrenAnimated[index + 1].x.interpolate({
        inputRange: [-containerWidth, 0, containerWidth],
        outputRange: [activeCardScale, scaleDefault, activeCardScale]
      });
      //
      let scale2 = this.childrenAnimated[index + 1].y.interpolate({
        inputRange: [-containerHeight, 0, containerHeight],
        outputRange: [activeCardScale, scaleDefault, activeCardScale]
      });
      //
      let scale = Animated.add(scale1, scale2);

      //
      return (
        <Interactable.View
          style={[styles.cards]}
          ref={ref => {
            this.childrenRefs[index] = ref;
          }}
          animatedValueX={this.childrenAnimated[index].x}
          animatedValueY={this.childrenAnimated[index].y}
          horizontalOnly={this.props.horizontalOnly}
          animatedNativeDriver={false}
          snapPoints={[
            { x: 0, y: 0 },
            { x: containerWidth + 75, y: 0 },
            { x: -(containerWidth + 75), y: 0 },
            { x: 0, y: -height }
          ]}
          alertAreas={[
            {
              id: "like",
              influenceArea: { right: containerWidth }
            },
            {
              id: "dislike",
              influenceArea: { left: -containerWidth }
            },
            {
              id: "superlike",
              influenceArea: { top: -containerHeight }
            }
          ]}
          onAlert={event => {
            if (event.nativeEvent.like === "leave") {
              this.onLike(index);
            } else if (event.nativeEvent.dislike === "leave") {
              this.onDislike(index);
            } else if (event.nativeEvent.superlike === "leave") {
              this.onSuperlike(index);
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
            {this.renderCard(item, index)}
          </Animated.View>
        </Interactable.View>
      );
    });
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
      </View>
    );
  }
}

//
component.displayName = "CardStack";

// Default Props
component.defaultProps = {
  horizontalOnly: true,
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
  onAnimated: () => {}
};
component.propTypes = {
  horizontalOnly: PropTypes.bool,
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
  onAnimated: PropTypes.func
};

export default component;
