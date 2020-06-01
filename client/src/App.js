import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
// import { clearCurrentProfile } from './actions/profileActions';
import PrivateRoute from './components/common/PrivateRoute';

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Colorchart from "./components/color-chart/Colorchart";


// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    // store.dispatch(clearCurrentProfile());
    window.location.href = '/login';
  }
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <div>
          <Navbar />
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Switch>
            <PrivateRoute exact path='/home' component={Home}/>
          </Switch>
          <Switch>
            <PrivateRoute exact path='/color' component={Colorchart}/>
          </Switch>
          <Footer />
        </div>
      </Router>
      </Provider>
      
    );
  }
}
