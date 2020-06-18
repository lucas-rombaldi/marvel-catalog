import React from "react";
import { Provider } from "react-redux";
import {
  render,
  fireEvent,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as appActions from "../../actions/appActions";
import configureStore from "../../store/configureStore";
import { BrowserRouter as Router } from "react-router-dom";

import { MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";

import CharacterList from "./character-list";

let container = null;

const mockStore = configureStore();

test("should render loader when fetching characters", () => {
  const { getByLabelText, getByTestId, queryByLabelText } = render(
    <Router>
      <Provider store={mockStore}>
        <CharacterList />
      </Provider>
    </Router>
  );

  mockStore.dispatch(appActions.fetchAllCharactersAction());

  const loadingImage = queryByLabelText("audio-loading");
  expect(loadingImage).toBeInTheDocument();
});

test("should not render loader when fetching characters", () => {
  const { queryByLabelText } = render(
    <Router>
      <Provider store={mockStore}>
        <CharacterList />
      </Provider>
    </Router>
  );

  mockStore.dispatch(
    appActions.receiveAllCharactersAction(createMockReceiveCharacterPayload())
  );

  const loadingImage = queryByLabelText("audio-loading");
  expect(loadingImage).toBeNull();
});

test("should render cards as characters result", () => {
  const { queryAllByTestId } = render(
    <Router>
      <Provider store={mockStore}>
        <CharacterList />
      </Provider>
    </Router>
  );

  const mockReceiveCharacters = createMockReceiveCharacterPayload();
  mockReceiveCharacters.data.results.push(mockNewCharacterPayload(10, "Test1"));
  mockReceiveCharacters.data.results.push(mockNewCharacterPayload(20, "Test2"));

  mockStore.dispatch(
    appActions.receiveAllCharactersAction(mockReceiveCharacters)
  );

  const cards = queryAllByTestId("char-card");

  expect(cards).toHaveLength(mockReceiveCharacters.data.results.length);
  expect(cards[0]).toHaveAttribute("href", "/10");
  expect(cards[1]).toHaveAttribute("href", "/20");
});

test("should direct to character details page", () => {
  const history = createMemoryHistory();

  const { queryByTestId, container } = render(
    <Router>
      <Provider store={mockStore}>
        <MemoryRouter history={history}>
          <CharacterList />
        </MemoryRouter>
      </Provider>
    </Router>
  );

  const mockReceiveCharacters = createMockReceiveCharacterPayload();
  mockReceiveCharacters.data.results.push(mockNewCharacterPayload(10, "Test1"));

  mockStore.dispatch(
    appActions.receiveAllCharactersAction(mockReceiveCharacters)
  );

  const card = queryByTestId("char-card");
  fireEvent.click(card);

  // spy on push calls, assert on url (parameter)

    console.log('HTML', container.innerHTML);

  expect(history.push).toHaveBeenCalledWith("/10");
});

test("should render error page when any error has occurred", () => {
  mockStore.dispatch(appActions.fetchAllCharactersAction());
  mockStore.dispatch(appActions.errorAction("Error test"));

  const { container, getByTestId, queryByTestId } = render(
    <Router>
      <Provider store={mockStore}>
        <CharacterList />
      </Provider>
    </Router>
  );

  const errorPage = queryByTestId("error-page");
  expect(errorPage).toBeInTheDocument();
});

const mockNewCharacterPayload = (id, name = "Hero") => ({
  id: id,
  name: name,
  description: "Description",
  series: {
    available: 3,
  },
  comics: {
    available: 12,
  },
  thumbnail: {
    extension: "jpg",
    path: "http://i.annihil.us/u/prod/marvel/i/mg/f/10/4c004203f1072",
  },
});

const createMockReceiveCharacterPayload = () => {
  return {
    code: 200,
    data: {
      count: 10,
      limit: 15,
      offset: 0,
      total: 10,
      results: [],
    },
  };
};
