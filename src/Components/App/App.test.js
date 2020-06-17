import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as appActions from "../../actions/appActions";
import configureStore from "../../store/configureStore";

import App from "./App";

const mockStore = configureStore();

test("should render infinite scroller when fetching characters", () => {
  //const store = mockStore({});

  // Dispatch the action
  mockStore.dispatch(appActions.fetchAllCharactersDispatcher());
  console.log("storeState", mockStore.getState());

  const { getByTestId } = render(
    <Provider store={mockStore}>
      <App />
    </Provider>
  );

  expect(getByTestId("infinite-scroller"));
});
