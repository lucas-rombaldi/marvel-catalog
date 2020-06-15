import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';

import * as appActions from "../../actions/appActions";
import InnerToolbar from "../layout/inner-toolbar/inner-toolbar";
import Loader from "../utils/loader/loader";
import ErrorScreen from "../utils/error-screen/error-screen";
import CharacterDialog from "../character-dialog/character-dialog";
import SerieCard from "./serie-card/serie-card";

import Constants from "./constants";
import "./styles.scss";

class CharacterDetails extends React.Component {
  componentDidMount() {
    this.props.appActions.disableToolbarFilter();
    this.loadModel(this.id);
  }

  get id() {
    return this.props.match.params.id;
  }

  loadModel = (id) => {
    this.props.appActions.fetchCharacter(id);
    this.loadSeries(1);
  };

  showDialog = () => {
    const { appActions } = this.props;
    appActions.setDialogVisible(true);
  };

  handleCloseDialog = () => {
    const { appActions } = this.props;
    appActions.setDialogVisible(false);
  };

  loadSeries = (page) => {
    const { appActions } = this.props;
    appActions.fetchSeriesByCharacter(this.id, page);
  }

  handleConfirmDialog = () => {
    const { appActions } = this.props;
    appActions.setDialogVisible(false);
    this.loadModel(this.id);
  };

  renderSeriesGrid = () => {
    const { character } = this.props;

    if (character.series && character.series.length > 0) {
      return (
        <div className={`${Constants.class}__series-grid`}>
          {this.props.character.series.map((serie) => (
            <SerieCard serie={serie} key={serie.id} />
          ))}
        </div>
      );
    } else {
      return (
        <Typography variant="button">
          Unfortunately, no serie has been done so far!
        </Typography>
      );
    }
  };

  renderLoadMoreSeriesButton = () => {
    const { character, seriesPage } = this.props;

    if (character.hasMore)
      return (
        <Button
          variant="contained"
          color="primary"
          className="backgroundColor--primary"
          onClick={() => this.loadSeries(seriesPage + 1)}
        >
          Load More...
        </Button>
      );
    else return null;
  }

  renderSeriesTitle = () => {
    return (
      <div className={`${Constants.class}__series-title`}>
        <Typography variant="h6" align="left">
          <span style={{ marginLeft: "10px" }}>Series</span>
        </Typography>
      </div>
    );
  }

  renderSeries = () => {
    const { character, isLoadingSeries } = this.props;

    return (
      <section className={`${Constants.class}__series-root`}>
        {this.renderSeriesTitle()}
        {character.series && (
          <React.Fragment>
            {this.renderSeriesGrid()}
            {!isLoadingSeries && this.renderLoadMoreSeriesButton()}
          </React.Fragment>
        )}
        {isLoadingSeries && <Loader visible />}
      </section>
    );
  }

  renderToolbarActions = () => {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={this.showDialog}
        endIcon={<EditIcon />}
      >
        Edit
      </Button>
    );
  };

  renderProfile = () => {
    const { character } = this.props;
    const image = `${character.thumbnail.path}/standard_fantastic.${this.props.character.thumbnail.extension}`;

    return (
      <div className={`${Constants.class}__profile`}>
        <img
          src={image}
          alt={character.name}
          className={`${Constants.class}__image`}
        />
        <div className={`${Constants.class}__description`}>
          <Typography variant="h5" display="block">
            {character.name}
          </Typography>
          <Typography variant="overline" display="block">
            {character.description.length > 0
              ? character.description
              : "NO DESCRIPTION FOR THIS HERO! CAN YOU TELL US SOMETHING ABOUT HIM/HER?"}
          </Typography>
        </div>
      </div>
    );
  }

  renderDialog = () => {
    return (
      <CharacterDialog
        visible={this.props.dialogVisible}
        handleClose={this.handleCloseDialog}
        character={this.props.character}
        handleConfirm={this.handleConfirmDialog}
      />
    );
  }

  renderPage = () => {
    const { character } = this.props;

    return (
      <InnerToolbar
        backRoute="/"
        title={character.name}
        renderActions={this.renderToolbarActions}
      >
        <React.Fragment>
          {this.renderProfile()}
          {this.renderSeries()}
        </React.Fragment>
      </InnerToolbar>
    );
  }

  render() {
    const { character } = this.props;

    if (this.props.error) {
      return <ErrorScreen message={this.props.error} />;
    }

    return character && character.name ? (
      <React.Fragment>
        {this.renderDialog()}
        {this.renderPage()}
      </React.Fragment>
    ) : (
      <Loader visible />
    );
  }
}

CharacterDetails.propTypes = {
  character: PropTypes.object,
  isLoading: PropTypes.bool,
  isLoadingSeries: PropTypes.bool,
  seriesPage: PropTypes.number,
  dialogVisible: PropTypes.bool,
  error: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    character: state.marvel.character,
    isLoadingSeries:
      state.marvel.character && state.marvel.character.isLoadingSeries,
    error: state.marvel.error,
    seriesPage: state.marvel.character
      ? state.marvel.character.seriesPage
      : this.currentSeriesPage,
    dialogVisible: state.marvel.dialogVisible,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(appActions, dispatch),
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CharacterDetails)
);
