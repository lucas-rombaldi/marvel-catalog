import * as types from "./types";
import MarvelApi from "../../services/marvelApi";
import AppConstants from "../../components/shared/constants";

export const fetchAllCharactersAction = () => ({
  type: types.FETCH_ALL_CHARACTERS,
});

export const receiveAllCharactersAction = (json) => ({
  type: types.RECEIVE_ALL_CHARACTERS,
  payload: json,
});

export const fetchCharacterAction = () => ({
  type: types.FETCH_CHARACTER,
});

export const receiveCharacterAction = (character) => ({
  type: types.RECEIVE_CHARACTER,
  character,
});

export const errorAction = (message) => ({
  type: types.ERROR,
  errorMessage: message,
});

export function setFilter(filter) {
  return (dispatch) =>
    dispatch({
      type: types.SET_FILTER,
      filter: filter,
    });
}

export function setDialogVisible(visible) {
  return (dispatch) => {
    return dispatch({
      type: types.SET_DIALOG_VISIBLE,
      visible: visible,
    });
  };
}

export function fetchAllCharacters(page, filter) {
  return async (dispatch) => {
    dispatch(fetchAllCharactersAction());

    try {
      const response = await MarvelApi.getCharacters({
        page: page,
        nameStartsWith: filter,
      });
      const json = await response.json();
      return dispatch(receiveAllCharactersAction(json));
    } catch (e) {
      return dispatch(
        errorAction(`Sorry! There was a problem fetching the characters (${e})`)
      );
    }
  };
}

export function fetchCharacter(id) {
  return async (dispatch) => {
    dispatch(fetchCharacterAction());

    let localChar = localStorage.getItem(
      `${AppConstants.localCharacterStoragePrefix}${id}`
    );

    try {
      if (localChar) {
        const localContent = {
          data: {
            results: [JSON.parse(localChar)],
          },
        };
        return dispatch(receiveCharacterAction(localContent));
      } else {
        const response = await MarvelApi.getCharacterById(id);
        const json = await response.json();
        return dispatch(receiveCharacterAction(json));
      }
    } catch (e) {
      return dispatch(
        errorAction(`Sorry! There was a problem fetching the character (${e})`)
      );
    }
  };
}

export const resetCharactersAction = () => ({
  type: types.RESET_CHARACTERS,
});

export function resetCharacters() {
  return (dispatch) => dispatch(resetCharactersAction());
}

export function enableToolbarFilter() {
  return (dispatch) =>
    dispatch({
      type: types.ENABLE_FILTER,
    });
}

export function disableToolbarFilter() {
  return (dispatch) => {
    return dispatch({
      type: types.DISABLE_FILTER,
    });
  };
}

export function fetchSeriesByCharacter(id, page) {
  return (dispatch) => {
    dispatch({
      type: types.FETCH_SERIES_BY_CHARACTER,
    });
    return MarvelApi.fetchSeriesByCharacter(id, page)
      .then((response) => response.json())
      .then((json) =>
        dispatch({
          type: types.RECEIVE_SERIES_BY_CHARACTER,
          payload: json,
          page: page,
        })
      );
  };
}
