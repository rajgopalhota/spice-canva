import React from 'react';
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";
import { GiApothecary } from "react-icons/gi";
import { IoFastFoodOutline } from "react-icons/io5";



import { GiRiceCooker } from "react-icons/gi";

import { NavLink } from 'react-router-dom';
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <img src='/logo.png'/>
      <NavLink to="/" className="sidebar-link" title="Home">
        <GiApothecary className="sidebar-icon" />
        <span className="sidebar-title">Spice Mania</span>
      </NavLink>

      <NavLink to="/trending" className="sidebar-link" title="Vision">
        <IoFastFoodOutline className="sidebar-icon" />
        <span className="sidebar-title">Trending</span>
      </NavLink>

      <NavLink to="/recipies" className="sidebar-link" title="Activities">
        <GiRiceCooker className="sidebar-icon" />
        <span className="sidebar-title">Recipies</span>
      </NavLink>

      <NavLink to="/post-recipie" className="sidebar-link" title="Contact">
        <FaPencil className="sidebar-icon" />
        <span className="sidebar-title">Post your recipie</span>
      </NavLink>

      <NavLink to="/login" className="sidebar-link" title="About">
        <BsFillShieldLockFill className="sidebar-icon" />
        <span className="sidebar-title">Login</span>
      </NavLink>
    </nav>
  );
};

export default Sidebar;
