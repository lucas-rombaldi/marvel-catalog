import { CLOSE_TOUR, INITIALIZE_TOUR } from "../actions/tourTypes";

const INITIAL_STATE = {
  isTourOpen: true,
};

export default function reducer(state = INITIAL_STATE, action) {
  let newState;

  switch (action.type) {
    case INITIALIZE_TOUR:
      newState = {
        ...state,
        isTourOpen: action.isTourOpen,
      };
      return newState;

    case CLOSE_TOUR:
      newState = {
        ...state,
        isTourOpen: false,
      };
      return newState;

    default:
      return state;
  }
}
