import React, { useState, useContext, useEffect } from "react";
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

Chart.register(
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement
);

const Charts = ({ x, y, id, desc}) => {
    const [viewGame, setViewGame] = useState(0);
    const { baseURL, game, secureCode, games, players } =
      useContext(NavManage);
    const [gameScoresDates, setGameScoresDates] = useState([]);
    const [gameScores, setGameScores] = useState([]);
    const [playedGames, setPlayedGames] = useState([]);
    const [gameSumScoresDates, setGameSumScoresDates] = useState([]);
    const [gameSumScores, setGameSumScores] = useState([]);
    const [customGameData, setCustomGameData] = useState([]);
    const [customGameLoseData, setCustomGameLoseData] = useState([]);

  useEffect(() => {
    setViewGame(game);
    UpgradeChart(game);
    UpgradeSumChart();
    UpgradeCustomChart();
    UpgradeCustomLoseData();
  }, [id, game]);

  const UpgradeCustomLoseData = () => {
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 7,
        id: id,
        game: secureCode,
        games: games,
        max: players,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        // setCustomGameData(data);
        setCustomGameLoseData(data);
      });
  };

  const UpgradeCustomChart = () => {
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 6,
        id: id,
        game: secureCode,
        games: games,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setCustomGameData(data);
      });
  };



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

  const UpgradeShowGame = (e) => {
    // console.log(e.target.value);
    setViewGame(e.target.value);
    UpgradeChart(e.target.value);
  };

  return (
    <>
      <div className="roundPoint">
        <div className="roundDetails">
          <h2>{desc}</h2>
          <select onChange={UpgradeShowGame} value={viewGame}>
            {playedGames.map((playedGame, index) => (
              <option key={index} value={playedGame}>
                {playedGame}
              </option>
            ))}
          </select>
        </div>
        <div className="roundChart">
          <Line
            options={{
              maintainAspectRatio: false,
            }}
            data={{
              labels: x,
              datasets: [
                {
                  label: "Dataset",
                  data: y,
                  borderColor: "rgb(253, 163, 18)",
                  backgroundColor: "rgba(253, 163, 18, 0.4)",
                  pointStyle: "circle",
                  pointRadius: 10,
                  pointHoverRadius: 15,
                },
              ],
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Charts;
