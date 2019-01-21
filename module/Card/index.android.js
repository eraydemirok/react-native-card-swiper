// Imports
import styles from "./styles";

// Libraries
import React, { Component } from "react";
import { View, requireNativeComponent } from "react-native";
import PropTypes from "prop-types";

//
const Card = requireNativeComponent("CardSwiper", {
  name: "CardSwiper",
  propTypes: {
    radius: PropTypes.number,
    color: PropTypes.string,
    elevation: PropTypes.number,
    ...View.propTypes
  }
});

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
      <Card
        {...this.props}
        style={[styles.container, this.props.style]}
        radius={this.props.radius > 0 ? this.props.radius + 24 : 0}
      >
        {this.props.children}
      </Card>
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
