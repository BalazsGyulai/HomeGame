import { createContext, useState } from "react";

const NavManage = createContext();

export function Nav({ children }) {
  let [active, setActive] = useState(true);
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState([]);
  const [game, setGame] = useState(0);
  const [column, setColumn] = useState(3);
  const [login, setLogin] = useState(false);
  const [regist, setRegist] = useState(false);
  const [secureCode, setSecureCode] = useState("");
  const [playerCode, setPlayerCode] = useState("");
  const [ErrorShow, setErrorShow] = useState(0);
  const [ErrorDesc, setErrorDesc] = useState("Sikeres csatlakozás!");
  const [ErrorType, setErrorType] = useState("");
  // const baseURL = "http://games.gyulaibalazs.hu/";
  const baseURL = "http://localhost/";
  const [errors, setErrors] = useState([]);
  const [games, setGames] = useState([]);
  const [customGame, setCustomGame] = useState(0);
  const [customScores, setcustomScores] = useState([]);
  const [ActGame, setActGameName] = useState("");

  const upgradeActGameName = (ActGameName) => {
    setActGameName(ActGameName);
  }

  const NewCustomGame = () => {
    // UpgradeCutomGame(gameName);
    // console.log(max);

    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 8,
        gameID: secureCode,
        game: ActGame,
        round: customGame
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);

        // const res = data[0];

        // let max = res[0].game;
        // for (let i = 1; i < res.length; i++) {
        //   if (res[i].game > max) {
        //     max = res[i].game;
        //   }
        // }
        // console.log(data);
        // console.log(max);
      });

    setCustomGame(customGame + 1);
  };

  const UpgradeCutomGame = (gameName) => {
    // UpgradeCutomGame(gameName);

    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 5,
        gameID: secureCode,
        game: gameName,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setCustomGame(data);

        // const res = data[0];

        // let max = res[0].game;
        // for (let i = 1; i < res.length; i++) {
        //   if (res[i].game > max) {
        //     max = res[i].game;
        //   }
        // }
        // console.log(data);
        // console.log(max);
      });
  };

  const UpgradeCustomScores = (gameName) => {
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 1,
        gameID: secureCode,
        game: gameName,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setcustomScores(data[0]);
        UpgradeCutomGame(gameName);

        // const res = data[0];

        // let max = res[0].game;
        // for (let i = 1; i < res.length; i++) {
        //   if (res[i].game > max) {
        //     max = res[i].game;
        //   }
        // }
        // console.log(data[0]);
        // setCustomGame(max);
        // console
      });
  };

  const UpgradeGames = () => {
    fetch(`${baseURL}games.php`, {
      method: "post",
      body: JSON.stringify({
        gameID: secureCode,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);

        if (data.length !== 0){
          setGames(data);
        }
      });
  };

  const upgradeLogin = (val) => {

    setLogin(val);

    // setLogin(val);
  };

  const errorHandler = (desc, type) => {
    setErrorDesc(desc);
    setErrorType(type);
    setErrorShow(1);
    setTimeout(() => {
      setErrorShow(0);
    }, 7000);
  };

  const UpgradeSecureCode = (code, name) => {
    setSecureCode(code);
    // console.log(code);
    fetch(`${baseURL}leader.php`, {
      method: "post",
      body: JSON.stringify({
        gameID: code,
        username: name,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        const code = data["id"] + 1000;
        setPlayerCode(code);
      });
  };

  const upgradeRegist = (val) => {
    setRegist(val);
  };

  const UpgradeActive = (set) => {
    setActive((active = set));
  };

  const UpgradePlayers = () => {
    fetch(`${baseURL}players.php`, {
      method: "post",
      body: JSON.stringify({
        players: 0,
        gameID: secureCode,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data["status"] === "success") {
          const res = data[0];
          setPlayers(res);
        } else if (data["status"] === "failed to connect to database") {
          errorHandler("Váratlan hiba! Kérem jelentkezzen be újra!", "fail");

          upgradeLogin(true);
        }
      });
  };

  const UpgradeScores = () => {
    fetch(`${baseURL}players.php`, {
      method: "post",
      body: JSON.stringify({
        players: 1,
        gameID: secureCode,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data["status"] === "success") {
          // console.log(data[0]);
          const res = data[0];
          setScores(res);
          // console.log(res);

          let max = res[0].game;
          for (let i = 1; i < res.length; i++) {
            if (res[i].game > max) {
              max = res[i].game;
            }
          }
          // console.log(max);
          setGame(max);
        } else if (data["status"] === "failed to connect to database") {
          errorHandler("Váratlan hiba! Kérem jelentkezzen be újra!", "fail");

          // upgradeLogin(true);
        }
      });
  };

  const newGame = () => {
    fetch(`${baseURL}players.php`, {
      method: "post",
      body: JSON.stringify({
        players: 6,
        game: game,
        gameID: secureCode,
      }),
    });

    setGame(game + 1);
  };

  const UpgradeColumn = (val) => {
    setColumn(val);
  };

  return (
    <NavManage.Provider
      value={{
        active,
        UpgradeActive,
        players,
        UpgradePlayers,
        scores,
        UpgradeScores,
        game,
        newGame,
        column,
        UpgradeColumn,
        upgradeLogin,
        login,
        baseURL,
        regist,
        upgradeRegist,
        UpgradeSecureCode,
        secureCode,
        playerCode,
        ErrorShow,
        ErrorDesc,
        ErrorType,
        errorHandler,
        games,
        UpgradeGames,
        UpgradeCustomScores,
        customScores,
        NewCustomGame,
        customGame,
        UpgradeCutomGame,
        upgradeActGameName
      }}
    >
      {children}
    </NavManage.Provider>
  );
}

export default NavManage;
