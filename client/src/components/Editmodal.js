/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { addTaskData } from "../actions/listActions";
import { editSubmit,closeModel } from "../actions/modalActions";
import isEmpty from '../validation/is-empty'

class ModalExample extends Component{
  constructor(props){
    super(props);
    this.state={
      name:'',
      label:'',
      status:'',
      priority:'',
      date:'',
      time:'',
      id:'',
      show:false,
      errors:{}
    }
    this.onChange=this.onChange.bind(this);
    this.onSubmit=this.onSubmit.bind(this);
    
  }


  // componentDidMount(){
  //   this.setState({
  //     name:this.props.modalData.name,
  //     label:this.props.modalData.label,
  //     status:this.props.modalData.status,
  //     priority:this.props.modalData.priority,
  //     date:this.props.modalData.date,
  //     time:this.props.modalData.time,
  //     id:this.props.modalData.id,
  //   })
  // }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const {date}=this.state;
    let db_date=date.substring(8)+"-"+date.substring(5,7)+"-"+date.substring(0,4)
    console.log(db_date)
    const newTask = {
      name: this.state.name,
      label: this.state.label,
      status: this.state.status,
      priority: this.state.priority,
      date: db_date,
      time: this.state.time,
      id:this.state.id
    };
    this.props.editSubmit(newTask)
  }

  //   componentDidMount(){
  //   this.setState({
  //     errors:{}
  //   })
  // }

  componentWillReceiveProps=(nextProps)=>{
    if(nextProps.modalData.show){
      console.log("SHOW CHANGE")
      this.setState({
        show:nextProps.modalData.show
      })
      
    }
    if(nextProps.modalData.editData && !isEmpty(nextProps.modalData.editData) ){
      const date=nextProps.modalData.editData.date
      let f_date=date.substring(6)+"-"+date.substring(3,5)+"-"+date.substring(0,2); 
      console.log(f_date)
      this.setState({
        name:nextProps.modalData.editData.name,
      label:nextProps.modalData.editData.label,
      status:nextProps.modalData.editData.status,
      priority:nextProps.modalData.editData.priority,
      date:f_date,
      time:nextProps.modalData.editData.time,
      id:nextProps.modalData.editData.id
        
      })
    }

    if(nextProps.errors){
      this.setState({
        errors: nextProps.errors
      })
    }
  }
  
  render(){
    console.log(this.state)
    let toggle=()=>{
      this.props.closeModel();
      this.setState({
        show:false
      })

    }


    return (
      <div>
        <Modal isOpen={this.state.show} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
          toggle={toggle} >
          <ModalHeader toggle={toggle}>EDIT TASK</ModalHeader>
          <ModalBody>
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
              Update Task
            </button>
          </div>
        </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  
} 
  
  const mapStateToProps=(state)=>({
    modalData:state.modal,
    errors:state.errors
  })


export default connect(mapStateToProps,{addTaskData,editSubmit,closeModel})(ModalExample);

