import React from "react";
import "./Description.css";

function Description() {
  return (
    <div className="Description-main">
      <div className="description-main-head">Description</div>

      <div className="description-main-1">
        <div className="description-main-1-text">
          A good description includes:
        </div>
        <ui className="description-main-point">
          <li className="description-main-point-1">What the deliverable is</li>
          <li className="description-main-point-1">
            Type of freelancer or agency you're looking for
          </li>
          <li className="description-main-point-1">
            Anyting unique about the project, team, or your company
          </li>
        </ui>
      </div>

      <div className="title-main-1">
        <div className="title-main-1-text">
          Additional project files (optional)
        </div>

        <input type="file" id="file-input" name="file-input" />
      </div>

      <div className="description-buttons">
        <button className="description-cancel">Cancel</button>
        <button className="description-continue">Continue</button>
      </div>
    </div>
  );
}

export default Description;
