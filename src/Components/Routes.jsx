// src/components/Routes.js
import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import Guest from "./Guest";
import Login from "./Login";
import LoggedIn from "./LoggedIn";
import Logout from "../assets/Logout";
import ExpenseIncomeApp from "./Guest";
import AdminLogin from "./AdminLogin";
import Admin from "./Admin";
import GuestFinal from "./GuestFinal";

const AppRoutes = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/guest" element={<Guest />} />
      <Route path="/login" element={<Login />} />z
      <Route path="/logout" element={<Logout />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/guestfinal" element={<GuestFinal />} />
      <Route
        path="/loggedin"
        element={<LoggedIn transactions={ExpenseIncomeApp.transactions} />}
      />
    </RouterRoutes>
  );
};

export default AppRoutes;
