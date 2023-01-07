import React, { useContext, useEffect, useState } from "react";
import "./Nav.css";
import close from "../img/close.svg";
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
import MailSVG from "../img/mail.svg";

const Nav = () => {
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
  } = useContext(NavManage);
  const [visibleSettings, setVisibleSettings] = useState(true);

  useEffect(() => {
    UpgradePlayers();
    errorHandler(
      `Biztonsági azonosító: #${playerCode}! A játékos fülnél is látod!`,
      "success"
    );
    UpgradeGames();
  }, [playerCode, secureCode]);

  const onClickHandler = (set) => {
    UpgradeActive(set);
  };

  const NewGameHandler = () => {
    newGame();
  };

  const SendEmail = () => {
    fetch(`${baseURL}email.php`, {
      method: "post",
      body: JSON.stringify({
        gameID: secureCode,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if(data === "Success"){
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

  //---------------------------------
  // Delete a player
  //---------------------------------

  //-------------------------------
  // Delete a game
  //-------------------------------

  const delGame = (val) => {
    fetch(`${baseURL}delGame.php`, {
      method: "post",
      body: JSON.stringify({
        game: val,
        gameID: secureCode,
      }),
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
      <button
        type="button"
        onClick={() => {
          onClickHandler(true);
        }}
        className="btn btn-open"
      >
        <img className="nav-btn" src={open} alt="open" />
      </button>
      <nav className={active ? "opened" : "closed"}>
        {visibleSettings ? (
          <div className="MenuItems">
            <div id="logo">
              {playerStatus === "leader" ? (
                <button className="sendEmail" onClick={SendEmail}>
                  <img src={MailSVG} />
                </button>
              ) : (
                ""
              )}

              <span>
                <h1>JÁTÉKOK</h1>
              </span>
              <button
                type="button"
                className="btn"
                onClick={() => {
                  onClickHandler(false);

                  if (!visibleSettings) {
                    setVisibleSettings(true);
                  }
                }}
              >
                <img className="nav-btn" src={close} alt="close" />
              </button>
            </div>
            <div id="menu">
              <div className="category">
                <div className="category-label">
                  <h2>Eredmények</h2>
                </div>
                <ul className="category-item">
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
                </ul>
              </div>
              <div className="category">
                <div className="category-label">
                  <h2>Játékok</h2>
                </div>
                <ul className="category-item">
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
                  {/* <li>
                <Link
                  to="/game/okros"
                  className={
                    splitLocation[1] === "game" && splitLocation[2] === "okros"
                      ? "active link"
                      : "link"
                  }
                >
                  <span>Ökrös</span>
                  {splitLocation[1] === "game" &&
                  splitLocation[2] === "okros" ? (
                    <>
                      <Link className="GameLog" to="/game/okros/log">
                        <GoFile />
                      </Link>
                      <button className="newGame" onClick={NewGameHandler}>
                        <GoPlus />
                      </button>
                    </>
                  ) : (
                    ""
                  )}
                </Link>
              </li> */}
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

                        {playerStatus === "leader" ? (
                          splitLocation[1] === "custom" &&
                          splitLocation[2] === game ? (
                            <>
                              <Link
                                className="GameLog"
                                to={`/custom/log/${game}`}
                              >
                                <GoFile />
                              </Link>
                              <button
                                className="newGame"
                                onClick={NewCustomGameHandler}
                              >
                                <GoPlus />
                              </button>
                              <button
                                style={{ right: "70px" }}
                                onClick={() => {
                                  delGame(game);
                                }}
                                className="delbtn"
                              >
                                <FaTrash />
                              </button>
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
                </ul>
              </div>
              <div className="category">
                <div className="category-label">
                  <h2>Tagok</h2>
                </div>
                <ul className="category-item">
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
                          splitLocation[2] === usID || playerStatus === "leader" ? (
                            <>
                              <button
                                onClick={() => {
                                  UpgradeUserSettings(!showUserSettings);
                                }}
                                className="PlayerSettings"
                              >
                                <img src={settingsSVG} />
                              </button>
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
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <Settings
            setVisible={(setVisible) => setVisibleSettings(setVisible)}
            menuActive={(menuActive) => UpgradeActive(menuActive)}
          />
        )}

        <div className="settings">
          <button
            onClick={() => {
              showSettings();
            }}
          >
            <GiGears />
          </button>
          <Link
            to="/"
            onClick={() => {
              logOutHandler();
            }}
          >
            <button>
              <img src={Logout} />
            </button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Nav;
