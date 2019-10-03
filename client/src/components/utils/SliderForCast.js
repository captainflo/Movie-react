import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

export default class SliderForCast extends Component {
  lastMovie = () => {
    if (this.props.casts !== undefined) {
      return this.props.casts.map(cast => {
        return (
          <div  key={cast.id} className="box-cast">
            <Link to={`/cast/${cast.id}`}>
              {this.renderImage(cast.profile_path)}
            </Link>
          </div>
        );
      });
    }
  };
  renderImage = movie => {
    if (movie === null) {
      return (
        <img
          style={{ width: "100%" }}
          src={process.env.PUBLIC_URL + "/images/cinema.jpg"}
          alt="img"
        />
      );
    } else {
      return (
        <img
          style={{ width: "100%" }}
          src={`https://image.tmdb.org/t/p/w500${movie}`}
          alt="img"
        />
      );
    }
  };

  render() {
    const settings = {
      initialSlide: 0,
      infinite: true,
      speed: 900,
      slidesToScroll: 6,
      slidesToShow: 6
    };
    return (
      <div>
        <Slider {...settings}>{this.lastMovie()}</Slider>
      </div>
    );
  }
}
