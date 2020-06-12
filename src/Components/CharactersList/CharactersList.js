import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as marvelActions from "../../actions/marvelActions";
import PropTypes from "prop-types";
import React from "react";
import CharacterCard from "../CharacterCard/CharacterCard";
import InfiniteScroll from "react-infinite-scroller";
import Typography from "@material-ui/core/Typography";
import FailLogo from "../../img/thanos.png";
import Loader from "../Loader/loader";
import ErrorScreen from "../ErrorScreen/ErrorScreen";
import "../CharacterCard/styles.scss";

class CharactersList extends React.Component {
  constructor() {
    super();
    this.scrollRef = null;
  }

  componentDidMount() {
    this.props.marvelActions.enableToolbarFilter();
  }

  renderData() {
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
  }

  render() {
    const { hasMore, marvelActions } = this.props;
    const { loadAllCharacters } = marvelActions;

    return (
      <React.Fragment>
        {this.props.noCharacterFound && (
          <ErrorScreen message="No hero left! Try searching again..." />
        )}
        <InfiniteScroll
          className="cardContainer"
          ref={(scrollRef) => (this.scrollRef = scrollRef)}
          loadMore={(page) =>
            loadAllCharacters(
              this.props.isChangingFilter ? 1 : page,
              this.props.filter
            )
          }
          hasMore={hasMore}
          loader={
            <div className="loader" key="loader">
              <Loader visible={this.props.isLoading} />
            </div>
          }
        >
          {this.renderData()}
        </InfiniteScroll>
      </React.Fragment>
    );
  }
}

CharactersList.propTypes = {
  marvelActions: PropTypes.object,
  characters: PropTypes.array,
  hasMore: PropTypes.bool,
  isLoading: PropTypes.bool,
  filter: PropTypes.string,
  isChangingFilter: PropTypes.bool,
  pageStart: PropTypes.number,
  noCharacterFound: PropTypes.bool,
};

function mapStateToProps(state) {
  console.log("state marvel", state.marvel);

  const result = {
    characters: state.marvel.isChangingFilter ? null : state.marvel.characters,
    hasMore: state.marvel.hasMore,
    isLoading: state.marvel.isLoading,
    filter: state.marvel.filter,
    isChangingFilter: state.marvel.isChangingFilter,
    noCharacterFound:
      state.marvel.characters && state.marvel.characters.length === 0,
  };

  return result;
}

function mapDispatchToProps(dispatch) {
  return {
    marvelActions: bindActionCreators(marvelActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CharactersList);
