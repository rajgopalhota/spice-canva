import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios";
import { toast } from "react-hot-toast";
import { GiCook } from "react-icons/gi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

const Register = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const promise = new Promise((resolve, reject) => {
        axios
          .post("/register", {
            username,
            email,
            phoneNumber: phone,
            password,
          })
          .then((response) => {
            resolve(response.data);
            setUsername("");
            setEmail("");
            setPassword("");
            navigate("/login");
          })
          .catch((error) => {
            reject(error.response.data.message.toString());
          });
      });

      toast.promise(promise, {
        loading: "Registering...",
        success: "Registration successful! Redirecting to login...",
        error: (error) => error,
      });
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register to spice mania</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username"><GiCook/>&nbsp;Username:</label>
            <input
              required
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email"><MdAlternateEmail/>&nbsp;Email:</label>
            <input
              required
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone"><FaPhone/>&nbsp;Phone:</label>
            <input
              required
              type="number"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password"><RiLockPasswordFill/>&nbsp;Password:</label>
            <input
              required
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit"><FaTelegramPlane/>&nbsp;Register</button>
        </form>
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
