import React from "react";
import Header from "./utils/Header";
import { BrowserRouter, Route} from 'react-router-dom';
import * as actions from './actions'
import { connect } from 'react-redux';
import M from "materialize-css/dist/js/materialize.min.js";
import './App.css';

import Welcome from './pages/Welcome';
import Signout from './auth/Signout';
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import UserShow from "./user/UserShow";
import UserEdit from "./user/UserEdit";
import MovieShow from "./Movies/MovieShow";
import Cast from "./Movies/Cast";



class App extends React.Component {
  componentDidMount(){
    this.props.fetchUser();
    // Sidebar
    const elem = document.querySelector(".sidenav");
    M.Sidenav.init(elem, {
      edge: "left",
      inDuration: 250
    });
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header />
          <Route exact path='/' component={Welcome}/>
          <Route path='/movie/:id' component={MovieShow}/>
          <Route path='/cast/:id' component={Cast}/>
          <Route path="/signout" component={Signout}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>

          {this.props.authenticated ?
          <div>
            <Route exact path="/user/:id" component={UserShow}/>
            <Route exact path='/user/edit/:id' component={UserEdit}/>
          </div> : ""}

        </BrowserRouter>
        
      </div>
    );
  }
}

function mapStateToPros(state) {
  return { authenticated: state.auth.authenticated};
}

export default connect(mapStateToPros, actions)(App);
