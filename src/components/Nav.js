import React, { useContext, useEffect, useState } from "react";
import "./Nav.css";

import open from "../img/open.svg";
import { Link, useLocation } from "react-router-dom";
import NavManage from "../side/NavContext";
import { GoPlus, GoFile } from "react-icons/go";
import { GiGears } from "react-icons/gi";
import { FaTrash } from "react-icons/fa";
import Settings from "./Settings";
import Logout from "../img/logout.svg";
import { clearSession } from "../functions/Session";
import settingsSVG from "../img/settings.svg";
import settingsBlack from "../img/settingsBlack.svg";
import MailSVG from "../img/mail.svg";
import add from "../img/add.svg";
import trash from "../img/trash.svg";
import clipboard from "../img/clipboard.svg";
import NavHeader from "./../UI/NavHeader";
import NavCategoryHolder from "./../UI/NavCategoryHolder";
import NavButton from "./../UI/NavButton";
import NavBtnStyle from "../UI/NavButton.module.css";

const Nav = () => {
  // global configs
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const {
    playerCode,
    secureCode,
    baseURL,
    newGame,
    active,
    UpgradeActive,
    players,
    UpgradePlayers,
    errorHandler,
    UpgradeGames,
    games,
    NewCustomGame,
    UpgradeUserSettings,
    showUserSettings,
    playerStatus,
    usID,
    MenuIsShown
  } = useContext(NavManage);

  // local variables
  const [visibleSettings, setVisibleSettings] = useState(true);

  // local functions
  useEffect(() => {
    UpgradePlayers();

    // displays an error message in the top right corner of the screen
    errorHandler(
      `Biztonsági azonosító: #${playerCode}! A játékos fülnél is látod!`,
      "success"
    );
    UpgradeGames();
  }, [playerCode, secureCode]);

  const onClickHandler = () => {
    MenuIsShown();
  };

  const NewGameHandler = () => {
    newGame();
  };

  const SendEmail = () => {
    fetch(`${baseURL}email.php`, {
      method: "post",
      body: JSON.stringify({
        gameID: secureCode
      })
    })
      .then((data) => data.json())
      .then((data) => {
        if (data === "Success") {
          errorHandler("Emailek sikeresen elküldve!", "success");
        } else {
          errorHandler("Nem sikerült elküldeni az emaileket!", "fail");
        }
      });
  };

  const NewCustomGameHandler = () => {
    NewCustomGame();
  };

  //---------------------------------
  // Shows the settings panel
  //---------------------------------

  const showSettings = () => {
    setVisibleSettings(!visibleSettings);
  };

  //-------------------------------
  // Delete a game
  //-------------------------------

  const delGame = (val) => {
    fetch(`${baseURL}delGame.php`, {
      method: "post",
      body: JSON.stringify({
        game: val,
        gameID: secureCode
      })
    }).then(() => {
      UpgradeGames();
    });
  };

  //---------------------------------
  //  Logout
  //---------------------------------

  const logOutHandler = () => {
    clearSession();
    window.location.reload(false);
  };

  return (
    <>
      {/* This button is always shown behind the sidebar */}

      <NavButton
        onClick={MenuIsShown}
        src={open}
        type="button"
        className={`${NavBtnStyle.LMargin} ${NavBtnStyle.LButton} ${NavBtnStyle.yellow_Btn}`}
      />

      {/* Sidebar */}

      <nav className={active ? "opened" : "closed"}>
        {visibleSettings ? (
          <div className="MenuItems">
            <NavHeader title="Játékok" />
            <div id="menu">
              {/* 
              ------------------------------------------
              Eredmenyek section
              ------------------------------------------
              */}
              <NavCategoryHolder title="Eredmények">
                <li>
                  <Link
                    to="/wins"
                    className={
                      splitLocation[1] === "wins" || splitLocation[1] === ""
                        ? "active link"
                        : "link"
                    }
                  >
                    <span>Statisztika</span>
                  </Link>
                </li>
              </NavCategoryHolder>

              {/* 
              ------------------------------------------
              Játékok section
              ------------------------------------------
              */}

              <NavCategoryHolder title="Játékok">
                {playerStatus === "leader" ? (
                  <li>
                    <Link
                      to="/game/new"
                      className={
                        splitLocation[1] === "game" &&
                        splitLocation[2] === "new"
                          ? "active link"
                          : "link"
                      }
                    >
                      <span>Új játék</span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}

                {games.map((game, index) => (
                  <li key={index}>
                    <Link
                      to={`/custom/${game}`}
                      className={
                        splitLocation[1] === "custom" &&
                        splitLocation[2] === game
                          ? "active link"
                          : "link"
                      }
                    >
                      <span>{game}</span>

                      {playerStatus === "leader" &&
                      splitLocation[1] === "custom" &&
                      splitLocation[2] === game ? (
                        <>
                          <NavButton
                            src={trash}
                            className={`${NavBtnStyle.SButton} ${NavBtnStyle.redBtn}`}
                            onClick={() => {
                              delGame(game);
                            }}
                          />
                          <NavButton
                            type="link"
                            src={clipboard}
                            className={`${NavBtnStyle.SButton} ${NavBtnStyle.blueBtn}`}
                            to={`/custom/log/${game}`}
                          />
                          <NavButton
                            src={add}
                            className={`${NavBtnStyle.SButton} ${NavBtnStyle.greenBtn}`}
                            onClick={() => NewCustomGame()}
                          />
                        </>
                      ) : (
                        ""
                      )}
                    </Link>
                  </li>
                ))}
              </NavCategoryHolder>

              {/* 
              ------------------------------------------
              Tagok section
              ------------------------------------------
              */}

              <NavCategoryHolder title="Tagok">
                {playerStatus === "leader" ? (
                  <li>
                    <Link
                      to="/add"
                      className={
                        splitLocation[1] === "add" ? "active link" : "link"
                      }
                    >
                      <span>Új játékos</span>
                    </Link>
                  </li>
                ) : (
                  ""
                )}
                {players.map((player, index) => (
                  <li key={index}>
                    <Link
                      className={
                        splitLocation[1] === "player" &&
                        parseInt(splitLocation[2]) === player.id
                          ? "active link"
                          : "link"
                      }
                      to={`/player/${player.id}`}
                    >
                      <span>{player.username}</span>
                      {splitLocation[1] === "player" &&
                      parseInt(splitLocation[2]) === player.id ? (
                        splitLocation[2] === usID ||
                        playerStatus === "leader" ? (
                          <>
                            <NavButton
                              type="button"
                              src={settingsSVG}
                              className={`${NavBtnStyle.SButton} ${NavBtnStyle.blueBtn}`}
                              onClick={() => {
                                UpgradeUserSettings(!showUserSettings);
                              }}
                            />
                          </>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </Link>
                  </li>
                ))}
              </NavCategoryHolder>
            </div>
          </div>
        ) : (
          <Settings
            setVisible={(setVisible) => setVisibleSettings(setVisible)}
            menuActive={(menuActive) => UpgradeActive(menuActive)}
          />
        )}

        {/* 
        -----------------------------------
        Bottom navigation (settings, logout)
        -----------------------------------
        */}
        <div className="settings">
          <NavButton
            type="button"
            src={settingsBlack}
            className={`${NavBtnStyle.MButton} ${NavBtnStyle.greyButton}`}
            onClick={() => {
              showSettings();
            }}
          />
          <NavButton
            type="link"
            src={Logout}
            className={`${NavBtnStyle.MButton} ${NavBtnStyle.greyButton}`}
            onClick={() => {
              logOutHandler();
            }}
            to={"/"}
          />
        </div>
      </nav>
    </>
  );
};

export default Nav;
