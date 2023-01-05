import { useContext, useEffect } from "react";
import Okros from "./components/Okros";
import { Route } from "react-router-dom";
import Winner from "./pages/Winner";
import Nav from "./components/Nav";
import Add from "./pages/Add";
import OkrosLog from "./components/OkrosLog";
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
  } = useContext(NavManage);

  let opened = active ? "menuOpened" : "menuClosed";

  useEffect(() => {
    if (
      IsThereASession("userID") &&
      IsThereASession("gameID") &&
      IsThereASession("username")
    ) {
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
      {ErrorShow === 1 ? 
      <Error type={ErrorType} value={ErrorDesc} /> : ""}

      {login ? (
        <div className="App">
          <Nav />

          <div className="container">
            <Route path="/" exact>
              <Winner />
            </Route>
            <Route path="/add" exact>
              <Add />
            </Route>
            <Route path="/game/okros" exact>
              <Okros />
            </Route>
            <Route path="/game/okros/log" exact>
              <OkrosLog />
            </Route>
            <Route path="/game/new" exact>
              <AddGame />
            </Route>
            <Route path="/custom/:game" exact>
              <CustomGame />
            </Route>
            <Route path="/custom/log/:game" exact>
              <CustomGameLog />
            </Route>
            <Route path="/player/:id" exact>
              <PlayerInfo />
            </Route>
            <Route path="/wins" exact>
              <Winner />
            </Route>
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
