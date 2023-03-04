import React from "react";
import RatingCard from "../RatingCard/RatingCard";
import "./MyAccount.css";
import SwitchCard from "./../SwitchCard/SwitchCard";
const MyAccount = () => {
  return (
    <div className="myAccount d-flex flex-column">
      <div className="myAccount_wrapper">
        <div className="myaccount_heading">
          <h1 className="fs-1">My Account</h1>
          <button className="fs-5">Public View</button>
        </div>
        <div className="form">
          <form onSubmit="">
            <div className="mb-3 mt-4">
              <label className="form-label " htmlFor="name" >
                Name
              </label>
              <input className="form-control" type="text" id="name" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                className="form-control"
                type="email"
                id="email"
                required
              />
            </div>

            <div className="d-flex gap-5">
              <div className="mb-3 d-flex flex-column">
                <label className="form-label" htmlFor="name">
                  Country Code
                </label>
                <select name="cars" id="cars" className="form-control w-100">
                  <option value="volvo">India</option>
                  <option value="saab">Usa</option>
                  <option value="mercedes">Brazil</option>
                  <option value="audi">Japan</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label" htmlFor="phone">
                  Contact Number
                </label>
                <input
                  className="form-control"
                  type="phone"
                  id="phone"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="Description">
                Description
              </label>
              <textarea
                className="form-control"
                rows={5}
                id="message"
                required
              />
            </div>
            <div className="other_details d-flex flex-row">
              <h2 style={{width:"45%"}}>Other details</h2>
              <div className="line"></div>
            </div>
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

            <div className="d-flex gap-5 countryCode_timezone">
              <div className="mb-3 d-flex flex-column">
                <label className="form-label" htmlFor="name">
                  Country Code
                </label>
                <select name="cars" id="cars" className="form-control w-100">
                  <option value="volvo">India</option>
                  <option value="saab">Usa</option>
                  <option value="mercedes">Brazil</option>
                  <option value="audi">Japan</option>
                </select>
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

export default MyAccount;
