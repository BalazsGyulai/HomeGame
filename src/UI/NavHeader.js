import React, { useContext, useState } from "react";
import NavManage from "../side/NavContext";
import close from "../img/close.svg";

const NavHeader = (props) => {
  const { playerStatus, MenuIsShown } = useContext(NavManage);

  return (
    <div id="logo">
      {/* {playerStatus === "leader" ? (
        <button className="sendEmail" onClick={SendEmail}>
          <img src={MailSVG} />
        </button>
      ) : (
        ""
      )} */}

      <span>
        <h1>{props.title}</h1>
      </span>
      <button type="button" className="btn" onClick={MenuIsShown}>
        <img className="nav-btn" src={close} alt="close" />
      </button>
    </div>
  );
};

export default NavHeader;
