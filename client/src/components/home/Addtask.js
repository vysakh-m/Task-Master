import React, { Component } from 'react'

export default class Addtask extends Component {
  render() {
    return (
      <div className="container">
      
        <form className="form-inline">
          <div className="centering">
          <label className="sr-only" htmlFor="inlineFormInputName2">Enter Task</label>
          <input
            type="text"
            className="form-control mb-2 mr-sm-2 custom_spacing is-invalid"
            id="inlineFormInputName2"
            name="name"
            placeholder="Enter Task"
          />
          <select name="label" className="custom-select select_custom is-invalid">
            <option defaultValue>Set Label</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Shopping">Shopping</option>
            <option value="Others">Others</option>
          </select>
          <select name="status" className="custom-select select_custom">
            <option defaultValue>Set Status</option>
            <option value="New">New</option>
            <option value="Progress">Progress</option>
          </select>
          <select name="priority" className="custom-select select_custom">
            <option defaultValue>Set Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input className="form-control select_custom is-invalid" id="date" name="date" placeholder="Set Due Date" type="text"/>
          
        </div>
        <div className="centering">
          <input name="time" type='time' className="time" value='now'/>
          <br/>
          <button type="submit" className="btn bt-bg mb-2 mt-2">
            Add Task
          </button>
        </div>
        </form>
      
    </div>
    )
  }
}
