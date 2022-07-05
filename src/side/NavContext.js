import { createContext, useState } from "react";
import axios from "axios";

const NavManage = createContext();

export function Nav({ children }) {
  let [active, setActive] = useState(true);
  const [players, setPlayers] = useState([]);
  const [scores, setScores] = useState([]);
  const [game, setGame] = useState(0);
  const [column, setColumn] = useState(3);
  const [sum, setSum] = useState([]);
  // const [round, setRound] = useState(0);

  const UpgradeGame = (list) => {
    console.log(list);
    let max = list[0].game;
    for (let i = 1; i < list.length; i++) {
      if (list[i].game > max) {
        max = list[i].game;
      }
    }

    setGame(max);
  };

  const UpgradeActive = (set) => {
    setActive((active = set));
  };

  const UpgradePlayers = () => {
    axios.get("http://localhost/players.php?players=0").then((res) => {
      setPlayers(res.data);
    });
  };

  const UpgradeScores = () => {
    axios.get("http://localhost/players.php?players=1").then((response) => {
      // console.log(response.data);
      setScores(response.data);
      // setGame(parseInt(response.data[0].game));

      let max = response.data[0].game;
      for (let i = 1; i < response.data.length; i++) {
        if (response.data[i].game > max) {
          max = response.data[i].game;
        }
      }

      setGame(max);
      // setRound(parseInt(response.data[0].round));
    });
  };

  // const newRound = () => {
  //   setRound(round + 1);
  // }

  const newGame = () => {
    
    axios.get(`http://localhost/players.php?players=6&game=${game}`)
    .then((res) => {
      console.log(res.data);
    });
    setGame(game + 1);
    
  };

  const UpgradeColumn = (val) => {
    setColumn(val)
  }

  // console.log(scores);

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
      }}
    >
      {children}
    </NavManage.Provider>
  );
}

export default NavManage;
