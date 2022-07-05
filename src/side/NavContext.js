import { createContext, useState } from "react";
import axios from "axios";

const NavManage = createContext();

export function Nav({ children }) {
  let [active, setActive] = useState(true);   // navigációssáv megjelenik vagy sem
  const [players, setPlayers] = useState([]);  // eltárolja, hogy kik játszanak
  const [scores, setScores] = useState([]);  // eltárolni a játékos pontjait
  const [game, setGame] = useState(0);   // tárolni a játékkört -> melyik kört játszák
  const [column, setColumn] = useState(3);  // eltárooni hogy hàny játékos legyen egymás mellett
  const [sum, setSum] = useState([]);
  // const [round, setRound] = useState(0);

  const UpgradeGame = (list) => {    // megváltoztatni a játékkört a legfrissebre
  //  console.log(list);
    let max = list[0].game;  // legelső játékkör
    for (let i = 1; i < list.length; i++) {  // megkeresi a legfrisebb kört
      if (list[i].game > max) {
        max = list[i].game;
      }
    }

    setGame(max);  // beállítja a kört a legfrisebbre
  };

  const UpgradeActive = (set) => {  // megváltoztatja a navigációssávot -> true (megjelenik), false (nem jelenik meg)
    setActive(!active);
  };

  const UpgradePlayers = () => {  // beállítja a játékosokat
    axios.get("http://localhost/players.php?players=0").then((res) => {
      setPlayers(res.data);
    });
  };

  const UpgradeScores = () => {  // beállítja a pontokat a jàtékosoknak
    axios.get("http://localhost/players.php?players=1").then((response) => {
      // console.log(response.data);
      setScores(response.data);
      // setGame(parseInt(response.data[0].game));

      let max = response.data[0].game;  // kör beállítása a legfriebbre
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

  const newGame = () => {  // új kört kezd
    
    axios.get(`http://localhost/players.php?players=6&game=${game}`)
    .then((res) => {
      console.log(res.data);
    });
    setGame(game + 1);
    
  };

  const UpgradeColumn = (val) => {  // a játékban beállítja hány játékos pontjai legyen egymás mellett
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
