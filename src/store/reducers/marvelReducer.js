import {
  FETCH_ALL_CHARACTERS,
  RECEIVE_ALL_CHARACTERS,
  FETCH_CHARACTER,
  RECEIVE_CHARACTER,
  SET_FILTER,
  ENABLE_FILTER,
  DISABLE_FILTER,
  FETCH_SERIES_BY_CHARACTER,
  RECEIVE_SERIES_BY_CHARACTER,
  SET_DIALOG_VISIBLE,
  RESET_CHARACTERS,
  ERROR
} from "../actions/types";

const INITIAL_STATE = {
  characters: null,
  character: null,
  hasMore: true,
  isLoading: false,
  dialogVisible: false,
  warning: null,
  error: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  let newState;

  switch (action.type) {
    case ERROR:
      newState = {
        ...state,
        error: action.errorMessage,
      };
      return newState;

    case FETCH_ALL_CHARACTERS:
      newState = {
        ...state,
        isLoading: true,
        isChangingFilter: false,
        warning: null,
      };
      return newState;

    case RECEIVE_ALL_CHARACTERS:
      let actionResults = action.payload.data.results;
      if (state.characters && state.characters.some((x) => x)) {
        actionResults = state.characters.concat(actionResults);
      }

      newState = {
        ...state,
        characters: actionResults.sort((a, b) =>
          a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        ),
        hasMore: hasMore(action.payload.data),
        isLoading: false,
        isChangingFilter: false,
        warning:
          actionResults && actionResults.length === 0
            ? "No hero found! Try searching again..."
            : null,
      };

      // Merges characters with local data
      for (let index = 0; index < newState.characters.length; index++) {
        const character = newState.characters[index];
        let localChar = localStorage.getItem(
          `marvel-catalog.character.${character.id}`
        );
        if (localChar) {
          let currentCharacter = newState.characters[index];
          newState.characters[index] = JSON.parse(localChar);
          newState.characters[index].series = currentCharacter.series;
        }
      }

      return newState;

    case FETCH_CHARACTER:
      return {
        ...state,
        character: {
          isLoadingSeries: true,
        },
        isLoading: true,
        isChangingFilter: false,
        warning: null,
      };

    case RECEIVE_CHARACTER:
      newState = {
        ...state,
        character: action.character.data.results[0],
        isLoading: false,
        isChangingFilter: false,
      };
      newState.character.isLoadingSeries = true;
      newState.character.series = null;

      return newState;

    case FETCH_SERIES_BY_CHARACTER:
      return {
        ...state,
        character: {
          ...state.character,
          isLoadingSeries: true,
        },
      };

    case RECEIVE_SERIES_BY_CHARACTER:
      if (action.payload.code !== "200" && action.payload.code !== 200) {
        newState = {
          ...state,
          warning: `Sorry! There was an error retrieving the series (${action.payload.status})`,
        };
        return newState;
      }

      let newSeries = action.payload.data.results;

      if (
        state.character &&
        state.character.series &&
        state.character.series.some((x) => x)
      ) {
        newSeries = state.character.series.concat(newSeries);
      }

      newState = {
        ...state,
        character: {
          ...state.character,
          series: newSeries,
          hasMore: hasMore(action.payload.data),
          seriesPage: action.page,
          isLoadingSeries: false,
        },
        error: null,
      };
      return newState;

    case RESET_CHARACTERS:
      return {
        ...state,
        characters: null,
        hasMore: true,
      };

    case SET_DIALOG_VISIBLE:
      return {
        ...state,
        dialogVisible: action.visible,
      };

    case ENABLE_FILTER:
      return {
        ...state,
        enableFilter: true,
      };

    case DISABLE_FILTER:
      return {
        ...state,
        enableFilter: false,
      };

    case SET_FILTER:
      return {
        ...state,
        characters: null,
        filter: action.filter,
        isChangingFilter: true,
        hasMore: true,
      };

    default:
      return state;
  }
}

function hasMore(data) {
  const { total, count, offset } = data;
  return offset + count < total;
}
