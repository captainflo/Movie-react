import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default class SimpleSlider extends Component {
    lastMovie=()=>{
        if (this.props.lastMovie !== '') {
            return this.props.lastMovie.map(movie => {
              return (
                 <div key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <img
                    style={{width:'90%'}}
                    className='box-movie'   
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt="img"
                  />
                </Link>
                </div> 
              );
            });
          }
        }

  render() {   
    const settings = {
        infinite: true,
        speed: 900,
        slidesToShow: 4,
        slidesToScroll: 4,

      };
    return (
      <div>
        
        <Slider {...settings}>
            {this.lastMovie()}
        </Slider>
      </div>
    );
  }
}