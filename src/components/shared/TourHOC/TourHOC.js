import React, { Component } from "react";
import Tour from "reactour";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as tourActions from "../../../store/actions/tourActions";

export const TourHOC = (WrappedComponent, tour) => {
  class TourHOC extends Component {
    componentDidMount() {
      const { tourActions } = this.props;
      tourActions.initializeTour();
    }

    _onRequestClose = () => {
      const { tourActions } = this.props;
      tourActions.closeTour();
    };

    render() {
      const { isTourOpen } = this.props;

      return (
        <React.Fragment>
          {isTourOpen && (
            <Tour
              steps={tour.Steps}
              isOpen={isTourOpen}
              onRequestClose={this._onRequestClose}
            />
          )}
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  }

  TourHOC.propTypes = {
    tourActions: PropTypes.object,
    isTourOpen: PropTypes.bool,
  };

  function mapStateToProps(state) {
    return {
      isTourOpen: state.tour.isTourOpen,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      tourActions: bindActionCreators(tourActions, dispatch),
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(TourHOC);
};
