import React from "react";
import styles from "./NavButton.module.css";
import { Link, useLocation } from "react-router-dom";

const NavButton = (props) => {
  const style = props.style;
  return props.type == "link" ? (
    <Link className={props.className} to={props.to}>
      <img src={props.src} alt="open" />
    </Link>
  ) : (
    <button type="button" onClick={props.onClick} className={props.className}>
      <img src={props.src} alt="open" />
    </button>
  );
};

export default NavButton;
