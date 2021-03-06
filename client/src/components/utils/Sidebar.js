import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Sidebar extends React.Component {
  renderLinks() {
    if (this.props.authenticated) {
      return (
        <div>
          <li>
            <Link to="/signout">
              <i className="material-icons">cloud</i> Signout
            </Link>
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signin">
              <i className="material-icons">cloud</i> Login
            </Link>
          </li>
        </div>
      );
    }
  }

  render() {
    return (
      <ul id="slide-out" className="sidenav">
        <li>
          <div className="user-view">
            <div className="background">
              <img
                src={process.env.PUBLIC_URL + "/images/water.jpg"}
                alt="background"
              />
            </div>
            {this.props.authenticated ? (
              <span>
                <Link to={`/user/${this.props.authenticated._id}`}>
                  <img
                    className="circle"
                    src={
                      this.props.authenticated.avatar ||
                      process.env.PUBLIC_URL + "/images/background.jpg"
                    }
                    alt="avatar"
                  />
                </Link>
                <a href="#name">
                  <span className="white-text name">
                    {this.props.authenticated.firstName || null}{" "}
                    {this.props.authenticated.lastName || null}
                  </span>
                </a>
                <span>
                  <span className="white-text email">
                    {this.props.authenticated.email}
                  </span>
                </span>
              </span>
            ) : (
              <div style={{paddingBottom: '10px'}}>
                <a href="#/">
                  <img
                    className="circle"
                    src={process.env.PUBLIC_URL + "/images/background.jpg"}
                    alt="avatar"
                  />
                </a>
              </div>
            )}
          </div>
        </li>
        {this.renderLinks()}
        <li>
          <div className="divider" />
        </li>
      </ul>
    );
  }
}

function mapStateToPros(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToPros)(Sidebar);
