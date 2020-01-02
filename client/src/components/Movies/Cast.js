import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import MovieByActor from '../utils/MovieByActor';

class Cast extends React.Component {
  componentDidMount() {
    this.props.getActor(this.props.match.params.id);
    this.props.getMovieByActor(this.props.match.params.id);
  }

  renderActor = () => {
    const actor = this.props.actor;
    if (actor !== undefined) {
      return (
        <div style={{ padding: '20px 0px' }} className="row" key={actor.id}>
          <div className="col m4 s12">
            <div className="box-image">
              {this.renderImage(actor.profile_path)}
            </div>
          </div>
          <div
            style={{ height: '500px', overflow: 'auto' }}
            className="col m8 s12"
          >
            <h4>{actor.name}</h4>
            <p>Popularity: {actor.popularity}/10</p>
            <p>Birthday: {actor.birthday}</p>
            <p>Place of birth: {actor.place_of_birth}</p>
            <p>{actor.biography}</p>
          </div>
        </div>
      );
    }
  };

  renderImage = movie => {
    if (movie === null) {
      return (
        <img
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          src={process.env.PUBLIC_URL + '/images/cinema.jpg'}
          alt="img"
        />
      );
    } else {
      return (
        <img
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
          src={`https://image.tmdb.org/t/p/w500${movie}`}
          alt="img"
        />
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderActor()}
        <MovieByActor />
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
export default connect(mapStateToProps, actions)(Cast);
