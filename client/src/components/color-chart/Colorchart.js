import React from "react";
import "../../styles/color-chart.css";
export default function Colorchart() {
  return (
    <div>
      <hr />
      <h4 style={{ textAlign: "center" }}>Color Chart</h4>
      <hr />
      <div className="container text-center label-container shadow-lg p-3 mb-5 bg-white rounded">
        <div>
          <hr />
          <h5>Labels</h5>
          <hr />
          <div className="color-flex">
            <div className="color personal ml-2 flex-child"></div>
            <h5 className="ml-2 mt-2">Personal</h5>
            <div className="color work ml-2 flex-child"></div>
            <h5 className="ml-2 mt-2">Work</h5>
            <div className="color shopping ml-2 flex-child"></div>
            <h5 className="ml-2 mt-2">Shopping</h5>
            <div className="color other ml-2 flex-child"></div>
            <h5 className="ml-2 mt-2">Other</h5>
          </div>
        </div>

        <div>
          <hr />
          <h5>Status</h5>
          <hr />
          <div className="color-flex">
            <div className="color new ml-2"></div>
            <h5 className="ml-2">New</h5>
            <div className="color progress ml-2"></div>
            <h5 className="ml-2">Progress</h5>
            <div className="color complete ml-2"></div>
            <h5 className="ml-2">Complete</h5>
          </div>
        </div>

        <div>
          <hr />
          <h5>Priority</h5>
          <hr />
          <div className="color-flex">
            <div className="color low ml-2"></div>
            <h5 className="ml-2">Low</h5>
            <div className="color medium ml-2"></div>
            <h5 className="ml-2">Medium</h5>
            <div className="color high ml-2"></div>
            <h5 className="ml-2">High</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
