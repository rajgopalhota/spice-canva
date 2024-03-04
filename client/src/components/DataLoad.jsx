import React from "react";
import load from "../assets/loaders/outlined.gif";

export default function DataLoad({ p }) {
  return (
    <div className="outlineLoad">
      {p && <h1>{p} 😥</h1>}
      <img src={load} />
    </div>
  );
}
