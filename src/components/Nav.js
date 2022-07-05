import React, { useContext, useEffect, useState } from "react";
import "./Nav.css";
import close from "../img/close.svg";
import open from "../img/open.svg";
import { Link, useLocation } from "react-router-dom";
import NavManage from "../side/NavContext";
import { GoPlus, GoFile } from "react-icons/go";
import { GiGears } from "react-icons/gi";
import Settings from "./Settings";
// import { useHistory } from "react-router-dom";

const Nav = () => {
  // let [active, setActive] = useState(true);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const { newGame, active, UpgradeActive, players, UpgradePlayers } =
    useContext(NavManage);
  const [visibleSettings, setVisibleSettings] = useState(false);
  // const histroy = useHistory();

  useEffect(() => {
    UpgradePlayers();
  }, []);

  // UpgradePlayers();

  const onClickHandler = (set) => {
    UpgradeActive(set);
  };

  const NewGameHandler = () => {
    newGame();
  };

  const showSettings = () => {
    setVisibleSettings(!visibleSettings);
  };

  return (
    <>
      {/* <OpenMenu /> */}
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
        <div id="logo">
          <span>
            <h1>JÁTÉKOK</h1>
          </span>
          <button
            type="button"
            className="btn"
            onClick={() => {
              onClickHandler(false);
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
                  <span>Nyerések</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="category">
            <div className="category-label">
              <h2>Játékok</h2>
            </div>
            <ul className="category-item">
              <li>
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
              </li>
            </ul>
          </div>
          <div className="category">
            <div className="category-label">
              <h2>Tagok</h2>
            </div>
            <ul className="category-item">
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

              {players.map((player, index) => (
                <li key={index}>
                  <Link
                    className={
                      splitLocation[1] === "player" &&
                      splitLocation[2] === player.id
                        ? "active link"
                        : "link"
                    }
                    to={`/player/${player.id}`}
                  >
                    <span>{player.username}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="settings">
          <button
            onClick={() => {
              showSettings();
            }}
          >
            <GiGears />
          </button>
        </div>
      </nav>

      {visibleSettings ? <Settings /> : ""}
    </>
  );
};

export default Nav;
