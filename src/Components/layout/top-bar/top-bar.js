import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";
import AppBar from "@material-ui/core/AppBar";
import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import * as appActions from "../../../actions/appActions";
import Constants from "./constants";
import Logo from "../../../img/marvel-logo.png";
import "./styles.scss";

class TopBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
    };
    this.appliedFilter = null;
  }

  handleFilterChangeDebounce = _.debounce(() => {
    if (this.appliedFilter !== this.state.searchText) {
      this.appliedFilter = this.state.searchText;
      this.props.appActions.setFilter(this.state.searchText);
    }
  }, 800);

  handleFilterChange = (event) => {
    this.setState({ searchText: event.target.value });
    this.handleFilterChangeDebounce();
  };

  renderSearch = () => {
    const { enableFilter } = this.props;

    if (!enableFilter) return null;

    return (
      <div className={`${Constants.class}__search`}>
        <div className={`${Constants.class}__search--image`}>
          <SearchIcon />
        </div>
        <div className={`${Constants.class}__search--input`}>
          <input
            name="search"
            value={this.state.searchText}
            type="text"
            className={`${Constants.class}__search--input-inner`}
            placeholder={"Search..."}
            autocomplete="off"
            onChange={this.handleFilterChange}
          />
        </div>
      </div>
    );
  }

  renderAppTitle = () => {
    return (
      <React.Fragment>
        <img
          className={`${Constants.class}__logo`}
          src={Logo}
          height={32}
          alt={"Marvel Catalog"}
        />
        <Typography
          type="subheading"
          variant="h6"
          color="inherit"
          className={`${Constants.class}__title`}
        >
          Marvel Catalog
        </Typography>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className={`${Constants.class}__root`}>
        <AppBar position="fixed">
          <Toolbar>
            {this.renderAppTitle()}
            {this.renderSearch()}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopBar.propTypes = {
  appActions: PropTypes.object,
  enableFilter: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    enableFilter: state.marvel.enableFilter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
