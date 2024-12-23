import React, { useContext, useState } from "react";
import styles from "./NavHeader.module.css";
import NavManage from "../side/NavContext";
import close from "../img/close.svg";
import NavButton from "./NavButton";
import NavBtnStyle from "./NavButton.module.css";

const NavHeader = (props) => {
  const { playerStatus, MenuIsShown } = useContext(NavManage);

  return (
    <div className={styles.logo}>
      {/* {playerStatus === "leader" ? (
        <button className="sendEmail" onClick={SendEmail}>
          <img src={MailSVG} />
        </button>
      ) : (
        ""
      )} */}

      <h1 className={styles.title}>{props.title}</h1>

      <NavButton
        onClick={MenuIsShown}
        src={close}
        className={`${NavBtnStyle.LButton} ${NavBtnStyle.yellow_Btn}`}
      />
    </div>
  );
};

export default NavHeader;
