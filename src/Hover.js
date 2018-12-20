import React, { Component } from "react";

export default class Hover extends Component {
  state = {
    isHovering: false
  };

  handleEnter = () => {
    this.setState({ isHovering: true });
  };

  handleLeave = () => {
    this.setState({ isHovering: false });
  };

  render() {
    const { movie } = this.props;
    return (
      <div
        className="movie-card"
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
        onClick={() => {
          this.props.toggleModal();
          this.props.setMovie(movie);
        }}
      >
        {movie.backdrop_path !== null ? (
          <img
            src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path}
            alt={movie.backdrop_path}
          />
        ) : (
          <img
            src="https://www.themoviedb.org/assets/1/v4/logos/primary-green-d70eebe18a5eb5b166d5c1ef0796715b8d1a2cbc698f96d311d62f894ae87085.svg"
            alt="nopic"
          />
        )}

        {this.state.isHovering && (
          <h3 className="movie-title">{movie.title}</h3>
        )}
      </div>
    );
  }
}
