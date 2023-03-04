import React from "react";
import UserCart from "./UserCart";

import "./User.css";
import RatingCard from "./../RatingCard/RatingCard";

const User = () => {
  return (
    <div className="user d-flex mt-5">
      <div className="user_left mx-4">
        <div className="user_title">
          <h1>My Gigs</h1>
        </div>
        <UserCart />
      </div>
      <div className="user_right">
        <RatingCard
          heading="Welcome Evangilin"
          date="11/01/2023"
          months="7 months"
          price="7*"
          level="Expert"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
        />
      </div>
    </div>
  );
};

export default User;
