import React, { Component } from "react";
import Animate from "react-smooth";
import MovieInfo from "./MovieInfo";

class Header extends Component {
  constructor(props) {
    super(props);
    this.showcaseMovies = 4;
    this.intervalTime = 5000;
  }
  state = {
    movies: [],
    images: [],
    i: 0,
    open: false
  };

  componentDidMount() {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&page=1"
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ movies: data.results }, () => {
          if (this.state.movies.length === 20) {
            console.log(this.state.movies);
            const images = [];
            const promises = this.state.movies.map(movie => {
              return fetch(
                `https://api.themoviedb.org/3/movie/
                  ${movie.id}
                  /images?api_key=17117ab9c18276d48d8634390c025df4&language=en-US&include_image_language=en,null`
              )
                .then(r => r.json())
                .then(data => images.push(data));
            });
            Promise.all(promises)
              .then(() => images)
              .then(data =>
                this.setState({ images: data }, () =>
                  console.log(this.state.images)
                )
              );
          }
        });
      })
      .catch(err => console.log(err));
    clearInterval(this.interval);
    this.startInterval();
  }

  startInterval = () => {
    this.interval = setInterval(() => {
      if (this.state.i < this.showcaseMovies)
        this.setState({ i: this.state.i + 1 });
      else this.setState({ i: 0 });
    }, this.intervalTime);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  toggleModal = () => {
    this.setState({ open: !this.state.open }, () => {
      if (this.state.open) {
        clearInterval(this.interval);
      } else {
        this.startInterval();
      }
    });
  };

  render() {
    const { movies, images, i, open } = this.state;

    const divs = movies.length
      ? movies.map((movie, index) => {
          if (index <= this.showcaseMovies) {
            return (
              <div
                key={index}
                className={i === index ? "active" : null}
                onClick={() =>
                  this.setState({ i: index }, () => {
                    clearInterval(this.interval);
                    this.startInterval();
                  })
                }
              />
            );
          } else return null;
        })
      : null;

    const moviesList = movies.length ? (
      <div key={movies[i].id}>
        {images.length ? (
          <Animate to="1" from="0.2" attributeName="opacity">
            <div
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0) 60%), url("https://image.tmdb.org/t/p/original/${
                  images[i].backdrops[0].file_path
                }")`
              }}
              className="bgImage"
            >
              <div className="popularInfo">
                <h1>{movies[i].title}</h1>
                <p className="rating">
                  <em>Rating: {movies[i].vote_average}</em>
                </p>
                <p className="release-date">
                  Release Date:{" "}
                  {new Date(movies[i].release_date).toDateString()}
                </p>
                <p className="overview">{movies[i].overview}</p>
                <button onClick={this.toggleModal}>See More</button>
              </div>
              <div className="switchImg">{divs}</div>
            </div>
          </Animate>
        ) : null}
        {open && (
          <MovieInfo movie={movies[i]} open={open} onClose={this.toggleModal} />
        )}
      </div>
    ) : (
      <h4>Loading</h4>
    );

    return (
      <header>
        <nav>
          <div className="logo">Netflix</div>
          <div className="user">User</div>
        </nav>
        <div style={{ clear: "both" }} />
        <div className="popular">{moviesList}</div>
      </header>
    );
  }
}
export default Header;
