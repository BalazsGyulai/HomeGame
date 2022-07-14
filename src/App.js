import Okros from "./components/Okros";
import { Route } from "react-router-dom";
import Winner from "./pages/Winner";
import Nav from "./components/Nav";
import Add from "./pages/Add";
import OkrosLog from "./components/OkrosLog";
import "./App.css";
import NavManage from "./side/NavContext";
import { useContext, useEffect } from "react";
import PlayerInfo from "./pages/PlayerInfo";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
// import Error from "./components/Error";
import AddGame from "./pages/AddGame";
import CustomGame from "./pages/CustomGame";
import CustomGameLog from "./pages/CustomGameLog";

function App() {
  const { active, login, regist, upgradeLogin } = useContext(NavManage);

  let opened = active ? "menuOpened" : "menuClosed";

  useEffect(() => {
    upgradeLogin();
  }, [])
  return (
    <>
 {/* <Error
        type={ErrorType}
        value={ErrorDesc}
        className={
          ErrorShow === 1 ? "visible" : ErrorShow === 0 ? "hidden" : ""
        }
      /> */}


      {login ? (
        <div className="App">
          <Nav />

          <div className={`container ${opened}`}>
            <Route path="/" exact>
              <Winner />
            </Route>
            <Route path="/add">
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
            <Route path="/player/:id">
              <PlayerInfo />
            </Route>
            <Route path="/wins">
              <Winner />
            </Route>
          </div>
        </div>
      ) : (

        regist ? 
        <Registration />
        :
        <Login />
      )}
    </>
  );
}

export default App;
