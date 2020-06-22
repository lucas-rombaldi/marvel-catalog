import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as appActions from "../../store/actions/appActions";
import configureStore from "../../store/configureStore";
import { BrowserRouter as Router } from "react-router-dom";

import CharacterList from "./CharacterList";

const renderWithBasics = (component, store) => {
  return {
    ...render(
      <Router>
        <Provider store={store}>{component}</Provider>
      </Router>
    ),
  };
};

test("should render loader when fetching characters", () => {
  const store = configureStore();
  const { queryByLabelText } = renderWithBasics(<CharacterList />, store);

  store.dispatch(appActions.fetchAllCharactersAction());

  const loadingImage = queryByLabelText("audio-loading");
  expect(loadingImage).toBeInTheDocument();
});

test("should not render loader when fetching characters", () => {
  const store = configureStore();
  const { queryByLabelText } = renderWithBasics(<CharacterList />, store);

  store.dispatch(
    appActions.receiveAllCharactersAction(createMockReceiveCharacterPayload())
  );

  const loadingImage = queryByLabelText("audio-loading");
  expect(loadingImage).toBeNull();
});

test("should render cards as characters result", () => {
  const store = configureStore();
  const { queryAllByTestId } = renderWithBasics(<CharacterList />, store);

  const mockReceiveCharacters = createMockReceiveCharacterPayload();
  mockReceiveCharacters.data.results.push(mockNewCharacterPayload(10, "Test1"));
  mockReceiveCharacters.data.results.push(mockNewCharacterPayload(20, "Test2"));

  store.dispatch(appActions.receiveAllCharactersAction(mockReceiveCharacters));

  const cards = queryAllByTestId("char-card");
  expect(cards).toHaveLength(mockReceiveCharacters.data.results.length);
  expect(cards[0]).toHaveAttribute("href", "/10");
  expect(cards[1]).toHaveAttribute("href", "/20");

  const cardNames = queryAllByTestId("char-card-name");
  expect(cardNames[0]).toHaveTextContent("Test1");
  expect(cardNames[1]).toHaveTextContent("Test2");
});

test("should render error page when any error has occurred", () => {
  const store = configureStore();

  const { queryByTestId, getByText } = renderWithBasics(
    <CharacterList />,
    store
  );

  store.dispatch(appActions.fetchAllCharactersAction());
  store.dispatch(appActions.errorAction("Error test"));

  const errorPage = queryByTestId("error-page");
  expect(errorPage).toBeInTheDocument();
  expect(getByText("Error test")).toBeInTheDocument();
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
