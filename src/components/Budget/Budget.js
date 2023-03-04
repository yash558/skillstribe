import React from "react";
import "./Budget.css";

function Budget() {
  return (
    <div className="budget-main">
      <div className="budget-main-head">Budget</div>
      <div className="budget-main-1">
        <span className="budget-main-1-text">
          Set Budget Limit for Project (ALA)
        </span>
        <input
          style={{ width: "30%" }}
          className="form-control"
          type="text"
          placeholder="Enter Budget"
          id="Enter Budget"
          required
        />
      </div>
      <div className="budget-main-1">
        <span className="budget-main-1-text">Visibility</span>
        <span className="budget-main-1-text">Who can see your job?</span>
        <div className="budget-main-1-container-primary">
          <div className="budget-main-1-container">
            <img
              className="budget-main-1-container-img"
              src="https://img.icons8.com/ios-filled/50/null/average-2.png"
            />
            <span className="budget-main-1-msg">Only SkillsTribe Talent</span>
            <span className="budget-main-1-msg-1">
              Only Skilltribe users can find this job
            </span>
          </div>
          <div className="budget-main-1-container">
            <img
              className="budget-main-1-container-img"
              src="https://img.icons8.com/material-rounded/24/null/square-clock.png"
            />
            <span className="budget-main-1-msg"> Invite-Only</span>
            <span className="budget-main-1-msg-1">
              Only freelancers and agencies you have invited can find this job
            </span>
          </div>
        </div>
      </div>
      <div className="budget-main-1">
        <span className="budget-main-1-text">
          Estimated Duration of the Gig
        </span>
        <div className="budget-main-2">
          <input
            style={{ width: "50%", margin: "0" }}
            className="form-control"
            type="text"
            placeholder="Name of Gig"
            id="Name of Gig"
            required
          />
          <select
            style={{ width: "50%", margin: "0" }}
            name="cars"
            id="cars"
            className="form-control w-10"
          >
            <option value="volvo">Day</option>
            <option value="saab">Week</option>
            <option value="mercedes">Month</option>
            <option value="audi">Year</option>
          </select>
        </div>
      </div>
      {/* <div className="budget-main-0">
        <div className="budget-main-1">
          <span className="budget-main-1-text">Hourly Rate (ALA)</span>
          <input
            className="form-control"
            type="text"
            id="hourly-rate"
            required
          />
        </div>
        <div className="budget-main-1">
          <span className="budget-main-1-text">Weekly Limit (in hours)</span>
          <input
            className="form-control"
            type="text"
            id="weekly-limit"
            required
          />
        </div>
      </div> */}
      <div className="budget-main-1">
        <span className="budget-main-1-text">Milestone</span>
        <input
          style={{ width: "30%" }}
          className="form-control"
          type="text"
          placeholder="Title"
          id="Enter Budget"
          required
        />
        <input
          style={{ width: "30%" }}
          className="form-control"
          type="text"
          placeholder="Amount"
          id="Enter Budget"
          required
        />
        <input
          style={{ width: "30%" }}
          className="form-control"
          type="text"
          placeholder="Revision Limit For Milestone"
          id="Enter Budget"
          required
        />
        <input
          style={{ width: "30%" }}
          className="form-control"
          type="text"
          placeholder="Milestone Description"
          id="Enter Budget"
          required
        />
        <input
          style={{ width: "30%" }}
          className="form-control"
          type="Date"
          placeholder="Milestone Description"
          id="Enter Budget"
          required
        />
      </div>
      <button className="budget-cancel">Create Milestone</button>

      <div className="budget-milestone">
        <div className="budget-milestone-1">
          <span>Data Scientist</span>
          <span>I need Data Scientist</span>
        </div>
        <div className="budget-milestone-2">
          <span>Amount: 50 ALA</span>
          <span>Delivery Date: 2/25/2023</span>
          <span>Revision limit: 600</span>
        </div>
      </div>
      <div className="budget-buttons">
        <button className="budget-cancel">Cancel</button>
        <button className="budget-continue">Continue</button>
      </div>
    </div>
  );
}

export default Budget;
