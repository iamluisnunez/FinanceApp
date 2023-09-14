import React from "react";
import { Link } from "react-router-dom";

function Header() {
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
            <li className="nav-item active">
              <Link to="/">
                <button className="btn navButton">Home</button>
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/login">
                <button className="btn navButton">Login</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/guest">
                <button className="btn navButton">Continue as Guest</button>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup">
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
