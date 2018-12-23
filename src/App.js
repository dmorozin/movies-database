import React, { Component } from "react";
import Home from "./header/Home";
import MovieInfo from "./MovieInfo";
import "./style.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/:movie_id" component={MovieInfo} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
