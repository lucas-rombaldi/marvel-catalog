import React from "react";
import "@testing-library/jest-dom/extend-expect";
import * as appActions from "../../../../store/actions/appActions";
import configureStore from "../../../../store/configureStore";
import { renderComponent } from "../../../../tests/test.utils";

import TopBar from "./TopBar";

test("should render search bar when enabling it", () => {
  const store = configureStore();

  const { queryByTestId } = renderComponent(<TopBar />, store);

  store.dispatch(appActions.enableToolbarFilterAction());
  expect(queryByTestId("search-container")).toBeInTheDocument();
});

test("should not render search bar when disabling it", () => {
    const store = configureStore();
  
    const { queryByTestId } = renderComponent(<TopBar />, store);
  
    store.dispatch(appActions.disableToolbarFilterAction());
    expect(queryByTestId("search-container")).toBeNull();
  });