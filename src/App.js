import React from "react";
import "./App.css";
import CharactersList from "./Components/CharactersList/CharactersList";
import CharacterDetails from "./Components/CharacterDetails/CharacterDetails";
import TopBar from "./Components/TopBar/TopBar";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <TopBar />
      <div className="App-content">
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true} component={CharactersList} />
            <Route path="/:id" component={CharacterDetails} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
