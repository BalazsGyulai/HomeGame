import React, { useContext, useState, useEffect } from "react";
import NavManage from "../side/NavContext";
import {
  Chart,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement
);

const PlayerStats = ({ gameName, id }) => {
  const { baseURL, column, game, secureCode } = useContext
  (NavManage);

  const [loses, setLoses] = useState(0);
  const [gamesA, setGamesA] = useState(0);
  const [winPoints, setWinPoints] = useState(0);
  // const [code, setCode] = useState("");
  const [viewGame, setViewGame] = useState(0);
  const [gameScoresDates, setGameScoresDates] = useState([]);
  const [gameScores, setGameScores] = useState([]);
  const [playedGames, setPlayedGames] = useState([]);
  const [gameSumScoresDates, setGameSumScoresDates] = useState([]);
  const [gameSumScores, setGameSumScores] = useState([]);

  useEffect(() => {
    setViewGame(game);
    UpgradeChart(game);
    UpgradeSumChart();
    // UpgradeCustomChart();
    // UpgradeCustomLoseData();
  }, [id, game]);

  function AllGames() {
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 10,
        id: id,
        gameName: gameName,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setGamesA(data);
      });

    return <div>{gamesA}</div>;
  }

  function Losses() {
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 11,
        user: id,
        gameName: gameName,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setLoses(data);
      });
    return <div>{loses}</div>;
  }

  function Wins() {
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 12,
        user: id,
        gameName: gameName,
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

  const UpgradeShowGame = (e) => {
    // console.log(e.target.value);
    setViewGame(e.target.value);
    UpgradeChart(e.target.value);
  };

  const UpgradeChart = (show) => {
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 13,
        user: id,
        game: show,
        gameName: gameName
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setGameScoresDates(data);
      });

    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 14,
        user: id,
        game: show,
        gameName: gameName
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setGameScores(data);
      });

    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 15,
        user: id,
        gameName: gameName
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setPlayedGames(data);
      });
  };

  const UpgradeSumChart = () => {
    
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 15,
        user: id,
        gameName: gameName
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setGameSumScoresDates(data);
      });

      fetch(`${baseURL}customgame.php`, {
        method: "post",
        body: JSON.stringify({
          players: 16,
          user: id,
          gameName: gameName,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          // console.log(data);
          setGameSumScores(data);
        });
  };

  return (
    <>
      <div className="gameStats">
        <h2>{gameName} játék</h2>
        <div
          className="scores"
          style={{
            gridTemplateColumns: `repeat(auto-fit, calc(100% / ${column}))`,
          }}
        >
          <div className="wins">
            <p>Győzelmek</p>
            <Wins gameName={game} />
          </div>
          <div className="losses">
            <p>Vesztések</p>
            <Losses gameName={game} />
          </div>
          <div className="games">
            <p>Összes játék</p>
            <AllGames gameName={game} />
          </div>
          <div className="wins">
            <p>Nyerési esély</p>
            <WinRate gameName={game} />
          </div>
          <div className="losses">
            <p>Vesztési esély</p>
            <LoseRate gameName={game} />
          </div>
        </div>

        <div className="roundPoint">
          <div className="roundDetails">
            <h2>{gameName} játékban szerzett pontok alakulása</h2>
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
                labels: gameScoresDates,
                datasets: [
                  {
                    label: "Dataset",
                    data: gameScores,
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

        <div className="roundPoint">
          <div className="roundDetails">
            <h2>{gameName} játékban szerzett összegek alakulása</h2>
          </div>
          <div className="roundChart">
            <Line
              options={{
                maintainAspectRatio: false,
              }}
              data={{
                labels: gameSumScoresDates,
                datasets: [
                  {
                    label: "Dataset",
                    data: gameSumScores,
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
      </div>
    </>
  );
};

export default PlayerStats;
