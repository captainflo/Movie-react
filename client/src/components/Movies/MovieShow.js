import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import SimularMovies from './SimularMovies';
import SliderForCast from '../utils/SliderForCast'

class MovieShow extends React.Component {
  componentDidMount() {
    this.props.showMovie(this.props.match.params.id);
    this.props.simularMoviesByGenre(localStorage.getItem('movie'))
    this.props.castMovie(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
        this.props.simularMoviesByGenre(localStorage.getItem('movie'))
        this.props.showMovie(this.props.match.params.id);
        this.props.castMovie(this.props.match.params.id);
    }
  }

  renderImage=(movie)=>{
    if(movie === null){
        return <img style={{width: '100%'}} src={process.env.PUBLIC_URL + "/images/cinema.jpg"} alt='img'/>
    } else {
        return <img style={{width: '100%'}} src={`https://image.tmdb.org/t/p/w500${movie}`} alt='img'/>
    }
}

  renderMovie = () => {
    const movie = this.props.movie;
    return (
      <div className='row' key={movie.id}>
        <div className='col m4 s12'>
          {this.renderImage(movie.poster_path)}
        </div>
        <div className='col m8 s12'>
            <h4>{movie.original_title}</h4>
            <p>score: {movie.vote_average}/10</p>
            <p>{movie.overview}</p>
            <p>Date: {movie.release_date}</p>
            <a href={movie.homepage}>SiteWeb: {movie.homepage}</a>
            <p>Genres: {this.renderListOfGenres(movie.genres)}</p>
        </div>
      </div>
    );
  };

  renderListOfGenres = genres => {
    if (genres !== undefined) {
      const array = [];
      for (let i = 0; i < genres.length; i++) {
        array.push(genres[i].name + " ");
        
      }
      return array
    }
  };

  render() {
    return (
      <div className="container">
        {this.renderMovie()}
        <h4>Cast Movie</h4>
        <SliderForCast casts={this.props.casts.cast}/>
        <h4>Because You like this</h4>
        <SimularMovies/>
      </div>
    );
  }
}

function mapStateToProps(state) {
    console.log(state)
  return {
    auth: state.auth.authenticated,
    movie: state.movies.movie,
    casts: state.movies.casts,
    simularMovies: state.movies.simularMovie.results
  };
}
export default connect(
  mapStateToProps,
  actions
)(MovieShow);
