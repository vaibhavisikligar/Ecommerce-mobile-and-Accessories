import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../img/logo.png";
import { navlink } from "../utili/navlink";
const Sidebar = () => {
  return (
    <div className=" px-5 ">
      <div className="w-40 flex justify-center items-center ">
        <Link to="/admin" className="logo w-full ">
          <img src={logo} alt="logo" className="w-full" />
        </Link>
      </div>
      <ul>
        {navlink.map((item) => {
          const { id, title, link, img } = item;
          return (
            <li key={id}>
              <NavLink
                to={link}
                className="nav-link w-100 flex items-center justify-start gap-3 py-3 px-8"
              >
                <span>{img}</span> {title}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
