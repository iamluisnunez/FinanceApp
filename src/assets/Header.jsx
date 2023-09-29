import React, { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function Header() {
  const [activeLink, setActiveLink] = useState(""); // State to track the active link
  const location = useLocation(); // Get the current location from react-router
  const Login = Cookies.get("login");
  console.log(Login);

  // Function to handle link click and update the active link state

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="registerForm">
          <ul className="navbar-nav mr-auto">
            {Login ? (
              <li className={`nav-item`}>
                <Link to="/logout">
                  <button className="btn navButton">Logout</button>
                </Link>
              </li>
            ) : (
              <>
              <li className={`nav-item`}>
                  <Link to="/">
                    <button className="btn navButton">Home</button>
                  </Link>
                </li>
                <li className={`nav-item`}>
                  <Link to="/login">
                    <button className="btn navButton">Login</button>
                  </Link>
                </li>
                <li className={`nav-item`}>
                  <Link to="/signup">
                    <button className="btn navButton">Sign Up</button>
                  </Link>
                </li>
                <li className={`nav-item`}>
                  <Link to="/guestfinal">
                    <button className="btn navButton">Continue as Guest</button>
                  </Link>
                </li>
                <li className={`nav-item`}>
                  <Link to="/adminlogin">
                    <button className="btn navButton">Admin Login</button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
