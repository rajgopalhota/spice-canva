import React, { useState, useEffect } from "react";
import { useAuth } from "../authContext";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css"; // Import CSS file
import LoginReq from "../components/LoginReq";
import { FaUnlockAlt } from "react-icons/fa";
import { GiCook } from "react-icons/gi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";

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
          <h2><FaUnlockAlt/>&nbsp;Login to Spice Mania</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username"><GiCook/>&nbsp;Username:</label>
              <input
                required
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password"><RiLockPasswordFill/>&nbsp;Password:</label>
              <input
                required
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit"><FaTelegramPlane/>&nbsp;Login</button>
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
