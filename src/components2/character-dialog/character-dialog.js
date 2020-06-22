import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import Constants from "./constants";
import AppConstants from "../utils/constants";
import "./styles.scss";

class CharacterDialog extends React.Component {
  renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => {
    const errorState = Boolean(touched && error);

    return (
      <React.Fragment>
        <TextField
          error={errorState}
          {...input}
          {...custom}
          label={label}
          fullWidth
          margin="dense"
          variant="outlined"
        />
        {errorState && (
          <p className={`${Constants.class}__error-text`}>{error}</p>
        )}
      </React.Fragment>
    );
  };

  onSubmit = (values) => {
    const { character, handleConfirm } = this.props;

    localStorage.setItem(
      `${AppConstants.localCharacterStoragePrefix}${character.id}`,
      JSON.stringify(values)
    );

    handleConfirm();
  };

  render() {
    const { character } = this.props;

    let image;
    if (character && character.thumbnail)
      image = `${character.thumbnail.path}/standard_fantastic.${this.props.character.thumbnail.extension}`;

    return (
      <Dialog
        open={this.props.visible}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <DialogTitle id="form-dialog-title">Character Edition</DialogTitle>
          <DialogContent className={`${Constants.class}__content`}>
            <div className={`${Constants.class}__row`}>
              <img
                src={image}
                alt={character.name}
                className={`${Constants.class}__image`}
              />
            </div>
            <Field
              name="name"
              component={this.renderTextField}
              label="Name"
              autoFocus
            />
            <Field
              name="description"
              component={this.renderTextField}
              label="Description"
              multiline
              rows={6}
            />
          </DialogContent>
          <div className={`${Constants.class}__actions`}>
            <DialogActions>
              <Button onClick={this.props.handleClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                Confirm
              </Button>
            </DialogActions>
          </div>
        </form>
      </Dialog>
    );
  }
}

CharacterDialog.propTypes = {
  visible: PropTypes.bool,
  handleClose: PropTypes.func,
  handleConfirm: PropTypes.func,
  character: PropTypes.object,
};

function validate(values) {
  const errors = {};
  const requiredFields = ["name"];

  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
}

function mapStateToProps(state, props) {
  return {
    initialValues: { ...props.character },
  };
}

export default connect(mapStateToProps)(
  reduxForm({
    form: "characterForm",
    validate,
    enableReinitialize: true,
  })(CharacterDialog)
);
