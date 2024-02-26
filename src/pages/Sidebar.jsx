import React from 'react';
import { AiOutlineBulb, AiOutlineContacts, AiOutlineFileImage, AiOutlineHome, AiOutlineInfoCircle, AiOutlineSchedule } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <NavLink to="/" className="sidebar-link" title="Home">
        <AiOutlineHome className="sidebar-icon" />
        <span className="sidebar-title">Home</span>
      </NavLink>

      <NavLink to="/mission-vision" className="sidebar-link" title="Vision">
        <AiOutlineBulb className="sidebar-icon" />
        <span className="sidebar-title">Vision</span>
      </NavLink>

      <NavLink to="/activities" className="sidebar-link" title="Activities">
        <AiOutlineSchedule className="sidebar-icon" />
        <span className="sidebar-title">Activities</span>
      </NavLink>

      <NavLink to="/contact" className="sidebar-link" title="Contact">
        <AiOutlineContacts className="sidebar-icon" />
        <span className="sidebar-title">Contact</span>
      </NavLink>

      <NavLink to="/programs" className="sidebar-link" title="Gallery">
        <AiOutlineFileImage className="sidebar-icon" />
        <span className="sidebar-title">Gallery</span>
      </NavLink>

      <NavLink to="/about" className="sidebar-link" title="About">
        <AiOutlineInfoCircle className="sidebar-icon" />
        <span className="sidebar-title">About</span>
      </NavLink>
    </nav>
  );
};

export default Sidebar;
