import React from "react";
import "./Title.css";

function Title() {
  return (
    <div className="title-main">
      <div className="title-main-head">Title</div>
      <div className="title-main-1">
        <span className="title-main-1-text">
          Enter The Name Of Your Gig Post
        </span>
        <input
          className="form-control"
          type="text"
          placeholder="Name of Gig"
          id="Name of Gig"
          required
        />
      </div>
      <div className="title-main-1">
        <div className="title-main-1-text">Here are some good examples:</div>
        <ui className="title-main-point">
          <li className="title-main-point-1">
            Developer needed for creating a responsive WordPress Theme
          </li>
          <li className="title-main-point-1">
            CAD designer to create a 3D model of a residential building
          </li>
          <li className="title-main-point-1">
            Need a design for a new company logo
          </li>
        </ui>
      </div>
      <div className="title-main-1">
        <span className="title-main-1-text">Select a Gig Category</span>
        <select name="cars" id="cars" className="form-control w-70">
          <option value="volvo">Select</option>
          <option value="saab">Usa</option>
          <option value="mercedes">Brazil</option>
          <option value="audi">Japan</option>
        </select>
      </div>
      <div className="title-main-1">
        <span className="title-main-1-text">Speciality</span>
        <select name="cars" id="cars" className="form-control w-70">
          <option value="volvo">Select</option>
          <option value="saab">Usa</option>
          <option value="mercedes">Brazil</option>
          <option value="audi">Japan</option>
        </select>
      </div>
      <div className="title-main-1">
        <span className="title-main-1-text">What would you like to do?</span>
        <div className="title-main-1-container-primary">
          <div className="title-main-1-container">
            <img
              className="title-main-1-container-img"
              src="https://img.icons8.com/ios-filled/50/null/average-2.png"
            />
            <span className="title-main-1-msg">Fixed Price Based Project</span>
          </div>
          <div className="title-main-1-container">
            <img
              className="title-main-1-container-img"
              src="https://img.icons8.com/material-rounded/24/null/square-clock.png"
            />
            <span className="title-main-1-msg"> Hourly based Project</span>
          </div>
        </div>
      </div>
      <div className="title-buttons">
        <button className="title-cancel">Cancel</button>
        <button className="title-continue">Continue</button>
      </div>
    </div>
  );
}

export default Title;
