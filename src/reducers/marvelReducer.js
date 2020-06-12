import {
  LOAD_ALL_CHARACTERS,
  RECEIVE_ALL_CHARACTERS,
  LOAD_CHARACTER,
  RECEIVE_CHARACTER,
  SET_FILTER,
  ENABLE_FILTER,
  DISABLE_FILTER,
  FETCH_SERIES_BY_CHARACTER,
  RECEIVE_SERIES_BY_CHARACTER,
  HIDE_SERIES,
  SHOW_SERIES
} from "../actions/actionTypes";

const INITIAL_STATE = {
  characters: null,
  character: null,
  hasMore: true,
  isLoading: false,
};

export default function marvel(state = INITIAL_STATE, action) {
  let newState;
  switch (action.type) {
    case SHOW_SERIES:
      newState = {
        ...state,
        showSeries: true,
      };
      return newState;
    case HIDE_SERIES:
      newState = {
        ...state,
        showSeries: false,
      };
      return newState;
    case ENABLE_FILTER:
      newState = {
        ...state,
        enableFilter: true,
      };
      return newState;
    case DISABLE_FILTER:
      newState = {
        ...state,
        enableFilter: false,
      };
      return newState;
    case SET_FILTER:
      newState = {
        ...state,
        characters: null,
        filter: action.filter,
        isChangingFilter: true,
        hasMore: true,
      };
      return newState;
    case LOAD_ALL_CHARACTERS:
      newState = {
        ...state,
        isLoading: true,
        isChangingFilter: false,
      };
      return newState;
    case RECEIVE_ALL_CHARACTERS:
      let actionResults = action.payload.data.results;
      if (state.characters && state.characters.some((x) => x)) {
        actionResults = state.characters.concat(actionResults);
      }

      const { total, count, offset } = action.payload.data;

      newState = {
        ...state,
        characters: actionResults.sort((a, b) =>
          a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        ),
        hasMore: total > count && offset < total,
        isLoading: false,
        isChangingFilter: false,
      };
      return newState;
    case LOAD_CHARACTER:
      newState = {
        ...state,
        character: {},
        isLoading: true,
        isChangingFilter: false,
      };
      return newState;
    case RECEIVE_CHARACTER:
      newState = {
        ...state,
        character: action.character.data.results[0],
        isLoading: false,
        isChangingFilter: false,
      };
      newState.character.series = null;
      return newState;
    case FETCH_SERIES_BY_CHARACTER:
      newState = {
        ...state,
        isLoading: true
      };
      return newState;
    case RECEIVE_SERIES_BY_CHARACTER:
      let newSeries = action.payload.data.results;

      if (state.character && state.character.series && state.character.series.some((x) => x)) {
        newSeries = state.character.series.concat(newSeries);
      }

      newState = {
        ...state,
        character: {
          ...state.character,
          series: newSeries,
          hasMore: hasMore(action.payload.data),
          seriesPage: action.page
        },
        isLoading: false
      };      

      return newState;
    default:
      return state;
  }
}

function hasMore(data) {
  const { total, count, offset } = data;
  return total > count && offset < total;
}
