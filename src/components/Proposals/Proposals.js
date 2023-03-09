import React from "react";
import "./Proposals.css";
import yoga from "../../assets/Yoga.png";

function Proposals() {
  return (
    <div className="proposal-main">
      <div className="proposal-main-1">
        <img src={yoga} alt="" className="proposal-main-img" />
        <div className="proposal-main-1-info">
          <span className="proposal-main-1-info-head">Fathurr12</span>
          <span className="proposal-main-1-info-time">India Standard Time</span>
        </div>
      </div>
      <div className="proposal-main-1-head">App development proposal</div>
      <hr />
      <div className="proposal-main-1-msg">
        <p>please accept this proposal</p>
      </div>
      <hr />
      <span className="proposal-main-1-rate">Hourly Rate : 1500</span>
      <span className="proposal-main-1-date">Wed Aug 23 2022</span>
      <button className="proposal-btn">View Proposal</button>
    </div>
  );
}

export default Proposals;
