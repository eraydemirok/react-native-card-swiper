// Imports
import styles from "./styles";

// Libraries
import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";

//
class component extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {}

  componentDidMount() {}

  //

  render() {
    return (
      <View
        {...this.props}
        style={[
          this.props.style,
          styles.container,
          {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: this.props.elevation / 2 },
            shadowOpacity: 0.25,
            shadowRadius: this.props.elevation / 2
          }
        ]}
      >
        <View
          style={[
            styles.content,
            {
              backgroundColor: this.props.color,
              borderRadius: this.props.radius
            }
          ]}
        >
          {this.props.children}
        </View>
      </View>
    );
  }
}

//
component.displayName = "Card";

// Default Props
component.defaultProps = {
  radius: 0,
  color: "transparent",
  elevation: 0
};
component.propTypes = {
  radius: PropTypes.number,
  color: PropTypes.string,
  elevation: PropTypes.number
};

//
export default component;
