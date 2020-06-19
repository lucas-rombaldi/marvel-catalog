import * as types from "./tourTypes";

const _localStorageKey = "marvel-catalog.exploredTours";

export function initializeTour() {
  return async (dispatch) => {
    let isTourOpen = true;
    const exploredTours = JSON.parse(localStorage.getItem(_localStorageKey));
    if (exploredTours && exploredTours.includes(window.location.pathname))
      isTourOpen = false;

    dispatch({ type: types.INITIALIZE_TOUR, isTourOpen: isTourOpen });
  };
}

export function closeTour() {
  return async (dispatch) => {
    dispatch({ type: types.CLOSE_TOUR });
    localStorage.setItem(
      _localStorageKey,
      JSON.stringify([window.location.pathname])
    );
  };
}
