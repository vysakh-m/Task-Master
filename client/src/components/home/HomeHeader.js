import React, { Component } from "react";
import {connect} from 'react-redux'
import { selectFilter } from "../../actions/filterActions";
import Filterbox from "./Filterbox";

class HomeHeader extends Component {
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
          <hr/>
        </div>
        <div style={{display:`${content}`}}>
        <Filterbox from="home" />
        </div>
        
      </div>
    );
  }
}
const mapStateToProps=(state)=>({
  filter:state.filter
});

export default connect(mapStateToProps,{selectFilter})(HomeHeader)