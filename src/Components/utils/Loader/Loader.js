import React from "react";
import PropTypes from "prop-types";
import LoaderSpinner from "react-loader-spinner";
import Theme from '../theme/theme.scss';

class Loader extends React.Component {
  render() {
    const { type, visible } = this.props;

    return (
      <LoaderSpinner
        type={type || "ThreeDots"}
        color={Theme.secondaryColor}
        height={70}
        width={70}
        visible={visible}
      />
    );
  }
}

Loader.propTypes = {
  visible: PropTypes.bool.isRequired,
  type: PropTypes.string
};

export default Loader;