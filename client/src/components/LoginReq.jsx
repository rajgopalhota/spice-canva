import React from "react";
import img from "../assets/login.gif";
import { Link } from "react-router-dom";

export default function LoginReq({p, link}) {
  return (
    <div className="loginregcont">
      <img src={img}></img>
      <p>
        {p} <Link to={`/${link}`}>{link} here</Link>{" "}
      </p>
    </div>
  );
}
