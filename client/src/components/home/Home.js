import React, { Component } from 'react'
import Addtask from './Addtask'
import HomeHeader from './HomeHeader'
import Results from './Results'
import Filterbox from './Filterbox'
import "../../styles/home.css";
import {getList} from '../../actions/listActions'
import { connect } from 'react-redux';
 class Home extends Component {
   componentDidMount(){
     this.props.getList()
   }
  render() {
    return (
      <div>
        <hr/>
      <Addtask/>
      <HomeHeader/>

      <Results from="home"/>
      </div>
      
    )
  }
}


// const mapStateToProps=state=>({

// })

export default connect(null,{getList})(Home);