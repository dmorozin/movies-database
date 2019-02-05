import React, { Component } from "react";
import Navbar from "./header/Navbar";
import Footer from "./header/Footer";

export default class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.mounted = false;
  }

  state = {
    movie: {},
    credits: [],
    video: []
  };

  fetchMovie = () => {
    const urlMovie = fetch(
      `https://api.themoviedb.org/3/movie/${
        this.props.match.params.movie_id
      }?api_key=17117ab9c18276d48d8634390c025df4&language=en-US`
    );
    const urlCredits = fetch(`https://api.themoviedb.org/3/movie/${
      this.props.match.params.movie_id
    }/credits?api_key=17117ab9c18276d48d8634390c025df4
        `);
    const urlVideos = fetch(`https://api.themoviedb.org/3/movie/${
      this.props.match.params.movie_id
    }/videos?api_key=17117ab9c18276d48d8634390c025df4
          `);
    const urls = [urlMovie, urlCredits, urlVideos];

    Promise.all(urls)
      .then(([r1, r2, r3]) => Promise.all([r1.json(), r2.json(), r3.json()]))
      .then(([data1, data2, data3]) => {
        if (this.mounted)
          this.setState({
            movie: data1,
            credits: data2,
            video: data3.results
          });
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.mounted = true;
    this.fetchMovie();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.fetchMovie();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  time_convert = num => {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours}h ${minutes}min`;
  };

  render() {
    const { movie, credits, video } = this.state;

    const backgroundImg = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7) , rgba(0, 0, 0, 0.7)), url("https://image.tmdb.org/t/p/original/${
        movie.backdrop_path
      }")`
    };

    const backwithPoster = {
      backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.8) 60%), url("https://image.tmdb.org/t/p/original/${
        movie.poster_path
      }")`
    };

    const content =
      Object.keys(movie).length > 0 ? (
        <div
          style={movie.backdrop_path !== null ? backgroundImg : backwithPoster}
          className="back-height"
        >
          <div className="content">
            <h1>{movie.title}</h1>
            {video.length ? (
              <div className="video">
                <iframe
                  src={`https://www.youtube.com/embed/${video[0].key}`}
                  title={video[0].name}
                />
              </div>
            ) : null}

            <p className="year-run-vote">
              <span className="year">
                {new Date(movie.release_date).getFullYear()}
              </span>
              <span className="run">
                {" "}
                {movie.runtime && this.time_convert(movie.runtime)}
              </span>
              <span className="vote">
                <i className="fas fa-star" /> {movie.vote_average}
              </span>
            </p>
            <div className="overview-container">
              <p className="overview">{movie.overview}</p>
              <p>
                <span className="greyed">Starring: </span>
                {credits.cast &&
                  credits.cast.map((cast, i) => {
                    if (i < 4)
                      return <span key={cast.cast_id}>{cast.name}, </span>;
                    if (i === 4)
                      return <span key={cast.cast_id}>{cast.name}</span>;
                    else return null;
                  })}
              </p>

              <p>
                <span className="greyed">Genres: </span>
                {movie.genres.map((genre, i, arr) => {
                  if (i === arr.length - 1)
                    return <span key={genre.id}>{genre.name}</span>;
                  return <span key={genre.id}>{genre.name}, </span>;
                })}
              </p>

              {credits && credits.crew.length > 0 && (
                <p>
                  <span className="greyed">Director: </span>{" "}
                  {credits.crew[0].name}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p style={{ textAlign: "center" }}>Loading...</p>
      );

    return (
      <div>
        <Navbar />
        <div className="movie-page">{content}</div>
        <Footer />
      </div>
    );
  }
}
