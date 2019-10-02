import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import { Link } from "react-router-dom";

class MovieByActor extends Component {
    renderMovie = () => {
        if (this.props.movieByActor) {
          return this.props.movieByActor.map(movie => {
              return (
                <Link to={`/movie/${movie.id}`} key={movie.id}>
                  {this.renderImage(movie.poster_path)}
                </Link>
              );
          });
        }
      };

      renderImage=(movie)=>{
        if(movie === null){
            return <img src={process.env.PUBLIC_URL + "/images/cinema.jpg"} alt='img'/>
        } else {
            return <img src={`https://image.tmdb.org/t/p/w500${movie}`} alt='img'/>
        }
    }

  render() {   
        console.log(this.props.movieByActor)
    return (
      <div>
          <h4>Movie {} played</h4>
          <div className='col m2 movie-img'>{this.renderMovie()}</div>;
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      auth: state.auth.authenticated,
      movie: state.movies.movie,
      movieByActor: state.movies.moviesByActor.cast,
      actor: state.movies.actor,
      casts: state.movies.casts,
      simularMovies: state.movies.simularMovie.results
    };
  }
  export default connect(
    mapStateToProps,
    actions
  )(MovieByActor);