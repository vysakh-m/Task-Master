import React, { Component } from 'react'
import {connect} from 'react-redux'
import { deleteTask } from "../../actions/listActions";
import { moveToArchive } from "../../actions/listActions";

 class Singleresult extends Component {
   constructor(props){
     super(props);
     this.onclickDelete=this.onclickDelete.bind(this);
     this.onclickArchive=this.onclickArchive.bind(this);
   }

   onclickDelete(){
    this.props.deleteTask(this.props.id,this.props.from)
   }
   onclickArchive(){
    this.props.moveToArchive(this.props.id,this.props.from)
   }
  render() {
    let style={}
    if(this.props.label==="Personal"){
      style.label="l_personal"
    }else if(this.props.label==="Work"){
      style.label="l_work"
    }else if(this.props.label==="Shopping"){
      style.label="l_shopping"
    }else if(this.props.label==="Others"){
      style.label="l_others"
    }

    if(this.props.status==="New"){
      style.status="s_new"
    }else if(this.props.status==="Progress"){
      style.status="s_progress"
    }else if(this.props.status==="Completed"){
      style.status="s_complete"
    }


    if(this.props.priority==="High"){
      style.priority="p_h"
    }else if(this.props.priority==="Medium"){
      style.priority="p_m"
    }else if(this.props.priority==="Low"){
      style.priority="p_l"
    }


    let content;
    if(this.props.from==="archive"){
      content=""
    }else{
      content=(
        <button onClick={this.onclickArchive} className=" btn btn-dark card-link mt-2 mr-2">Mark as complete</button>
      )
    }

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
                <p className={`card_p  ${style.label}` }>{this.props.label}</p>
                <p className={`card_p ${style.status}`}>{this.props.status}</p>
                <p className={`card_p  ${style.priority}`}>{this.props.priority}</p>
              </div>           
            </li>
          </ul>
          <div className="card-body">
            <button className=" btn btn-dark card-link">Edit Task</button>
            <button onClick={this.onclickDelete} className=" btn btn-dark card-link">Delete</button>
            {content}
          </div>
        </div>
      </div>
    )
  }
}


export default connect(null,{deleteTask,moveToArchive})(Singleresult)