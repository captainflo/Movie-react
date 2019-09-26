import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";

class SimularMovies extends React.Component {
  renderMovie = () => {
    if (this.props.simumovie) {
      return this.props.simumovie.map(movie => {
        if (movie.id !== this.props.movie.id) {
          return (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              <img
                src={
                  `https://image.tmdb.org/t/p/w500${movie.poster_path}` ||
                  process.env.PUBLIC_URL + "/images/lechef.jpg"
                }
                alt="avatar"
              />
            </Link>
          );
        }
      });
    }
  };

  render() {
    return <div className="container">{this.renderMovie()}</div>;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    movie: state.movies.movie,
    SimularMovies: state.movies.SimularMovies
  };
}
export default connect(
  mapStateToProps,
  actions
)(SimularMovies);
