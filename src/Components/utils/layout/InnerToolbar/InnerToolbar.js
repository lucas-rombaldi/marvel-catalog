import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { Link, withRouter } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import Constants from "./constants";
import "./styles.scss";

class InnerToolbar extends React.Component {
  _renderActions() {
    const { renderActions } = this.props;

    if (renderActions) {
      return (
        <div className={`${Constants.class}__actions`}>{renderActions()}</div>
      );
    } else return null;
  }

  _renderInfo() {
    const { backRoute, title } = this.props;

    return (
      <div className={`${Constants.class}__info`}>
        {backRoute && (
          <Link to={backRoute}>
            <ArrowBackIosIcon />
          </Link>
        )}
        <Typography variant="h5">
          <span className={`${Constants.class}__title`}>{title}</span>
        </Typography>
      </div>
    );
  }

  render() {
    return (
      <div className={`${Constants.class}__root`}>
        {this._renderInfo()}
        {this._renderActions()}
      </div>
    );
  }
}

InnerToolbar.propTypes = {
  renderActions: PropTypes.func,
  backRoute: PropTypes.string,
  title: PropTypes.string,
};

export default withRouter(InnerToolbar);
