import * as types from "./types";
import MarvelApi from "../services/marvelApi";
import AppConstants from '../components/utils/constants';

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
    dispatch({
      type: types.FETCH_ALL_CHARACTERS,
      isLoading: true,
    });

    const response = await MarvelApi.getCharacters({
      page: page,
      nameStartsWith: filter,
    });
    const json = await response.json();
    return dispatch({
      type: types.RECEIVE_ALL_CHARACTERS,
      payload: json,
    });
  };
}

export function fetchCharacter(id) {
  return (dispatch) => {
    dispatch({ type: types.FETCH_CHARACTER });

    let localChar = localStorage.getItem(`${AppConstants.localCharacterStoragePrefix}${id}`);
    if (localChar) {
      const localContent = {
        data: {
          results: [JSON.parse(localChar)],
        },
      };
      return dispatch({
        type: types.RECEIVE_CHARACTER,
        character: localContent,
      });
    } else {
      return MarvelApi.getCharacterById(id)
        .then((response) => response.json())
        .then((json) =>
          dispatch({
            type: types.RECEIVE_CHARACTER,
            character: json,
          })
        );
    }
  };
}

export function resetCharacters() {
  return (dispatch) =>
    dispatch({
      type: types.RESET_CHARACTERS,
    });
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
