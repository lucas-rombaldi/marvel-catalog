import React from "react";
import PropTypes from "prop-types";
import ReactLoader from "react-loader-spinner";

export default class Loader extends React.Component {
  render() {
    return (
      <ReactLoader
        type="ThreeDots"
        color="#E62429"
        height={70}
        width={70}
        visible={this.props.visible}
      />
    );
  }
}

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
};