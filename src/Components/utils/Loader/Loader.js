import React from "react";
import PropTypes from "prop-types";
import LoaderSpinner from "react-loader-spinner";
import Theme from '../Theme/Theme.scss';

class Loader extends React.Component {
  render() {
    return (
      <LoaderSpinner
        type={this.props.type || "ThreeDots"}
        color={Theme.secondaryColor}
        height={70}
        width={70}
        visible={this.props.visible}
      />
    );
  }
}

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
  type: PropTypes.string
};

export default Loader;