import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import "./styles.scss";

class SerieCard extends React.Component {
  render() {
    const { serie } = this.props;

    const image = `${serie.thumbnail.path}/standard_fantastic.${serie.thumbnail.extension}`;
    const url = serie.urls.find((url) => url.type === "detail").url;
    console.log("image", image);
    return (
      <a href={url}>
        <div className="serie-row">
          <div
            className="serie-card-container"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className="serie-card-general">
            <Typography variant="button" display="block">
              <strong>{serie.title}</strong>
            </Typography>
            <div className="serie-card-description">
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
