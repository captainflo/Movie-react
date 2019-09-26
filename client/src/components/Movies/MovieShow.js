import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import SimularMovies from './SimularMovies';

class MovieShow extends React.Component {
  componentDidMount() {
    this.props.showMovie(this.props.match.params.id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
        this.props.showMovie(this.props.match.params.id);
    }
  }

  renderMovie = () => {
    const movie = this.props.movie;
    return (
      <div key={movie.id}>
        <p>title: {movie.original_title}</p>
        <img
          style={{ width: "30%" }}
          src={
            `https://image.tmdb.org/t/p/w500${movie.poster_path}` ||
            process.env.PUBLIC_URL + "/images/lechef.jpg"
          }
          alt="avatar"
        />
        <p>{movie.overview}</p>
        <p>Date: {movie.release_date}</p>
        <a href={movie.homepage}>SiteWeb: {movie.homepage}</a>
        <p>Genres: {this.renderListOfGenres(movie.genres)}</p>
      </div>
    );
  };

  renderListOfGenres = genres => {
    if (genres !== undefined) {
      const array = [];
      for (let i = 0; i < genres.length; i++) {
        array.push(genres[i].name + " ");
      }
      return array;
    }
  };

  renderSimularMovie = () => {
    if (this.props.movie.genres) {
      this.props.simularMovie(this.props.movie.genres);
    }
  };

  render() {
    return (
      <div className="container">
        {this.renderMovie()}
        <h4>Because You like this</h4>
        {this.renderSimularMovie()}
        <SimularMovies simumovie={this.props.simularMovies}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    movie: state.movies.movie,
    simularMovies: state.movies.simularMovie.results
  };
}
export default connect(
  mapStateToProps,
  actions
)(MovieShow);
