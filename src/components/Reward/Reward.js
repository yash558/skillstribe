import React from "react";
import "./Reward.css";
import SwitchCard from "./../SwitchCard/SwitchCard";
const Reward = () => {
  return (
    <div className="table_wrapper">
      
      <div className="table_container">
        <div className="table">
        <div className="setupaccount_heading">
        <h1>Dispute Rewards</h1>
      </div>
          <div className="tab">
            
            <table>
              <tr>
                <th>Date & Time</th> 
                <th>Win Count</th>
                <th>Payout Account</th>
              </tr>
              <tr>
                <td>Saturday, 17/06/22, 3:50 PM</td>
                <td>55 </td> 
                <td>505.0000 ALA</td>
              </tr>
              <tr>
                <td>Saturday, 17/06/22, 3:50 PM</td>
                <td>55 </td> 
                <td>505.0000 ALA</td>
              </tr>
              <tr>
                <td>Saturday, 17/06/22, 3:50 PM</td>
                <td>55 </td> 
                <td>505.0000 ALA</td>
              </tr>
              <tr>
                <td>Saturday, 17/06/22, 3:50 PM</td>
                <td>55 </td> 
                <td>505.0000 ALA</td>
              </tr>
              <tr>
                <td>Saturday, 17/06/22, 3:50 PM</td>
                <td>55 </td> 
                <td>505.0000 ALA</td>
              </tr>
             
            </table>
          </div>
        </div>
      </div>
      <div className="public_right">
        <SwitchCard heading="Welcome Evangilin" />
      </div>
    </div>
  );
};

export default Reward;
