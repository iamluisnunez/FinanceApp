// src/components/Routes.js
import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import Guest from "./Guest";
import Login from "./Login";

const AppRoutes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/guest" element={<Guest />} />
      <Route path="/login" element={<Login />} />
    </RouterRoutes>
  );
};

export default AppRoutes;
