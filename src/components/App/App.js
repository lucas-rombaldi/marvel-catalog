import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import CharacterList from "../CharacterList";
import CharacterDetails from "../CharacterDetails";
import TopBar from "../shared/layout/TopBar";
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
