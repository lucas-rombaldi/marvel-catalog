import React from "react";
import "@testing-library/jest-dom/extend-expect";
import * as appActions from "../../store/actions/appActions";
import configureStore from "../../store/configureStore";
import { renderComponent } from "../../tests/test.utils";

import CharacterDetails from "./CharacterDetails";
import { fireEvent, wait, waitFor } from "@testing-library/react";

test("should render error page when any error has occurred", () => {
  const store = configureStore();

  const { queryByTestId, getByText } = renderComponent(
    <CharacterDetails />,
    store
  );

  store.dispatch(appActions.fetchCharacterAction());
  store.dispatch(appActions.errorAction("Error test"));

  const errorPage = queryByTestId("error-page");
  expect(errorPage).toBeInTheDocument();
  expect(getByText("Error test2")).toBeInTheDocument();
});

test("should render loader while no character has been loaded", () => {
  const store = configureStore();
  const { queryByLabelText } = renderComponent(<CharacterDetails />, store);

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
  } = renderComponent(<CharacterDetails />, store);

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

test("should render character series", () => {
  const store = configureStore();
  const { queryByLabelText, queryByText } = renderComponent(
    <CharacterDetails />,
    store
  );

  store.dispatch(
    appActions.receiveCharacterAction(
      mockCharacterPayload(123, "Hero", "Description test")
    )
  );

  const seriesPayload = mockSeriesPayload();
  seriesPayload.data.results.push(mockNewSeriePayload("Serie1"));
  seriesPayload.data.results.push(mockNewSeriePayload("Serie2"));
  seriesPayload.data.results.push(mockNewSeriePayload("Serie3"));

  store.dispatch(appActions.receiveSeriesByCharacterAction(seriesPayload, 1));

  expect(queryByText(/serie1/i)).toBeInTheDocument();
  expect(queryByText(/serie2/i)).toBeInTheDocument();
  expect(queryByText(/serie3/i)).toBeInTheDocument();

  const loadingImage = queryByLabelText("audio-loading");
  expect(loadingImage).toBeNull();
});

const mockCharacterPayload = (id, name, description) => ({
  code: 200,
  data: {
    count: 1,
    limit: 1,
    offset: 0,
    total: 1,
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

const mockSeriesPayload = () => ({
  code: 200,
  data: {
    count: 1,
    limit: 1,
    offset: 0,
    total: 1,
    results: [],
  },
});

const mockNewSeriePayload = (title) => ({
  id: Math.random(),
  title,
  description: "random description",
  urls: [
    {
      type: "detail",
      url:
        "http://marvel.com/comics/series/13082/ant-man_the_wasp_2010_-_2011?utm_campaign=apiRef&utm_source=ebfed38e4e08f777f181a6c414f521eb",
    },
  ],
  thumbnail: {
    extension: "jpg",
    path: "http://i.annihil.us/u/prod/marvel/i/mg/3/60/4c606835416be",
  },
});
