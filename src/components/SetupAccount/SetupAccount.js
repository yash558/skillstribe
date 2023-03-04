import React from "react";
import "./Setupaccount.css";
import SwitchCard from "./../SwitchCard/SwitchCard";

const SetupAccount = () => {
  return (
    <div className="setupaccount d-flex flex-column">
      <div className="setupaccount_wrapper">
        <div className="setupaccount_heading">
          <h1>Setup Account</h1>
        </div>
        <div className="form">
          <form onSubmit="">
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Name
              </label>
              <input className="form-control" type="text" id="name" required />
            </div>
            <div className="d-flex flex-row gap-4 email_selectRole">
              <div className="mb-3 email_input">
                <label className="form-label email" htmlFor="email">
                  Email
                </label>
                <input
                  className="form-control email_input"
                  type="email"
                  id="email"
                  required
                />
              </div>
              <div className="mb-3 d-flex flex-column ">
                <label className="form-label role" htmlFor="name">
                  Select Role
                </label>
                <select name="cars" id="cars" className="form-control w-100">
                  <option value="volvo">Freelancer</option>
                  <option value="saab">Usa</option>
                  <option value="mercedes">Brazil</option>
                  <option value="audi">Japan</option>
                </select>
              </div>
            </div>
            <div className="d-flex gap-5 workingHours_timezone">
              <div className="mb-3 d-flex flex-column">
                <label className="form-label" htmlFor="name">
                  Country Code
                </label>
                <select name="cars" id="cars" className="form-control country">
                  <option value="volvo">India</option>
                  <option value="saab">Usa</option>
                  <option value="mercedes">Brazil</option>
                  <option value="audi">Japan</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label " htmlFor="phone">
                  Contact Number
                </label>
                <input
                  className="form-control phone "
                  type="phone"
                  id="phone"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Description">
                Profile Description
              </label>
              <textarea
                className="form-control"
                rows={5}
                id="message"
                required
              />
            </div>
            {/* <div className="other_details d-flex flex-row">
                        <h3>Other details</h3>
                        <div className="line"></div>
                    </div> */}
            <div className="mb-3">
              <label className="form-label" htmlFor="Description">
                Mailling Address
              </label>
              <textarea
                className="form-control"
                rows={5}
                id="message"
                required
              />
            </div>

            <div className="d-flex gap-5 workingHours_timezone">
              <div className="mb-3 d-flex flex-column">
                <label className="form-label" htmlFor="name">
                  Working Hours
                </label>

                <div className="hours d-flex flex-row">
                  <input type="text" className="hours_time" />
                  <span>|</span>
                  <select
                    name="cars"
                    id="cars"
                    className="form-control weeks w-100"
                  >
                    <option value="volvo">India</option>
                    <option value="saab">Usa</option>
                    <option value="mercedes">Brazil</option>
                    <option value="audi">Japan</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="time">
                  Time Zone
                </label>
                <input
                  className="form-control"
                  type="datetime-local"
                  id="phone"
                  required
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="public_right">
        <SwitchCard heading="Welcome Evangilin" />
      </div>
    </div>
  );
};

export default SetupAccount;
