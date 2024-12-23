import React, { useContext, useRef } from "react";
import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core";

import "./Settings.css";
import NavManage from "../side/NavContext";
import close from "../img/close.svg";
import plusSVG from "../img/plus.svg";
import minusSVG from "../img/minus.svg";
import NavHeader from "./../UI/NavHeader";
import NavCategoryHolder from "./../UI/NavCategoryHolder";
import visible from "../img/visible.svg";
import hidden from "../img/hidden.svg";
import NavButton from "./../UI/NavButton";
import NavBtnStyle from "../UI/NavButton.module.css";

const Settings = ({ setVisible, menuActive }) => {
  const {
    column,
    UpgradeColumn,
    players,
    customScores,
    UpdateCustomScoresValue
  } = useContext(NavManage);

  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const dragStart = (e, position) => {
    dragItem.current = position;
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = () => {
    let copyItems = [...customScores];
    const temp = copyItems[dragOverItem.current];
    copyItems[dragOverItem.current] = copyItems[dragItem.current];
    copyItems[dragItem.current] = temp;

    UpdateCustomScoresValue(copyItems);
  };

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
            <div
              className={"link"}
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
              draggable
            >
              <span>{player.username}</span>

              <NavButton
                type="button"
                className={`${NavBtnStyle.MButton} ${NavBtnStyle.greyButton}`}
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
              </NavButton>
            </div>
          </li>
        ))}
      </NavCategoryHolder>
    </div>
  );
};

export default Settings;
