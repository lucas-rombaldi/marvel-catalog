import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as marvelActions from "../../actions/marvelActions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Logo from "../../img/marvel-logo.png";
import PropTypes from "prop-types";
import _ from 'lodash';
import "./styles.scss";

import SearchIcon from "@material-ui/icons/Search";

class TopBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: "",
    };
    this.baseClassName = "topbar";
    this.appliedFilter = null;
  }

  handleChangeDebounce = _.debounce(() => {
    if (this.appliedFilter !== this.state.searchText){
      this.appliedFilter = this.state.searchText;    
      this.props.marvelActions.setFilter(this.state.searchText);
    }    
  }, 1000);

  handleChange = (event) => {
    this.setState({ searchText: event.target.value });
    this.handleChangeDebounce();
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (this.appliedFilter !== this.state.searchText){
        this.appliedFilter = this.state.searchText;    
        this.props.marvelActions.setFilter(this.state.searchText);
      }
    }
  };

  render() {
    return (
      <div className={`${this.baseClassName}-root`}>
        <AppBar position="fixed" className={`${this.baseClassName}-app-bar`}>
          <Toolbar>
            <img
              className={`${this.baseClassName}-logo`}
              src={Logo}
              height={32}
              alt={"Marvel Catalog"}
            />
            <Typography
              type="subheading"
              variant="h6"
              color="inherit"
              className={`${this.baseClassName}-title`}
            >
              Marvel Catalog
            </Typography>
            {this.props.enableFilter && (
              <div className={`${this.baseClassName}-search-container`}>
                <div className={`${this.baseClassName}-search-div-img`}>
                  <SearchIcon />
                </div>
                <div className={`${this.baseClassName}-search-div-input`}>
                  <input
                    name="search"
                    value={this.state.searchText}
                    type="text"
                    className={`${this.baseClassName}-search-input`}
                    placeholder={"Search..."}
                    autocomplete="off"
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                  />
                </div>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

TopBar.propTypes = {
  marvelActions: PropTypes.object,
  enableFilter: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    enableFilter: state.marvel.enableFilter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    marvelActions: bindActionCreators(marvelActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
