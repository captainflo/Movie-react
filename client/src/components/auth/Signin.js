import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { reduxForm, Field } from "redux-form";
import * as actions from "../actions";
import "./Signin.css";

class Signin extends React.Component {
  onSubmit = (formProps) => {
    this.props.signin(formProps, ()=> this.props.history.push(`/`));
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className='container'>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <h4 className="center">Sign in <i className="fas fa-user-alt"></i></h4>
            <div className='row'>
              <div className='col m12 s12'>
                <div className='box-input-signin'>
                  <div className="input-field">
                    <div style={{color: 'red', marginLeft: '45px'}}>{this.props.errorMessage}</div>
                    <i className="material-icons prefix">email</i>
                      <Field
                        name="email"
                        type="text"
                        component="input"
                        autoComplete="none"
                        placeholder="email"
                      />
                  </div>
                </div>
              </div>
              <div className='col m12 s12'>
                <div className='box-input-signin'>
                  <div className="input-field">
                    <i className="material-icons prefix">lock</i>
                    <Field
                      name="password"
                      type="password"
                      component="input"
                      autoComplete="none"
                      placeholder="password"
                    />
                  </div>
                </div>   
              </div>
            </div>
          <div className="center">
            <button className="waves-effect waves-light btn btn-signin">Sign In</button>
          </div><br></br>
        </form>
        <div className="center">
           Or 
          <p>Login with</p>
          <ul>
            <li style={{listStyle:'none', paddingBottom: '10px'}}><a href="/auth/google" className="waves-effect waves-light btn social google">
            <i className="fab fa-google"></i>Google</a></li>
            <li style={{listStyle:'none', paddingBottom: '10px'}}><a href="/auth/linkedin" className="waves-effect waves-light btn social linkedin">
            <i className="fab fa-linkedin"></i>Linkedin</a></li>
            <li style={{listStyle:'none', paddingBottom: '10px'}}><a href='/auth/facebook'className="waves-effect waves-light btn social facebook">
            <i className="fab fa-facebook"></i>Facebook</a></li>
            <li style={{listStyle:'none', paddingBottom: '10px'}}><a href="/auth/instagram" className="waves-effect waves-light btn social instagram">
            <i className="fab fa-instagram"></i>Instagram</a></li>
          </ul>
          <Link to='/signup'>
            You don't have a Account? Sign up!
          </Link><br></br><br></br>
        </div>
      </div>
    );
  }
}

function mapStateToPros(state) {
  return {
    errorMessage: state.auth.errorMessage,
    auth: state.auth,
    authReducer: state.authReducer
  };
}

export default compose(
  withRouter,
  connect(
    mapStateToPros,
    actions,
  ),
  reduxForm({ form: "signin" })
)(Signin);
