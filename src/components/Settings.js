import React, { useContext } from "react";
import "./Settings.css";
import { FaPlus, FaMinus } from "react-icons/fa";
import NavManage from "../side/NavContext";

const Settings = () => {
    const {column, UpgradeColumn} = useContext(NavManage);

    const onClickHandler = (val) => {
        UpgradeColumn(val)
    }
  return (
    <div className="settingsBlank">
      <div>
        <h1>Oszlopok</h1>
        <div className="changer">
          <button onClick={() => {onClickHandler(column - 1)}}><FaMinus /></button>
          <span>{column}</span>
          <button onClick={() => {onClickHandler(column + 1)}}><FaPlus /></button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
