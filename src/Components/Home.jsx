import React from "react";
import { Routes, Route } from "react-router-dom";
import LoggedIn from "./LoggedIn";
import Guest from "./Guest";
import { Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h1>Welcome to Your Finance Manager</h1>
        <p>Track your finances and stay on top of your budget with our app.</p>
      </div>
    </div>
  );
};

export default Home;
