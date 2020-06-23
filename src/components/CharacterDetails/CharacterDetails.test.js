import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, cleanup, wait } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as appActions from "../../store/actions/appActions";
import configureStore from "../../store/configureStore";
import { BrowserRouter as Router } from "react-router-dom";

import CharacterDetails from "./CharacterDetails";

const renderWithBasics = (component, store) => {
  return {
    ...render(
      <Router>
        <Provider store={store}>{component}</Provider>
      </Router>
    ),
  };
};

test("should render loader while no character has been loaded", () => {
  const store = configureStore();
  const { queryByLabelText } = renderWithBasics(<CharacterDetails />, store);

  const loadingImage = queryByLabelText("audio-loading");
  expect(loadingImage).toBeInTheDocument();
});

test("should render character when has been received and keep loading series", () => {
  const store = configureStore();
  const {
    queryByLabelText,
    queryAllByRole,
    queryByRole,
    queryByText,
  } = renderWithBasics(<CharacterDetails />, store);

  store.dispatch(
    appActions.receiveCharacterAction(
      mockCharacterPayload(123, "Hero", "Description test")
    )
  );

  const headings = queryAllByRole("heading", { name: /hero/i });
  const description = queryByText(/description test/i);
  const image = queryByRole("img", { name: /hero/i });

  expect(headings[0]).toBeInTheDocument();
  expect(headings[1]).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(image).toBeInTheDocument();

  const loadingImage = queryByLabelText("audio-loading");
  expect(loadingImage).toBeInTheDocument();
});

test("should render error page when any error has occurred", () => {
    const store = configureStore();
  
    const { queryByTestId, getByText } = renderWithBasics(
      <CharacterDetails />,
      store
    );
  
    store.dispatch(appActions.fetchCharacterAction());
    store.dispatch(appActions.errorAction("Error test"));
  
    const errorPage = queryByTestId("error-page");
    expect(errorPage).toBeInTheDocument();
    expect(getByText("Error test")).toBeInTheDocument();
  });

const mockCharacterPayload = (id, name, description) => ({
  code: 200,
  data: {
    count: 10,
    limit: 15,
    offset: 0,
    total: 10,
    results: [
      {
        loadingSeries: true,
        id: id,
        name: name,
        description: description,
        series: null,
        thumbnail: {
          extension: "jpg",
          path: "http://i.annihil.us/u/prod/marvel/i/mg/f/10/4c004203f1072",
        },
      },
    ],
  },
});
