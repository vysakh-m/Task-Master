import React, { Component } from 'react'
import {connect} from 'react-redux'
import { deleteTask } from "../../actions/listActions";

 class Singleresult extends Component {
   constructor(props){
     super(props);
     this.onclickDelete=this.onclickDelete.bind(this);
   }

   onclickDelete(){
    this.props.deleteTask(this.props.id)
   }
  render() {
    return (
      <div className="flex-child shadow-lg p-3 mb-5 bg-white rounded">
        <div className="card" style={{width: "18rem"}}>
          <div className="card-body">
            <h5 className="card-title"><strong>{this.props.name}</strong></h5>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item" style={{textAlign: "center"}}>
              <i>Date : {this.props.date} </i> 
            </li>
            <li className="list-group-item" style={{textAlign: "center"}}>
              <i>Time : {this.props.time} </i> 
            </li>
            <li className="list-group-item">
              <div className="tag_style">
                <p className="card_p l_personal">{this.props.label}</p>
                <p className="card_p s_new">{this.props.status}</p>
                <p className="card_p p_l">{this.props.priority}</p>
              </div>
              
            </li>
          </ul>
          <div className="card-body">
            <button className=" btn btn-dark card-link">Edit Task</button>
            <button onClick={this.onclickDelete} className=" btn btn-dark card-link">Delete</button>
            <button className=" btn btn-dark card-link mt-2 mr-2">Mark as complete</button>
          </div>
        </div>
      </div>
    )
  }
}


export default connect(null,{deleteTask})(Singleresult)