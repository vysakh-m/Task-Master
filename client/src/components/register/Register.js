import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classnames from 'classnames'
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import "../../styles/register.css";


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password1: "",
      errors:{}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password1: this.state.password1,
    };
    this.props.registerUser(newUser, this.props.history);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }


  render() {
    return (
      
      <div className="container">
        
        <div className="log-box shadow-lg p-3 mb-5 bg-white rounded">
          <h2>Welcome</h2>
          <hr />
          <form onSubmit={this.onSubmit} noValidate>
            <div className="input-txt mt-5 mrg-val">
              <div className="form-group row">
                <div className="col-sm-10">
                  <input
                    type="text"
                    className={classnames("form-control",{
                      'is-invalid':this.state.errors.name
                    })}
                    onChange={this.onChange}
                    value={this.state.name}
                    name="name"
                    placeholder="Name"
                    style={{ paddingLeft: "30px" }}
                  />
                  {this.state.errors.name && (
                    <div className='invalid-feedback'> {this.state.errors.name} </div>
                  )}
                  <i className="fas fa-user cst-pos"></i>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10">
                  <input
                    type="email"
                    className={classnames("form-control",{
                      'is-invalid':this.state.errors.email
                    })}
                    onChange={this.onChange}
                    value={this.state.email}
                    name="email"
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
                    className={classnames("form-control",{
                      'is-invalid':this.state.errors.password
                    })}
                    onChange={this.onChange}
                    value={this.state.password}
                    name="password"
                    placeholder="Password"
                    style={{ paddingLeft: "30px" }}
                  />
                  {this.state.errors.password && (
                    <div className='invalid-feedback'> {this.state.errors.password} </div>
                  )}
                  <i className="fas fa-lock cst-pos"></i>
                </div>
              </div>
              <div className="form-group row mt-2">
                <div className="col-sm-10">
                  <input
                    type="password"
                    className={classnames("form-control",{
                      'is-invalid':this.state.errors.password1
                    })}
                    onChange={this.onChange}
                    value={this.state.password1}
                    name="password1"
                    placeholder="Confirm Password"
                    style={{ paddingLeft: "30px" }}
                  />
                  {this.state.errors.password1 && (
                    <div className='invalid-feedback'> {this.state.errors.password1} </div>
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
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
