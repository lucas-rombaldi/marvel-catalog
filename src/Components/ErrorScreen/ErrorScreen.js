import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import FailLogo from '../../img/thanos.png';
import "./styles.scss";

class ErrorScreen extends React.Component {
  render() {
    return (
          <div className="error-screen-root">
            <img
              className="error-screen-img"
              src={FailLogo}
              alt={"Marvel Catalog"}
            />
            <Typography
              type="subheading"
              variant="h6"
              color="inherit"
              className="error-screen-message"
            >
              {this.props.message}
            </Typography>
          </div>
    );
  }
}

ErrorScreen.propTypes = {
  message: PropTypes.string
};

export default ErrorScreen;
