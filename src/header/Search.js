import React, { Component } from "react";
import { Link } from "react-router-dom";

class Search extends Component {
  state = {
    searchVal: [],
    showRes: false
  };

  handleChange = e => {
    if (e.target.value !== "")
      fetch(`
    https://api.themoviedb.org/3/search/movie?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&query=${
      e.target.value
    }&page=1&include_adult=false`)
        .then(r => r.json())
        .then(data => {
          this.setState({ searchVal: data.results, showRes: true });
        })
        .catch(err => console.log(err));
    else if (e.target.value === "") this.setState({ showRes: false });
  };

  closeRes = () => {
    this.setState({ showRes: false });
  };

  render() {
    const { searchVal, showRes } = this.state;

    const moviesList = searchVal.length
      ? searchVal.map(movie => {
          return (
            <li key={movie.id}>
              <Link to={"/" + movie.id} onClick={this.closeRes}>
                {movie.title}
              </Link>
            </li>
          );
        })
      : null;

    return (
      <React.Fragment>
        <input
          type="text"
          name="searchVal"
          onChange={this.handleChange}
          className="search-input"
          placeholder="Search for movie..."
        />
        {showRes && (
          <div className="search-values">
            <ul>{moviesList}</ul>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Search;
