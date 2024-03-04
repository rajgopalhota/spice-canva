import React from "react";
import load1 from "../assets/loaders/l1.gif";

export default function Loader() {
  return (
    <div className="suspenseLoader">
      <img src={load1} alt="" />
    </div>
  );
}
