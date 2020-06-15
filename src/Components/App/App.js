import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import CharactersList from "../character-list/character-list";
import CharacterDetails from "../character-details/character-details";
import TopBar from "../layout/top-bar/top-bar";
import Theme from "../utils/theme/theme.scss";
import "./App.scss";

const theme = createMuiTheme({
  palette: {
    primary: { 500: Theme.primaryColor },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <TopBar />
        <div className="App-content">
          <BrowserRouter>
            <Switch>
              <Route path="/" exact component={CharactersList} />
              <Route path="/:id" component={CharacterDetails} />
            </Switch>
          </BrowserRouter>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

export default App;