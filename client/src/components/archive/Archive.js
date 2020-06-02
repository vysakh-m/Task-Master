import React, { Component } from 'react'
import "../../styles/home.css";
import Results from '../home/Results'
import {connect} from 'react-redux'
import { selectFilter } from "../../actions/filterActions";
import Filterbox from "../home/Filterbox";



 class Archive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      select:false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    this.props.selectFilter();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter) {
      console.log(nextProps.filter)
      this.setState({ select: nextProps.filter.select });
      console.log(this.state)
    }
  }

  render() {
    let content;
    if (this.state.select) {
      content = "";
    } else {
      content = "none";
    }

    return (
      <div>
        <hr/>
    <h4 style={{textAlign: "center"}}>Archived Tasks</h4>
    <hr/>
    
    <div class="container text-center" onClick={this.onClick} style={{marginBottom: "20px"}}>
      <button class="btn btn-warning "><i class="fas fa-filter"></i> Add Filters</button>
      
    </div>
    <hr/>
    <div style={{display:`${content}`}}>
        <Filterbox from="archive" />
        </div>

    <Results from="archive"/>
      </div>
    )
  }
}

const mapStateToProps=(state)=>({
  filter:state.filter
});


export default connect(mapStateToProps,{selectFilter})(Archive)