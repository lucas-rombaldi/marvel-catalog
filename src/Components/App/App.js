import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import CharactersList from "../CharactersList/CharactersList";
import CharacterDetails from "../CharacterDetails/CharacterDetails";
import TopBar from "../utils/layout/TopBar/TopBar";
import "./App.scss";

function App() {
  return (
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
  );
}

export default App;
