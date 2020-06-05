import React, { Component } from "react";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";
import { applyFilter, exitFilter } from "../../actions/filterActions";

class Filterbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      personal: "",
      work: "",
      shopping: "",
      others: "",
      high: "",
      medium: "",
      low: "",
      start_date: "",
      end_date: "",
      start_time: "",
      end_time: "",
      from: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeCheck = this.onChangeCheck.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onChangeCheck(e) {
    this.setState({
      [e.target.name]: e.target.checked,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const filterData = {
      personal: this.state.personal,
      work: this.state.work,
      shopping: this.state.shopping,
      others: this.state.others,
      high: this.state.high,
      medium: this.state.medium,
      low: this.state.low,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      start_time: this.state.start_time,
      end_time: this.state.end_time,
      from: this.props.from,
    };
    console.log(filterData);
    console.log(this.props);
    this.props.applyFilter(filterData);
  }

  onClick() {
    this.props.exitFilter();
  }

  render() {
    return (
      <div className="container">
        <div className="shadow-lg p-3 mb-5 bg-white rounded">
          <form onSubmit={this.onSubmit}>
            <div className="filter_flex">
              <div className="flex-child">
                <h5>Label</h5>
                <label className="container-checkbox">
                  Personal
                  <input
                    onChange={this.onChangeCheck}
                    name="personal"
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="container-checkbox">
                  Work
                  <input
                    onChange={this.onChangeCheck}
                    name="work"
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="container-checkbox">
                  Shopping
                  <input
                    onChange={this.onChangeCheck}
                    name="shopping"
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="container-checkbox">
                  Others
                  <input
                    onChange={this.onChangeCheck}
                    name="others"
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
              </div>

              <div className="flex-child">
                <h5>Priority</h5>
                <label className="container-checkbox">
                  High
                  <input
                    onChange={this.onChangeCheck}
                    name="high"
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="container-checkbox">
                  Medium
                  <input
                    onChange={this.onChangeCheck}
                    name="medium"
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="container-checkbox">
                  Low
                  <input
                    onChange={this.onChangeCheck}
                    name="low"
                    type="checkbox"
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="flex-child ml-3 date-range">
                <h5>Date Range</h5>
                <input
                  onChange={this.onChange}
                  value={this.state.start_date}
                  className="form-control select_custom"
                  name="start_date"
                  placeholder="DD-MM-YYYY"
                  type="date"
                />
                <br />
                <input
                  onChange={this.onChange}
                  value={this.state.end_date}
                  className="form-control select_custom"
                  name="end_date"
                  placeholder="DD-MM-YYYY"
                  type="date"
                />
              </div>
              <div className="flex-child ml-3">
                <h5>Time Range</h5>
                <div className="time-range">
                  <div>
                    <input
                      onChange={this.onChange}
                      type="time"
                      className=" mt-1"
                      name="start_time"
                      value={this.state.start_time}
                    />
                  </div>
                  <div>
                    <input
                      onChange={this.onChange}
                      type="time"
                      className=" mt-4"
                      name="end_time"
                      value={this.state.end_time}
                    />
                  </div>
                </div>
              </div>
              <div className="flex-child text-center">
                <button type="submit" className="btn btn-success btn-cs">
                  <i className="fas fa-filter"></i> Apply Filters
                </button>
              </div>
              <div className="flex-child text-center">
                <button
                  type="button"
                  className="btn btn-danger btn-cs"
                  onClick={this.onClick}
                >
                  <i className="fas fa-times-circle"></i> Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(null, { applyFilter, exitFilter })(Filterbox);
