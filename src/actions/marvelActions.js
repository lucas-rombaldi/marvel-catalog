import * as types from "./actionTypes";
import MarvelApi from "../services/marvelApi";

export function setFilter(filter) {
  return (dispatch) => dispatch(stateSetFilter(filter));
}

export function loadAllCharacters(page, filter) {
  console.log("page", page);
  return (dispatch) => {
    dispatch(requestCharacters());
    return MarvelApi.getCharacters({ page: page, nameStartsWith: filter })
      .then((response) => response.json())
      .then((json) => dispatch(receiveCharacters(json)));
  };
}

export const requestCharacters = () => ({
  type: types.LOAD_ALL_CHARACTERS,
  isLoading: true,
});

export const receiveCharacters = (json) => {
  console.log("json", json)  
  return {
    type: types.RECEIVE_ALL_CHARACTERS,
    payload: json
  };
};

export const stateSetFilter = (filter) => ({
  type: types.SET_FILTER,
  filter: filter,
});

export function fetchCharacter(id) {
  return (dispatch) => {
    dispatch(requestCharacter());
    return MarvelApi.getCharacterById(id)
      .then((response) => response.json())
      .then((json) => dispatch(receiveCharacter(json)));
  };
}

export const requestCharacter = () => ({
  type: types.LOAD_CHARACTER,
});

export const receiveCharacter = (json) => ({
  type: types.RECEIVE_CHARACTER,
  character: json,
});

export function enableToolbarFilter() {
  return (dispatch) => {
    return dispatch(enableFilterDispatcher());    
  };
}

export function disableToolbarFilter() {
  return (dispatch) => {
    return dispatch(disableFilterDispatcher());    
  };
}

export const enableFilterDispatcher = () => ({
  type: types.ENABLE_FILTER
});

export const disableFilterDispatcher = () => ({
  type: types.DISABLE_FILTER
});

export function fetchStoriesByCharacter(id, page) {
  return (dispatch) => {
    dispatch(requestStories());
    return MarvelApi.fetchStoriesByCharacter(id, page)
      .then((response) => response.json())
      .then((json) => dispatch(receiveStories(json, page)));
  };
}

export const requestStories = () => ({
  type: types.FETCH_SERIES_BY_CHARACTER,
});

export const receiveStories = (json, page) => ({
  type: types.RECEIVE_SERIES_BY_CHARACTER,
  payload: json,
  page: page
});

export function showSeries() {
  return (dispatch) => {
    return dispatch(enableFilterDispatcher());    
  };
}

export function hideSeries() {
  return (dispatch) => {
    return dispatch(disableFilterDispatcher());    
  };
}

export const showSeriesDispatcher = () => ({  
  type: types.SHOW_SERIES
});

export const hideSeriesDispatcher = () => ({
  type: types.HIDE_SERIES
});