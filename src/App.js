import React, { Component } from "react";
import Header from "./Header";
import "./style.css";
import ListsOfMovies from "./ListsOfMovies";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <ListsOfMovies />
      </div>
    );
  }
}

export default App;
