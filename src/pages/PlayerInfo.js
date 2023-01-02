import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./PlayerInfo.css";
import {
  Chart,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Line, Bar, PolarArea } from "react-chartjs-2";
import NavManage from "../side/NavContext";
import { FaDove } from "react-icons/fa";
import PlayerStats from "../components/PlayerStats";

Chart.register(
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement
);

const PlayerInfo = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [loses, setLoses] = useState(0);
  const [gamesA, setGamesA] = useState(0);
  const [winPoints, setWinPoints] = useState(0);
  // const [code, setCode] = useState("");
  const [viewGame, setViewGame] = useState(0);
  const { baseURL, column, game, secureCode, games, players } =
    useContext(NavManage);
  const [gameScoresDates, setGameScoresDates] = useState([]);
  const [gameScores, setGameScores] = useState([]);
  const [playedGames, setPlayedGames] = useState([]);
  const [gameSumScoresDates, setGameSumScoresDates] = useState([]);
  const [gameSumScores, setGameSumScores] = useState([]);
  // const [customGameData, setCustomGameData] = useState([]);
  // const [customGameLoseData, setCustomGameLoseData] = useState([]);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    UpgradeUsername();
    setViewGame(game);
    UpgradeChart(game);
    UpgradeSumChart();
    // UpgradeCustomChart();
    // UpgradeCustomLoseData();
  }, [id, game]);

  //---------------------------------------------
  //Creates the charts
  //---------------------------------------------
  const UpgradeChart = (show) => {
    fetch(`${baseURL}players.php`, {
      method: "post",
      body: JSON.stringify({
        players: 10,
        user: id,
        game: show,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setGameScoresDates(data);
      });

    fetch(`${baseURL}players.php`, {
      method: "post",
      body: JSON.stringify({
        players: 11,
        user: id,
        game: show,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setGameScores(data);
      });

    fetch(`${baseURL}players.php`, {
      method: "post",
      body: JSON.stringify({
        players: 12,
        user: id,
        game: show,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setPlayedGames(data);
      });
  };

  const UpgradeSumChart = () => {
    fetch(`${baseURL}players.php`, {
      method: "post",
      body: JSON.stringify({
        players: 13,
        user: id,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setGameSumScores(data);
      });

    fetch(`${baseURL}players.php`, {
      method: "post",
      body: JSON.stringify({
        players: 12,
        user: id,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setGameSumScoresDates(data);
      });
  };

  const UpgradeUsername = () => {
    fetch(`${baseURL}players.php`, {
      method: "post",
      body: JSON.stringify({
        players: 4,
        user: id,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setUsername(data[0].username);
      });
  };

  function PlayerCode() {
    return <span>{`#${parseInt(id) + 1000}`}</span>;
  }

  function AllGames() {
      fetch(`${baseURL}stats.php`, {
        method: "post",
        body: JSON.stringify({
          get: "allgames",
          id: id,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          setGamesA(data);
        });

    return <div>{gamesA}</div>;
  }

  function Losses() {
    fetch(`${baseURL}players.php`, {
      method: "post",
      body: JSON.stringify({
        players: 7,
        user: id,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setLoses(data);
      });
    return <div>{loses}</div>;
  }

  function Wins() {
    fetch(`${baseURL}players.php`, {
      method: "post",
      body: JSON.stringify({
        players: 8,
        user: id,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setWinPoints(data);
      });
    return <div>{winPoints}</div>;
  }

  function WinRate() {
    return <div>{Math.round((winPoints / gamesA) * 100)} %</div>;
  }

  function LoseRate() {
    return <div>{Math.round((loses / gamesA) * 100)} %</div>;
  }

  // const onScrollHandler = (e) => {
  //   console.log(e.target.scrollTop);
  //   setScroll(e.target.scrollTop);
  //   console.log(document.getElementsByClassName("roundPoint")[0].getClientRects()[0].y)
  //   console.log(document.getElementsByClassName("roundPoint")[0].getClientRects()[0].y + document.getElementsByClassName("roundPoint")[0].getClientRects()[0].height)
  //   console.log(window.innerHeight)

  //   if (document.getElementsByClassName("roundPoint")[0].getClientRects()[0].y >= 0 || document.getElementsByClassName("roundPoint")[0].getClientRects()[0].y + document.getElementsByClassName("roundPoint")[0].getClientRects()[0].height <= window.innerHeight){
  //     console.log("see")
  //   }
  //   else {
  //     console.log("smoke");
  //   }
  // };

  return (
    <>
      <div className="playerInfo" id="playerInfo">
        <div className="playerName">
          <h1>
            {`${username}`}
            <PlayerCode />
          </h1>
        </div>
        <h2>Összes játék</h2>
        <div
          className="scores"
          style={{
            gridTemplateColumns: `repeat(auto-fit, calc(100% / ${column}))`,
          }}
        >
          <div className="wins">
            <p>Győzelmek</p>
            <Wins />
          </div>
          <div className="losses">
            <p>Vesztések</p>
            <Losses />
          </div>
          <div className="games">
            <p>Összes játék</p>
            <AllGames />
          </div>
          <div className="wins">
            <p>Nyerési esély</p>
            <WinRate />
          </div>
          <div className="losses">
            <p>Vesztési esély</p>
            <LoseRate />
          </div>
        </div>

        {games.map((game, index) => (
          <>
            <PlayerStats gameName={game} id={id} key={index}/>
          </>
        ))}
      </div>
    </>
  );
};

export default PlayerInfo;
