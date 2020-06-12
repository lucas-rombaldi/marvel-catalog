import PropTypes from "prop-types";
import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

class CharacterCard extends React.Component {
  render() {
    const { character } = this.props;

    const image = `${character.thumbnail.path}/standard_fantastic.${this.props.character.thumbnail.extension}`;
    return (
      <Link to={`/${character.id}`}>
        <div className="cardWrapper">
          <div className="card">
            <div
              className="card-image"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="card-name">{character.name}</div>
            <div className="card-units clearfix">
              <div className="one-third">
                <div className="stat">{character.series.available}</div>
                <div className="stat-value">Series</div>
              </div>

              <div className="one-third no-border">
                <div className="stat">{character.comics.available}</div>
                <div className="stat-value">Comics</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

CharacterCard.propTypes = {
  character: PropTypes.object.isRequired,
};

export default CharacterCard;
