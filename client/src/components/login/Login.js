import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import "../../styles/login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(user,this.props.history)
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/home');
    }
    
    if (nextProps.errors) {
      console.log(nextProps.errors)
      this.setState({ errors: nextProps.errors });
    }
  }
  render() {
    return (
      <div className="container mt-5">
        <div className="log-box shadow-lg p-3 mb-5 bg-white rounded">
          <h2>Welcome</h2>
          <hr />
          <form onSubmit={this.onSubmit}>
            <div className="input-txt mt-5 mrg-val">
              <div className="form-group row">
                <div className="col-sm-10">
                  <input
                    type="email"
                    name="email"
                    onChange={this.onChange}
                    value={this.state.email}
                    className={classnames("form-control",{
                      'is-invalid':this.state.errors.email
                    })}
                    id="inputEmail3"
                    placeholder="Email"
                    style={{ paddingLeft: "30px" }}
                  />
                  {this.state.errors.email && (
                    <div className='invalid-feedback'> {this.state.errors.email} </div>
                  )}
                  <i className="fas fa-envelope cst-pos"></i>
                </div>
              </div>
              <div className="form-group row mt-2">
                <div className="col-sm-10">
                  <input
                    type="password"
                    name="password"
                    onChange={this.onChange}
                    value={this.state.password}
                    className={classnames("form-control",{
                      'is-invalid':this.state.errors.password
                    })}
                    id="inputPassword3"
                    placeholder="Password"
                    style={{ paddingLeft: "30px" }}
                  />
                  {this.state.errors.password && (
                    <div className='invalid-feedback'> {this.state.errors.password} </div>
                  )}
                  <i className="fas fa-lock cst-pos"></i>
                </div>
              </div>
            </div>

            <div className="form-group row">
              <div className="col-sm-10">
                <button
                  type="submit"
                  className="btn btn-dark pl-5 pr-5 pt-3 pb-3 mrg-val mt-2"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
