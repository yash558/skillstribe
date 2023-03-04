import React from "react";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid col-10 mx-auto">
        <Link className="navbar-brand mt-2 logo-link" to="/">
          <img src={logo} alt="" height={55} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mx-3 mb-lg-0">
            {/* <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Link</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Dropdown
                            </a>
                           
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href='/'>Disabled</a>
                        </li> */}
            <div class="input-icons d-flex flex-row">
              <div className="search d-flex flex-row">
                <i className="uil uil-search"></i>
                <span>|</span>
              </div>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Jobs"
                aria-label="Search"
              />
            </div>
          </ul>
          <form className="d-flex buttons" role="search">
            <button className="login">
            <Link to="create">Login / </Link>
              <Link to="create"> Sign UP</Link>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
