import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";

import Constants from "./constants";
import "./styles.scss";

class CharacterCard extends React.Component {
  render() {
    console.log('constants', Constants);
    const { character } = this.props;
    const image = `${character.thumbnail.path}/standard_fantastic.${this.props.character.thumbnail.extension}`;

    return (
      <Link to={`/${character.id}`}>
        <div className={`${Constants.class}__root`}>
          <div className={`${Constants.class}__card`}>
            <div
              className={`${Constants.class}__image`}
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className={`${Constants.class}__title`}>{character.name}</div>
            <div
              className={classnames(
                `${Constants.class}__card-units`,
                "clearfix"
              )}
            >
              <div className={`${Constants.class}__card-units--unit`}>
                <div className={`${Constants.class}__card-units--unit-value`}>
                  {character.series.available}
                </div>
                <div className={`${Constants.class}__card-units--unit-name`}>
                  Series
                </div>
              </div>
              <div
                className={classnames(
                  `${Constants.class}__card-units--unit`,
                  "no-border-right"
                )}
              >
                <div className={`${Constants.class}__card-units--unit-value`}>
                  {character.comics.available}
                </div>
                <div className={`${Constants.class}__card-units--unit-name`}>
                  Comics
                </div>
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
