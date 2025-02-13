import React, { useEffect, useState } from "react";
import "./SideNav.css"; // Import the styles
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import axios from "axios";

const SideNav = () => {
  const role = window.localStorage.getItem("role");
  const id = window.localStorage.getItem("i");
  const [msg, setmsg] = useState(0);
  useEffect(() => {
    axios
      .post("http://localhost:5000/moviecast/chatcount", { id: id })
      .then((response) => {
        setmsg(response.data);
      });
  }, []);
  return (
    <div className="sidenav">
      <div className="sidenav-header">Movie Cast</div>
      {(role === "admin" || role === "Director") && (
        <NavLink to="/viewusersdetails">
          <FaHome className="icon" /> User
        </NavLink>
      )}
      {(role === "admin" || role === "Director") && (
        <NavLink to="/searchrole">
          <FaHome className="icon" /> Role Search
        </NavLink>
      )}
      <NavLink to="/yourpost">
        <FaUser className="icon" /> CastMovie
      </NavLink>
      <NavLink to="/chat">
        <FaCog className="icon" /> Chat{" "}
        <span class="badge rounded-pill bg-primary">{msg}</span>
      </NavLink>
      <NavLink to="/">
        <FaSignOutAlt className="icon" /> Logout
      </NavLink>
    </div>
  );
};

export default SideNav;
