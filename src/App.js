import React from "react";
import "./App.css";
import Landing from "./Screens/landing/landing";
import Account from "./Screens/Account/Account";
import Navbar from "./components/Navbar/Navbar";
import Public from "./Screens/Public/Public";
import { Routes, Route } from "react-router-dom";
import MyAccount from "./components/MyAccount/MyAccount";
import Reward from "./components/Reward/Reward";
import SetupAccount from "./components/SetupAccount/SetupAccount";
import Table from "./components/Table/Table";
import Create from "./components/Create/Create";
import Footer from "./components/Footer/Footer";



function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <CreateProposal/> */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/myaccount" element={<MyAccount />} />
        <Route path="/setupaccount" element={<SetupAccount />} />
        <Route path="/table" element={<Table />} />
        <Route path="/create" element={<Create />} />
        <Route path="/account" element={<Account />} />
        <Route path="/reward" element={<Reward />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
