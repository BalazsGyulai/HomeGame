import React from "react";
import Alert from "../img/alert.svg";
import Success from '../img/success.svg';
import "./Error.css";

const Error = (props) => {
  const color = props.type === "fail" ? "fail" : "success";
  return (
    <>
    <div className={`error ${color} ${props.className}`}>
      <img src={props.type === "fail" ? Alert : Success} alt="icon" />
      <p>{props.value}</p>
      </div>
    </>
      );
};

export default Error;
