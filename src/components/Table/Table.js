import React from "react";
import "./Table.css";
import SwitchCard from "./../SwitchCard/SwitchCard";
const Table = () => {
  return (
    <div className="table_wrapper">
      
      <div className="table_container">
        <div className="table">
        <div className="setupaccount_heading">
        <h1>Account Transactions</h1>
      </div>
          <div className="tab">
            
            <table>
              <tr>
                <th>Date & Time</th>
                <th>Date & Time</th>
                <th>Gig ID</th>
                <th>Account</th>
              </tr>
              <tr>
                <td>Saturday, 17/06/22, 3:50 PM</td>
                <td>55:Transfer ALA to escrow:92022</td>
                <td>54</td>
                <td>505.0000 ALA</td>
              </tr>
              <tr>
                <td>Saturday, 17/06/22, 3:50 PM</td>
                <td>55:Transfer ALA to escrow:92022</td>
                <td>54</td>
                <td>505.0000 ALA</td>
              </tr>
              <tr>
                <td>Saturday, 17/06/22, 3:50 PM</td>
                <td>55:Transfer ALA to escrow:92022</td>
                <td>54</td>
                <td>505.0000 ALA</td>
              </tr>
              <tr>
                <td>Saturday, 17/06/22, 3:50 PM</td>
                <td>55:Transfer ALA to escrow:92022</td>
                <td>54</td>
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

export default Table;
