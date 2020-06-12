import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link, withRouter } from "react-router-dom";
import * as marvelActions from "../../actions/marvelActions";
import Loader from "../Loader/loader";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InfiniteScroll from "react-infinite-scroller";
import SerieCard from "../SerieCard/SerieCard";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./styles.scss";

class CharacterDetails extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.id = id;
    this.props.marvelActions.fetchCharacter(id);
    this.baseClassName = "char-details";
    this.loadSeries(1);
  }

  renderSerie() {
    if (
      this.props.loading ||
      !this.props.character.series ||
      this.props.character.series.length === 0
    )
      return null;

    return this.props.character.series.map((serie) => (
      <div className="item">
        <SerieCard serie={serie} />
      </div>
    ));
  }

  renderProfile() {
    const { character } = this.props;

    let image;
    if (character && character.thumbnail)
      image = `${character.thumbnail.path}/standard_fantastic.${this.props.character.thumbnail.extension}`;

    if (character && character.series)
      return (
        <div>
          <div className="character-bar">
            <div className="character-id">
              <Link to="/">
                <ArrowBackIosIcon />
              </Link>
              <Typography variant="h5">
                <span style={{ color: "#868e96", marginLeft: "5px" }}>
                  {character.name}
                </span>
              </Typography>
            </div>
          </div>
          <div className="character-profile">
            <img
              src={image}
              alt={character.name}
              className={`${this.baseClassName}-profile-img`}
            />
            <div className="character-description">
              <Typography variant="overline" display="block">
                {character.description.length > 0 ? character.description : 'NO DESCRIPTION FOR THIS HERO! CAN YOU TELL US SOMETHING ABOUT HIM/HER?'}
              </Typography>
            </div>
          </div>
        </div>
      );
  }

  loadSeries(page) {
    this.props.marvelActions.fetchStoriesByCharacter(this.id, page);
  }

  render() {
    const { character } = this.props;
    console.log("this.props.seriesPage", this.props.seriesPage);
    return character ? (
      <div>
        {this.renderProfile()}
        {character.id && (
          <section className="series-section">
            <div className="title" onClick={() => alert("hello")}>
              <Typography variant="h6" align="left">
                <span style={{ marginLeft: "10px" }}>Series</span>
              </Typography>
            </div>
            <div className="grid grid-template-columns">
              {this.renderSerie()}
            </div>
            {this.props.isLoading && <Loader visible />}
            {character.hasMore && (
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#1976d2" }}
                onClick={() => this.loadSeries(this.props.seriesPage + 1)}
              >
                Load More...
              </Button>
            )}
          </section>
        )}
      </div>
    ) : (
      <Loader visible />
    );
  }
}

CharacterDetails.propTypes = {
  character: PropTypes.object,
  isLoading: PropTypes.bool,
  seriesPage: PropTypes.number,
};

function mapStateToProps(state) {
  return {
    character: state.marvel.character,
    isLoading: state.marvel.isLoading,
    seriesPage: state.marvel.character
      ? state.marvel.character.seriesPage
      : this.currentSeriesPage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    marvelActions: bindActionCreators(marvelActions, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CharacterDetails)
);
