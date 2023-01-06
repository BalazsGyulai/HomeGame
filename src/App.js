import { useContext, useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import Winner from "./pages/Winner";
import Nav from "./components/Nav";
import Add from "./pages/Add";
import "./App.css";
import NavManage from "./side/NavContext";
import PlayerInfo from "./pages/PlayerInfo";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Error from "./components/Error";
import AddGame from "./pages/AddGame";
import CustomGame from "./pages/CustomGame";
import CustomGameLog from "./pages/CustomGameLog";
import {
  IsThereASession,
  SessionValue,
  clearSession,
} from "./functions/Session";
import UserSettings from "./components/UserSettings";

function App() {
  const {
    active,
    login,
    regist,
    upgradeLogin,
    ErrorType,
    ErrorDesc,
    ErrorShow,
    UpgradePlayers,
    UpgradeSecureCode,
    showUserSettings,
    UpgradeUsID,
  } = useContext(NavManage);
  const location = useLocation();
  const { pathname } = location;
  const SiteLocation = pathname.split("/");

  let opened = active ? "menuOpened" : "menuClosed";

  useEffect(() => {
    if (
      IsThereASession("userID") &&
      IsThereASession("gameID") &&
      IsThereASession("username")
    ) {
      UpgradeUsID(SessionValue("userID"));
      UpgradeSecureCode(SessionValue("gameID"), SessionValue("username"));
      UpgradePlayers();
      upgradeLogin(true);
    } else {
      upgradeLogin(false);
      clearSession();
    }
  }, []);
  return (
    <>
      {ErrorShow === 1 ? <Error type={ErrorType} value={ErrorDesc} /> : ""}

      {login ? (
        <div className="App">
          <Nav />

          <div className="container">
            {SiteLocation[0] === "" && SiteLocation[1] === "" ? (
              <Route path="/" exact>
                <Winner />
              </Route>
            ) : (
              ""
            )}

            {SiteLocation[0] === "" && SiteLocation[1] === "add" ? (
              <Route path="/add" exact>
                <Add />
              </Route>
            ) : (
              ""
            )}

            {SiteLocation[0] === "" &&
            SiteLocation[1] === "game" &&
            SiteLocation[2] === "new" ? (
              <Route path="/game/new" exact>
                <AddGame />
              </Route>
            ) : (
              ""
            )}

            {
              SiteLocation[0] === "" && SiteLocation[1] === "custom" ? 
            <Route path="/custom/:game" exact>
              <CustomGame />
            </Route> : ""
            }

            {
              SiteLocation[0] === "" && SiteLocation[1] === "custom" && SiteLocation[2] === "log" ?

            <Route path="/custom/log/:game" exact>
              <CustomGameLog />
            </Route> : ""
            }

            {
              SiteLocation[0] === "" && SiteLocation[1] === "player" ?
            <Route path="/player/:id" exact>
              {showUserSettings ? <UserSettings /> : <PlayerInfo />}
            </Route> : ""
            }

            {
              SiteLocation[0] === "" && SiteLocation[1] === "wins" ?
            <Route path="/wins" exact>
              <Winner />
            </Route> : ""
            }
          </div>
        </div>
      ) : regist ? (
        <Registration />
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
