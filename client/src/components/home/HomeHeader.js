import React, { Component } from "react";
import Filterbox from "./Filterbox";

export default class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      click: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.setState({
      click: !this.state.click,
    });
  }
  render() {
    let content;
    if (this.state.click) {
      content = <Filterbox />;
    } else {
      content = "";
    }
    return (
      <div>
        <div>
          <hr />
          <div className="container">
            <h4 style={{ textAlign: "center" }}>Active Tasks</h4>
          </div>
          <hr />
          <div
            className="container text-center"
            style={{ marginBottom: "20px" }}
          >
            <button onClick={this.onClick} className="btn btn-warning ">
              <i className="fas fa-filter"></i> Add Filters
            </button>
          </div>
        </div>
        {content}
      </div>
    );
  }
}
