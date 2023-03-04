import React from "react";
import "./Expertise.css";

function Expertise() {
  return (
    <div className="expertise-main">
      <div className="expertise-main-head">Expertise</div>
      <span className="expertise-main-subhead-1">
        What skills and expertise are important to you in Data Mining &
        Management
      </span>
      <span className="expertise-main-subhead-2">Freelancer experience</span>
      <select name="cars" id="cars" className="form-control w-70">
        <option value="volvo">Select</option>
        <option value="saab">Beginner</option>
        <option value="mercedes">Intermediate</option>
        <option value="audi">Expert</option>
      </select>

      <div className="expertise-main-1">
        <div className="expertise-main-1-text">Location of Gig (Optional)</div>

        <input
          className="form-control"
          type="text"
          placeholder="Name of Gig"
          id="Name of Gig"
        />
      </div>
      <div className="expertise-buttons">
        <button className="expertise-cancel">Cancel</button>
        <button className="expertise-continue">Continue</button>
      </div>
    </div>
  );
}

export default Expertise;
