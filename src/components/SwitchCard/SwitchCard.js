import React from "react";
import "./SwitchCard.css";
import { Link } from "react-router-dom";
const SwitchCard = (props) => {
  console.log("books", window.location.pathname);
  return (
    <div className="switch_card">
      <div className="switch_heading d-flex justify-content-between">
        <h2>{props.heading}</h2>
        <i class="uil uil-user-circle"></i>
      </div>
      <div className="switch_date">
        <h5>{props.date}</h5>
        <div className="line"></div>
      </div>
      <ul className="switch_links">
        <Link to="/myaccount">
      { window.location.pathname==='/myaccount' ?<li style={{ backgroundColor: "#D8C8B0" }}>My Account</li>:<li style={{ }}>My Account</li>}
        </Link>
        <Link to="/setupaccount">
        { window.location.pathname==='/setupaccount' ?<li style={{ backgroundColor: "#D8C8B0" }}>Wallet Management</li>:<li style={{ }}>Wallet Management</li>}
        </Link>
        <Link to="/table">
        { window.location.pathname==='/table' ?<li style={{ backgroundColor: "#D8C8B0" }}>Account Transactions</li>:<li style={{ }}>Account Transactions</li>}

        </Link>
        <Link to="/reward">
        { window.location.pathname==='/reward' ?<li style={{ backgroundColor: "#D8C8B0" }}>Rewards</li>:<li style={{ }}>Rewards</li>}
           
        </Link>
        <Link>
          <li>Edit Profile</li>
        </Link>
        <Link>
          <li>Edit Information</li>
        </Link>
      </ul>

      <hr className="line2" />
      <div className="post_link text-center fw-bold fs-5">
        <a href={props.link}>Log Out</a>
      </div>
    </div>
  );
};

export default SwitchCard;
