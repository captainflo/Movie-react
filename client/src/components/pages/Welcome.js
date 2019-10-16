import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";
import M from "materialize-css/dist/js/materialize.min.js";
import axios from "axios";
import Slider from '../utils/Slider'

class Welcome extends React.Component {
  state = {
    movie: "",
    cinema: [],
    science: [],
  };
  componentDidMount() {
    this.fetchLastMovie();
    this.fetchBestScience();
    var elems = document.querySelectorAll(".carousel");
    M.Carousel.init(elems, {});
  }

  fetchLastMovie = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=e5b611686829ce735cf695069e08bfa6&primary_release_date.gte=2019-09-15&primary_release_date.lte=2019-10-22"
      )
      .then(response => {
        this.setState({ cinema: response.data.results });
      });
  };

  fetchBestScience = () => {
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=e5b611686829ce735cf695069e08bfa6&with_genres=878&primary_release_year=2019"
      )
      .then(response => {
        this.setState({ science: response.data.results });
      });
  };

  handleType = event => {
    this.setState({ movie: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const movie = this.state.movie;
    this.props.getMovies(movie);
  };

  renderImage = movie => {
    if (movie === null) {
      return (
        <img src={process.env.PUBLIC_URL + "/images/cinema.jpg"} alt="img" />
      );
    } else {
      return <img src={`https://image.tmdb.org/t/p/w500${movie}`} alt="img" />;
    }
  };

  renderListMovies = () => {
    if (this.props.movies !== undefined) {
      return this.props.movies.map(movie => {
        return (
          <Link
            className="col m2 movie-img"
            to={`/movie/${movie.id}`}
            key={movie.id}
          >
            {this.renderImage(movie.poster_path)}
          </Link>
        );
      });
    }
  };

  renderLastMovie = () => {
    if (this.state.cinema) {
      return this.state.cinema.map(movie => {
        return (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <img
            style={{width:'10%'}}
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt="img"
            />
          </Link>
        );
      });
    }
  };

  render() {
    return (
      <div>
        <div className="card-category">
        <form>
          <div className="row">
            <div className="col m12 s12">
              <div className='box-search'>
                <div className="input-field col s6">
                  <input
                    onChange={e => this.handleType(e)}
                    value={this.state.movie}
                    id="movie"
                    type="text"
                    className="validate"
                  />
                  <label htmlFor="movie">Search Movie</label>
                </div>
                <button
                  onClick={this.onSubmit}
                  className="waves-effect waves-light btn "
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
        </div>
        <div className="container">
        <div className="row center">{this.renderListMovies()}</div>
        <div className="row">
          <h6>What movies are in theatres</h6>
            <Slider lastMovie={this.state.cinema}/><br></br>
            <h6>What best Science Fiction for 2019</h6>
            <Slider lastMovie={this.state.science}/>
        </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth.authenticated,
    movies: state.movies.movies.results
  };
}
export default connect(
  mapStateToProps,
  actions
)(Welcome);
