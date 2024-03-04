import React, { useState, useEffect } from "react";
import { useAuth } from "../authContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // Import CSS file
import LoginReq from "../components/LoginReq";

const Login = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth.loginUser(username, password);
    setUsername("");
    setPassword("");
    navigate("/");
  };

  return (
    <>
      {auth.user ? (
        <LoginReq p="You are already logged in!" link="recipes" />
      ) : (
        <div className="auth-container">
          <h2>Login to spice mania</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                required
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                required
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p>
            New Here? <Link to="/onboard">Register</Link>
          </p>
        </div>
      )}
    </>
  );
};

export default Login;
