import React from "react";
import img from "../assets/login.gif";
import { Link } from "react-router-dom";

export default function LoginReq({p, link}) {
  return (
    <div className="loginregcont">
      <p>
        {p} <Link to={`/${link}`}>{link} here</Link>{" "}
      </p>
      <img src={img}></img>
    </div>
  );
}
