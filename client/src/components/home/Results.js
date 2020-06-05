import React, { Component } from "react";
import { connect } from "react-redux";
import Singleresult from "./Singleresult";
import { getList } from "../../actions/listActions";
import Spinner from "../common/Spinner";

class Results extends Component {
  componentDidMount() {
    if (this.props.from === "archive") {
      this.props.getList("archive");
    } else if (this.props.from === "home") {
      this.props.getList("home");
    }
  }
  render() {
    console.log(this.props.from);
    let dashboardContent;
    const { loading, listData } = this.props.list;
    //listData.data was very helpful since without it else condition
    //would return undefined for a split second thus causing error

    if (loading || listData.data === undefined) {
      dashboardContent = <Spinner />;
    } else {
      const lists = listData.data;
      if (lists.length > 0) {
        dashboardContent = lists.map((list) => (
          <Singleresult
            key={list._id}
            name={list.name}
            label={list.label}
            status={list.status}
            priority={list.priority}
            date={list.date}
            time={list.time}
            id={list._id}
            from={this.props.from}
          />
        ));
      } else {
        dashboardContent = <h5>No active tasks found</h5>;
      }
    }
    return <div className="container flexing">{dashboardContent}</div>;
  }
}

const mapStateToProps = (state) => ({
  list: state.list,
});

export default connect(mapStateToProps, { getList })(Results);
