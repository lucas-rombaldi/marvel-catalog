import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import CharacterList from "../character-list";
import CharacterDetails from "../character-details";
import TopBar from "../layout/top-bar";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <TopBar />
      <div className="App-content">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={CharacterList} />
            <Route path="/:id" component={CharacterDetails} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
