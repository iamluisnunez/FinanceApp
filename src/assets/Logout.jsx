import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  const logUserOut = () => {
    Cookies.remove("login");
    navigate("/");
  };
  return (
    <>
      <div className="center">
        <button type="button" className="btn btn-primary" onClick={logUserOut}>
          Logout
        </button>
      </div>
    </>
  );
};
export default Logout;
