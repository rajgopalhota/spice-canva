import React from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";
import { GiApothecary } from "react-icons/gi";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiRiceCooker } from "react-icons/gi";
import { GiCook } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import { useAuth } from "../authContext";
import "../styles/sidebar.css";

const Sidebar = () => {
  const auth = useAuth();

  return (
    <nav className="sidebar" data-aos="fade-right">
      <img src="/logo.png" />
      <NavLink to="/" className="sidebar-link" title="Home">
        <GiApothecary className="sidebar-icon" />
        <span className="sidebar-title">Spice Mania</span>
      </NavLink>

      <NavLink to="/trending" className="sidebar-link" title="Vision">
        <IoFastFoodOutline className="sidebar-icon" />
        <span className="sidebar-title">Trending</span>
      </NavLink>

      <NavLink to="/recipes" className="sidebar-link" title="Activities">
        <GiRiceCooker className="sidebar-icon" />
        <span className="sidebar-title">Recipies</span>
      </NavLink>

      <NavLink to="/post-recipe" className="sidebar-link" title="Contact">
        <FaPencil className="sidebar-icon" />
        <span className="sidebar-title">Post your recipe</span>
      </NavLink>

      {auth.user ? (
        <NavLink to="/profile" className="sidebar-link" title="My Profile">
          <GiCook className="sidebar-icon" />
          <span className="sidebar-title">My Profile</span>
        </NavLink>
      ) : (
        <NavLink to="/login" className="sidebar-link" title="Login">
          <BsFillShieldLockFill className="sidebar-icon" />
          <span className="sidebar-title">Login</span>
        </NavLink>
      )}
    </nav>
  );
};

export default Sidebar;
