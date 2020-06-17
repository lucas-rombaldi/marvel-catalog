import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import InfiniteScroll from "react-infinite-scroller";

import * as appActions from "../../actions/appActions";
import CharacterCard from "./character-card";
import Loader from "../utils/loader";
import ErrorPage from "../utils/error-page";
import Constants from "./constants";
import "./styles.scss";

class CharactersList extends React.Component {
  componentDidMount() {
    this.props.appActions.enableToolbarFilter();
    this.props.appActions.resetCharacters();
  }

  renderCharacters = () => {
    if (
      this.props.loading ||
      !this.props.characters ||
      this.props.characters.length === 0
    )
      return null;

    return this.props.characters.map((character) => (
      <div key={character.id}>
        <CharacterCard character={character} />
      </div>
    ));
  };

  render() {
    const { hasMore, appActions, warning, error, isLoading } = this.props;
    const { fetchAllCharacters } = appActions;

    if (error || warning) return <ErrorPage message={error || warning} />;

    return (
      <InfiniteScroll
        data-testid="infinite-scroller"
        className={`${Constants.class}__cards-container`}
        loadMore={(page) =>
          fetchAllCharacters(
            this.props.isChangingFilter ? 1 : page,
            this.props.filter
          )
        }
        hasMore={hasMore}
        loader={
          <div className={`${Constants.class}__loader`} key="loader">
            <Loader visible={isLoading} />
          </div>
        }
      >
        {this.renderCharacters()}
      </InfiniteScroll>
    );
  }
}

CharactersList.propTypes = {
  appActions: PropTypes.object,
  characters: PropTypes.array,
  hasMore: PropTypes.bool,
  isLoading: PropTypes.bool,
  filter: PropTypes.string,
  isChangingFilter: PropTypes.bool,
  warning: PropTypes.string,
  error: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    characters: state.marvel.isChangingFilter ? null : state.marvel.characters,
    hasMore: state.marvel.hasMore,
    isLoading: state.marvel.isLoading,
    filter: state.marvel.filter,
    isChangingFilter: state.marvel.isChangingFilter,
    warning: state.marvel.warning,
    error: state.marvel.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
