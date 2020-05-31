import React, { Component } from 'react'
import '../../styles/login.css'


export default class Login extends Component {
  render() {
    return (
      <div className="container mt-5">
      <div className="log-box shadow-lg p-3 mb-5 bg-white rounded">
        <h2>Welcome</h2>
        <hr/>
        <form>
          <div className="input-txt mt-5 mrg-val">
            <div className="form-group row">
              <div className="col-sm-10">
                <input type="email" className="form-control" id="inputEmail3" placeholder="Email" style={{paddingLeft: "30px"}} /> 
                <i className="fas fa-envelope cst-pos"></i>


              </div>
            </div>
            <div className="form-group row mt-2">
              <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword3" placeholder="Password" style={{paddingLeft: "30px"}}/>
                <i className="fas fa-lock cst-pos"></i>
              </div>
            </div>
          </div>
          
          <div className="form-group row">
            <div className="col-sm-10">
              <button type="submit" className="btn btn-dark pl-5 pr-5 pt-3 pb-3 mrg-val mt-2">Login</button>
            </div>
          </div>
        </form>

      </div>
    </div>
    )
  }
}
