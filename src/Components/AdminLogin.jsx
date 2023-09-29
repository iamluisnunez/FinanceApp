import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const registerData = Object.fromEntries(data);
    console.log("register data: ", registerData);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/login",
        registerData
      );
      toast.success("Logging In");
      let d = new Date();
      d.setTime((d.getTime + 59 * 60) * 1000);

      Cookies.set("login", response.data, { expires: d });
      navigate("/admin");
      //navigate("/loggedin");
    } catch (e) {
      const error = e.response.data;
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={submit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="admin_name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="admin_password"
                  />
                </div>
                <button type="submit" className="btn navButton w-100">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
