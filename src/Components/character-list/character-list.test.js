import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import * as appActions from "../../actions/appActions";
import configureStore from "../../store/configureStore";
import { BrowserRouter as Router } from "react-router-dom";

import CharacterList from "./character-list";

const mockStore = configureStore();

test("should render loader when fetching characters", () => {
  mockStore.dispatch(appActions.fetchAllCharactersAction());

  const { getByTestId } = render(
    <Provider store={mockStore}>
      <CharacterList />
    </Provider>
  );

  expect(getByTestId("loader"));
});

test("should not render loader when fetching characters", () => {
  mockStore.dispatch(appActions.fetchAllCharactersAction());
  mockStore.dispatch(
    appActions.receiveAllCharactersAction(mockReceiveCharactersPayload)
  );

  const { container, getByTestId } = render(
    <Router>
      <Provider store={mockStore}>
        <CharacterList />
      </Provider>
    </Router>
  );

  console.log('html', container.innerHTML);
});

test("should render error page when any error has occurred", () => {
    mockStore.dispatch(appActions.fetchAllCharactersAction());
    mockStore.dispatch(
      appActions.errorAction('Error test')
    );
  
    const { container, getByTestId } = render(
      <Router>
        <Provider store={mockStore}>
          <CharacterList />
        </Provider>
      </Router>
    );
  
    console.log("html", container.innerHTML);
    expect(getByTestId("error-page"));
  });

const mockReceiveCharactersPayload = JSON.parse(
  '{ \
	"code": 200, \
	"data": { \
		"count": 15, \
		"limit": 15, \
		"offset": 0, \
		"total": 15, \
		"results": \
		[ \
			{ \
				"id": 123, \
				"name": "Hero", \
				"description": "Description", \
				"series": { \
					"available": 3 \
				}, \
				"comics": { \
					"available": 12 \
				}, \
				"thumbnail": { \
					"extension": "jpg", \
					"path": "http://i.annihil.us/u/prod/marvel/i/mg/f/10/4c004203f1072" \
				} \
			} \
		] \
	}	\
}'
);
