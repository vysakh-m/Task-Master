import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
        <div>
          <Navbar />
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Footer />
        </div>
      </Router>
      </Provider>
      
    );
  }
}
