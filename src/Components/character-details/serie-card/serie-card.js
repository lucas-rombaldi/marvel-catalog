import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

import Constants from "./constants";
import "./styles.scss";

class SerieCard extends React.Component {
  render() {
    const { serie } = this.props;

    const image = `${serie.thumbnail.path}/standard_fantastic.${serie.thumbnail.extension}`;
    const url = serie.urls.find((url) => url.type === "detail").url;

    return (
      <a href={url}>
        <div className={`${Constants.class}__root`}>
          <div
            className={`${Constants.class}__image`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className={`${Constants.class}__info`}>
            <Typography variant="button" display="block">
              <strong>{serie.title}</strong>
            </Typography>
            <div className={`${Constants.class}__info--description`}>
              <Typography variant="caption" display="block">
                {serie.description}
              </Typography>
            </div>
          </div>
        </div>
      </a>
    );
  }
}

SerieCard.propTypes = {
  serie: PropTypes.object.isRequired,
};

export default SerieCard;
