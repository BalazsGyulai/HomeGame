import React, { useContext } from "react";
import "./Settings.css";
import NavManage from "../side/NavContext";
import close from "../img/close.svg";
import plusSVG from "../img/plus.svg";
import minusSVG from "../img/minus.svg";
import NavHeader from "./../UI/NavHeader";
import NavCategoryHolder from "./../UI/NavCategoryHolder";
import visible from "../img/visible.svg";
import hidden from "../img/hidden.svg";

const Settings = ({ setVisible, menuActive }) => {
  const {
    column,
    UpgradeColumn,
    players,
    customScores,
    UpdateCustomScoresValue
  } = useContext(NavManage);

  const onClickHandler = (val) => {
    UpgradeColumn(val);
  };
  return (
    <div className="settingsBlank">
      <NavHeader title="Beállítások" />

      <NavCategoryHolder title="Oszlopok">
        <div className="changer">
          <button
            onClick={() => {
              onClickHandler(column - 1);
            }}
          >
            <img src={minusSVG} />
          </button>
          <span>{column}</span>
          <button
            onClick={() => {
              onClickHandler(column + 1);
            }}
          >
            <img src={plusSVG} />
          </button>
        </div>
      </NavCategoryHolder>
      <NavCategoryHolder title="Játékosok">
        {customScores.map((player, index) => (
          <li key={index}>
            <div className={"link"}>
              <span>{player.username}</span>

              <button
                className="visibleBtn"
                onClick={() => {
                  UpdateCustomScoresValue(
                    customScores.map((player, i) =>
                      i === index
                        ? { ...player, visible: !player.visible }
                        : player
                    )
                  );
                }}
              >
                {player.visible ? <img src={visible} /> : <img src={hidden} />}
              </button>
            </div>
          </li>
        ))}
      </NavCategoryHolder>
    </div>
  );
};

export default Settings;
