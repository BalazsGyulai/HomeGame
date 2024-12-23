import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavLink = (props) => {
  return (
    <Link className={props.acitve ? "active link" : "link"} to={props.href}>
      <span>{props.username}</span>

      {props.children}
    </Link>
  );
};

export default NavLink;
