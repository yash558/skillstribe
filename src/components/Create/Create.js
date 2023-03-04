import React from "react";
import yoga from "../../assets/Yoga.png";
import "./create.css";
import { Link } from "react-router-dom";

const Create = () => {
  return (
    <>
      <div className="create d-flex flex-row justify-content-between col-10 ">
        <div className="create_left">
          <img src={yoga} alt="" className="create-img" />
        </div>
        <div className="create_right">
          <div className="create_account">
            <h2>Create an Account</h2>
          </div>
          <div className="create_details">
            <label htmlFor="">Mnemonic</label>
            <textarea name="" id="" cols="30" rows="4"></textarea>
            <label htmlFor="">Enter Password</label>
            <input type="search" />
            <Link to="/account">
              {" "}
              <button className="mt-3 login-btn justify-content-center">
                Login
              </button>
            </Link>
            <div className="or">
              <div className="line1"></div>
              <p className="text-center mt-3 mx-2">or</p>
              <div className="line1"></div>
            </div>
            <button>Sign Up with Alacrity</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;
