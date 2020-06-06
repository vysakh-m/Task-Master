import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

//COMPONENTS
import PrivateRoute from "./components/common/PrivateRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Colorchart from "./components/color-chart/Colorchart";
import Archive from "./components/archive/Archive";
import Editmodal from "./components/Editmodal";

// Check for token
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
            </Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Switch>
              <PrivateRoute exact path="/home" component={Home} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/color" component={Colorchart} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/archive" component={Archive} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/edit" component={Editmodal} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
