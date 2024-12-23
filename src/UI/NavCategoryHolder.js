import React from "react";
import { Link, useLocation } from "react-router-dom";

const NavCategoryHolder = (props) => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");

  return (
    <div className="category">
      <div className="category-label">
        <h2>{props.title}</h2>
      </div>
      <ul className="category-item">{props.children}</ul>
    </div>
  );
};

export default NavCategoryHolder;
