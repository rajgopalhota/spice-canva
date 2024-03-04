import React, { useState } from "react";
import { useAuth } from "../authContext";
import { Link } from "react-router-dom";
import "../styles/Auth.css"; // Import CSS file

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

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
  };

  return (
    <>
      {auth.user ? (
        <>Welcome</>
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
