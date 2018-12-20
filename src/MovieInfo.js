import React, { Component } from "react";
import Animate from "react-smooth";

export default class MovieInfo extends Component {
  state = {
    cast: [],
    video: []
  };

  componentDidMount() {
    fetch(`https://api.themoviedb.org/3/movie/${
      this.props.movie.id
    }/credits?api_key=17117ab9c18276d48d8634390c025df4
        `)
      .then(r => r.json())
      .then(data =>
        this.setState({ cast: data.cast }, () => console.log(this.state.cast))
      )
      .catch(err => console.log(err));

    fetch(`https://api.themoviedb.org/3/movie/${
      this.props.movie.id
    }/videos?api_key=17117ab9c18276d48d8634390c025df4&language=en-US
    `)
      .then(r => r.json())
      .then(data => this.setState({ video: data.results }))
      .catch(err => console.log(err));
  }

  render() {
    const steps = [
      {
        style: {
          transform: "scale(0, 0)"
        },
        duration: 100
      },
      {
        style: {
          transform: "scale(1,1)"
        },
        duration: 900
      }
    ];

    const { movie, open } = this.props;
    const { cast, video } = this.state;
    const castList = cast.length
      ? cast.map((cast, i) => {
          if (i < 5)
            return (
              <li key={cast.id}>
                {cast.name} - {cast.character}
              </li>
            );
          else return null;
        })
      : null;

    if (!open) {
      return null;
    }

    const singleVideo = video.length ? (
      <iframe
        src={`https://www.youtube.com/embed/${video[0].key}`}
        title={video[0].name}
      />
    ) : null;

    return (
      <div className="backdropStyle">
        <Animate steps={steps}>
          <div className="modalStyle">
            <div className="grid-container">
              <div className="grid-image">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="poster"
                />
              </div>
              <div className="grid-info">
                <h2 id="movie-title">{movie.title}</h2>
                <p>{movie.overview}</p>
                <p>
                  Votes: {movie.vote_count} / Rating: {movie.vote_average}
                </p>
                <ul>{castList}</ul>
              </div>
            </div>
            <div className="grid-video">{singleVideo}</div>
            <div className="footer">
              <span className="close" onClick={this.props.onClose}>
                X
              </span>
            </div>
          </div>
        </Animate>
      </div>
    );
  }
}
