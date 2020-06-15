import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import CharactersList from "../CharactersList/CharactersList";
import CharacterDetails from "../CharacterDetails/CharacterDetails";
import TopBar from "../utils/layout/TopBar/TopBar";
import "./App.scss";
import Theme from "../utils/Theme/Theme.scss";

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
