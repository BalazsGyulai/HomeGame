import React, { useContext } from "react";
import Alert from "../img/alert.svg";
import Success from "../img/success.svg";
import "./Error.css";
import NavManage from "../side/NavContext";

const Error = (props) => {
  const { ShowError } = useContext(NavManage);

  const color = props.type === "fail" ? "fail" : "success";
  return (
    <>
      <button onClick={() => ShowError(0)} id="ErrorButton">
        <div className={`error ${color} ${props.className}`}>
          <img src={props.type === "fail" ? Alert : Success} alt="icon" />
          <p>{props.value}</p>
        </div>
      </button>
    </>
  );
};

export default Error;
