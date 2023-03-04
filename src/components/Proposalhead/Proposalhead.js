import React from "react";
import "./Proposalhead.css";

function Proposalhead() {
  return (
    <div className="proposalhead-main">
      <div className="proposalhead-main-1">
        <div className="proposalhead-main-1-btns">
          <span className="proposalhead-main-1-head">k #79</span>
          <div className="proposalhead-main-1-btn">
            <button className="proposalhead-main-1-btn-cancel">
              Cancel contract
            </button>
            <button className="proposalhead-main-1-btn-fund">Fund Gig</button>
            <button className="proposalhead-main-1-btn-refresh">Refresh</button>
          </div>
        </div>
        <div className="proposalhead-main-1-details">
          <sapn className="proposalhead-main-1-details">Created:2/26/2023</sapn>
          <sapn>by 5b4a4xnmtjss</sapn>
        </div>
      </div>
      <div className="proposalhead-main-2">
        <div className="proposalhead-main-2-budget">
          <span className="proposalhead-main-2-budget-1">Gig Budget: </span>
          <sapn className="proposalhead-main-2-budget-2">72.0000 ALA</sapn>
        </div>
        <button className="proposalhead-main-1-btn-cancel">Change</button>
      </div>
      <span className="proosalhead-main-info">
        Amount in escrow: 0.0000 ALA - Please fund the gig
      </span>
      <div className="proposalhead-main-3">
        <div className="proposalhead-main-3-1">View Gig</div>
        <div className="proposalhead-main-3-1">Invite</div>
        <div className="proposalhead-main-3-1">Proposals</div>
        <div className="proposalhead-main-3-1">Invited</div>
        <div className="proposalhead-main-3-1">Hire</div>
      </div>
    </div>
  );
}

export default Proposalhead;
