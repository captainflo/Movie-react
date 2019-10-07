import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";

class SimularMovies extends React.Component {
  componentDidUpdate() {
    this.props.simularMoviesByGenre(localStorage.getItem('movie'))
  }

  renderImage=(movie)=>{
    if(movie === null){
        return <img src={process.env.PUBLIC_URL + "/images/cinema.jpg"} alt='img'/>
    } else {
        return <img src={`https://image.tmdb.org/t/p/w500${movie}`} alt='img'/>
    }
}

  renderMovie = () => {
    if (this.props.simularMovies) {
      return this.props.simularMovies.map(movie => {
        if (movie.id !== this.props.movie.id) {
          return (
            <Link to={`/movie/${movie.id}`} key={movie.id}>
              {this.renderImage(movie.poster_path)}
            </Link>
          );
        }
      });
    }
  };

  render() {
    return <div className='col m2 movie-img'>{this.renderMovie()}</div>;
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
)(SimularMovies);
