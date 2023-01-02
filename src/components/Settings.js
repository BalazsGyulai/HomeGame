import React, { useContext } from "react";
import "./Settings.css";
import NavManage from "../side/NavContext";
import close from "../img/close.svg";
import plusSVG from "../img/plus.svg";
import minusSVG from "../img/minus.svg";

const Settings = ({ setVisible, menuActive }) => {
  const { column, UpgradeColumn } = useContext(NavManage);
  const closeMenuHandler = () => {
    setVisible(true);
    menuActive(false);
  };

  const onClickHandler = (val) => {
    UpgradeColumn(val);
  };
  return (
    <div className="settingsBlank">
      <div id="logo">
        <span>
          <h1>BEÁLLÍTÁSOK</h1>
        </span>
        <button
          type="button"
          className="btn"
          onClick={() => {
            closeMenuHandler();
          }}
        >
          <img className="nav-btn" src={close} alt="close" />
        </button>
      </div>
      <div className="Settings">
        <div className="category-label">
          <h2>Oszlopok</h2>
        </div>
        <div className="changer">
          <button
            onClick={() => {
              onClickHandler(column - 1);
            }}
          >
          <img src={minusSVG}/>
          </button>
          <span>{column}</span>
          <button
            onClick={() => {
              onClickHandler(column + 1);
            }}
          >
          <img src={plusSVG}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
