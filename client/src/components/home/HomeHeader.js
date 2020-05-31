import React, { Component } from "react";

export default class HomeHeader extends Component {
  render() {
    return (
      <div>
        <hr />
        <div className="container">
          <h4 style={{ textAlign: "center" }}>Active Tasks</h4>
        </div>
        <hr />
        <div className="container text-center" style={{ marginBottom: "20px" }}>
          <button className="btn btn-warning ">
            <i className="fas fa-filter"></i> Add Filters
          </button>
        </div>
      </div>
    );
  }
}
