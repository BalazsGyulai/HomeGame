import Okros from "./components/Okros";
import { Route } from "react-router-dom";
import Winner from "./pages/Winner";
import Nav from "./components/Nav";
import Add from "./pages/Add";
import OkrosLog from "./components/OkrosLog";
import "./App.css";
import NavManage from "./side/NavContext";
import {useContext} from "react";
import PlayerInfo from "./pages/PlayerInfo";

function App() {
  const {active} = useContext(NavManage);

  let opened = active ? "menuOpened" : "menuClosed";

  return (
    <>
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
          <Route path="/player/:id">
            <PlayerInfo />
          </Route>
          <Route path="/wins">
            <Winner />
          </Route>
        </div>
      </div>
    </>
  );
}

export default App;
