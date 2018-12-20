import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import Hover from "./Hover.js";
import MovieInfo from "./MovieInfo";

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class List extends Component {
  state = {
    movies: [],
    selected: "movie",
    isHovering: false,
    open: false,
    movie: {}
  };

  componentWillMount() {
    const url =
      typeof this.props.apiCall === "number"
        ? `https://api.themoviedb.org/3/discover/movie?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${
            this.props.apiCall
          }`
        : `https://api.themoviedb.org/3/movie/${
            this.props.apiCall
          }?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&page=1`;

    fetch(url)
      .then(r => r.json())
      .then(data => {
        this.setState({ movies: data.results });
      })
      .catch(err => console.log(err));
  }

  onSelect = key => {
    this.setState({ selected: key });
  };

  toggleModal = () => {
    this.setState({ open: !this.state.open }, () =>
      console.log(this.state.open)
    );
  };

  setMovie = movie => {
    this.setState({ movie: movie }, console.log(this.state.movie));
  };

  render() {
    const movies = this.state.movies;
    const menu = movies.map(movie => {
      return (
        <div className="menu-item" key={movie.id}>
          <Hover
            movie={movie}
            toggleModal={this.toggleModal}
            setMovie={this.setMovie}
          />
        </div>
      );
    });

    return (
      <div className="lists">
        <h2>{this.props.heading}</h2>
        {this.state.open && (
          <MovieInfo
            movie={this.state.movie}
            open={this.state.open}
            onClose={this.toggleModal}
          />
        )}
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          onSelect={this.onSelect}
          dragging={false}
          wheel={false}
          alignCenter={false}
          clickWhenDrag={false}
        />
      </div>
    );
  }
}

export default List;
