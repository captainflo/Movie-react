import React from 'react';
import { connect } from 'react-redux';
import * as actions from "../actions";
import { Link } from "react-router-dom";

class Welcome extends React.Component{
    state={
        movie: '',
    }

    handleType = event => {
        this.setState({ movie: event.target.value})
    }

    onSubmit = (event) => {
        event.preventDefault()
        const movie = this.state.movie
        this.props.getMovies(movie);
      };

    renderListMovies=()=>{
        if(this.props.movies !== undefined){
           return this.props.movies.map(movie =>{
            return (
                <Link className='col m2 movie-img' to={`/movie/${movie.id}`} key={movie.id}>
                    <img src={(`https://image.tmdb.org/t/p/w500${movie.poster_path}`) || (process.env.PUBLIC_URL + "/images/lechef.jpg")} alt='avatar'/>
                </Link>
            )
           }) 
        } 
    }

    render(){
        return(
            <div className='container'>
                <form>
                    <div className='row'>
                        <div className='col m12 s12'>
                            <div className="input-field col s6">
                                <input onChange={e => this.handleType(e)} value={this.state.movie} id="movie" type="text" className="validate"/>
                                <label htmlFor="movie">Search Movie</label>
                            </div>
                        </div>
                    </div>
                    <div className="center">
                        <button onClick={this.onSubmit} className="waves-effect waves-light btn ">Search</button>
                    </div><br></br>
                </form>
                <div className='row center'>
                    {this.renderListMovies()}
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth.authenticated,
        movies: state.movies.movies.results
    }
}
export default connect(mapStateToProps, actions)(Welcome);
