import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { Link, withRouter } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import Constants from "./constants";
import "./styles.scss";

class InnerToolbar extends React.Component {
  renderActions = () => {
    const { renderActions } = this.props;

    if (renderActions) {
      return (
        <div className={`${Constants.class}__actions`}>{renderActions()}</div>
      );
    } else return null;
  }

  renderInfo = () => {
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

  _renderInnerToolbar() {
    return (
      <div className={`${Constants.class}__root`}>
        {this.renderInfo()}
        {this.renderActions()}
      </div>
    );
  }

  _renderContent() {
    return (
      <div className={`${Constants.class}__content`}>{this.props.children}</div>
    );
  }

  render() {
    return (
      <React.Fragment>
        {this._renderInnerToolbar()}
        {this._renderContent()}
      </React.Fragment>
    );
  }
}

InnerToolbar.propTypes = {
  children: PropTypes.node,
  renderActions: PropTypes.func,
  backRoute: PropTypes.string,
  title: PropTypes.string,
};

export default withRouter(InnerToolbar);
