import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp"; // I'm assuming you have a SignIn component
import Guest from "./Components/Guest"; // I'm assuming you have a Guest component
import NotLoggedIn from "./Components/NotLoggedIn";
import "./App.css";
import AppRoutes from "./Components/Routes";
import Header from "./assets/Header";

function App() {
  return (
    <>
      <Header />
      <AppRoutes />;
    </>
  );
}

export default App;
