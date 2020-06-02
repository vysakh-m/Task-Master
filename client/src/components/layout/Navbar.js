import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import "../../styles/navbar.css";

class Navbar extends Component {

  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {

    const authLinks=(
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          <li className="nav-item active">
              <Link className="nav-link nav_spac" to="/home">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav_spac" to='/archive'>
                Archived Tasks
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav_spac" to="/color">
                Color Chart
              </Link>
            </li>
            <li className="nav-item">
            <a className="nav-link nav_spac" href="" onClick={this.onLogoutClick.bind(this)}>
              Logout
            </a>
          </li>
          </ul>
    );

    const guestLinks = (
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="nav-link nav_spac" href="" to='/login'>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav_spac" href="" to='/register'>
                Signup
              </Link>
            </li>
          </ul>
    );
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a className="navbar-brand" href="#">
            Task Manager
          </a>
          {this.props.auth.isAuthenticated ? authLinks : guestLinks }
        </div>
      </nav>
    );
  }
}


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{logoutUser})(Navbar);
