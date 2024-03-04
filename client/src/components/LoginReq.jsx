import React from "react";
import img from "../assets/login.gif";
import { Link } from "react-router-dom";

export default function LoginReq() {
  return (
    <div className="loginregcont">
      <img src={img}></img>
      <p>
        You need to login for this action? <Link to="/login">Login here</Link>{" "}
      </p>
    </div>
  );
}
