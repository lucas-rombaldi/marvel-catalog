import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import FailLogo from "../../../img/thanos.png";
import Constants from "./constants";
import "./styles.scss";

class ErrorScreen extends React.Component {
  render() {
    const { message } = this.props;

    return (
      <div className={`${Constants.class}__root`}>
        <img
          className={`${Constants.class}__image`}
          src={FailLogo}
          alt={message}
        />
        <Typography type="subheading" variant="h6" color="inherit">
          {message}
        </Typography>
      </div>
    );
  }
}

ErrorScreen.propTypes = {
  message: PropTypes.string,
};

export default ErrorScreen;
