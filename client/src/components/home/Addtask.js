import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { addTaskData } from "../../actions/listActions";
class Addtask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      label: "",
      status: "",
      priority: "",
      date: "",
      time: "",
      errors: {},
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
    const { date } = this.state;
    let db_date =
      date.substring(8) +
      "-" +
      date.substring(5, 7) +
      "-" +
      date.substring(0, 4);
    e.preventDefault();
    const newTask = {
      name: this.state.name,
      label: this.state.label,
      status: this.state.status,
      priority: this.state.priority,
      date: db_date,
      time: this.state.time,
    };
    this.props.addTaskData(newTask);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    return (
      <div className="container">
        <form className="form-inline" onSubmit={this.onSubmit}>
          <div className="centering">
            <label className="sr-only" htmlFor="inlineFormInputName2">
              Enter Task
            </label>
            <input
              type="text"
              value={this.state.name}
              onChange={this.onChange}
              className={classnames(
                "form-control mb-2 mr-sm-2 custom_spacing",
                {
                  "is-invalid": this.state.errors.name,
                }
              )}
              id="inlineFormInputName2"
              name="name"
              placeholder="Enter Task"
              
            />

            <select
              value={this.state.label}
              onChange={this.onChange}
              name="label"
              className={classnames("custom-select select_custom", {
                "is-invalid": this.state.errors.label,
              })}
            >
              <option defaultValue>Set Label</option>
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Shopping">Shopping</option>
              <option value="Others">Others</option>
            </select>
            <select
              value={this.state.status}
              onChange={this.onChange}
              name="status"
              className={classnames("custom-select select_custom", {
                "is-invalid": this.state.errors.status,
              })}
            >
              <option defaultValue>Set Status</option>
              <option value="New">New</option>
              <option value="Progress">Progress</option>
            </select>
            <select
              value={this.state.priority}
              onChange={this.onChange}
              name="priority"
              className={classnames("custom-select select_custom", {
                "is-invalid": this.state.errors.priority,
              })}
            >
              <option defaultValue>Set Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <input
              value={this.state.date}
              onChange={this.onChange}
              className={classnames("form-control select_custom", {
                "is-invalid": this.state.errors.date,
              })}
              name="date"
              id="date"
              placeholder="DD-MM-YYYY"
              type="date"
            />
          </div>
          <div className="centering">
            <input
              value={this.state.time}
              onChange={this.onChange}
              name="time"
              type="time"
              className={classnames("time", {
                "time-error": this.state.errors.time,
              })}
            />
            <br />
            <button type="submit" className="btn bt-bg mb-2 mt-2">
              Add Task
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errors: state.errors,
});
export default connect(mapStateToProps, { addTaskData })(Addtask);
