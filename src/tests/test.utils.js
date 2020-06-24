import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router } from "react-router-dom";

export const renderComponent = (component, store) => {
  return {
    ...render(
      <Router>
        <Provider store={store}>{component}</Provider>
      </Router>
    ),
  };
};
