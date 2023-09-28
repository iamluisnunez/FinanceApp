import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [activeLink, setActiveLink] = useState(""); // State to track the active link
  const location = useLocation(); // Get the current location from react-router

  // Function to handle link click and update the active link state
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

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
            <li className={`nav-item ${activeLink === "/" ? "active" : ""}`}>
              <Link to="/" onClick={() => handleLinkClick("/")}>
                <button className="btn navButton">Home</button>
              </Link>
            </li>
            <li
              className={`nav-item ${activeLink === "/login" ? "active" : ""}`}
            >
              <Link to="/login" onClick={() => handleLinkClick("/login")}>
                <button className="btn navButton">Login</button>
              </Link>
            </li>
            <li
              className={`nav-item ${activeLink === "/guest" ? "active" : ""}`}
            >
              <Link to="/guest" onClick={() => handleLinkClick("/guest")}>
                <button className="btn navButton">Continue as Guest</button>
              </Link>
            </li>
            <li
              className={`nav-item ${activeLink === "/signup" ? "active" : ""}`}
            >
              <Link to="/signup" onClick={() => handleLinkClick("/signup")}>
                <button className="btn navButton">Sign Up</button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
