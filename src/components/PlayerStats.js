import React, { useContext, useState, useEffect } from "react";
import NavManage from "../side/NavContext";
import expandSVG from "../img/expand_more.svg";
import {
  Chart,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
Chart.register(
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);

Chart.defaults.color = "#14213d";

const PlayerStats = ({ gameName, id }) => {
  const { baseURL, column, game, secureCode } = useContext(NavManage);

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
  const [showGainedScores, setShowGainedScores] = useState(false);
  const [showGainedScoresHeight, setShowGainedScoresHeight] = useState("auto");
  const [showMoreRotation, setShowMoreRotation] = useState("0deg");

  useEffect(() => {
    setViewGame(game);
    UpgradeChart(game);
    UpgradeSumChart();
    // UpgradeCustomChart();
    // UpgradeCustomLoseData();
  }, [id, game]);

  const showGainedScoresHandler = () => {
    setShowGainedScores(!showGainedScores);

    if (showGainedScores) {
      setShowGainedScoresHeight("auto");
      setShowMoreRotation("0deg");
    } else {
      setShowGainedScoresHeight("65vh");
      setShowMoreRotation("-180deg");
    }
  };

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
        gameName: gameName,
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
        gameName: gameName,
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
        gameName: gameName,
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
        gameName: gameName,
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
        <div className="scores">
          <div className="GridBox">
            <p>Nyerési esély</p>
            <WinRate gameName={game} />
          </div>
          <div className="GridBox">
            <p>Vesztési esély</p>
            <LoseRate gameName={game} />
          </div>
          <div className="GridBox">
            <p>Győzelmek</p>
            <Wins gameName={game} />
          </div>
          <div className="GridBox">
            <p>Vesztések</p>
            <Losses gameName={game} />
          </div>
          <div className="GridBox">
            <p>Összes játék</p>
            <AllGames gameName={game} />
          </div>
        </div>

        <div className="PlayerCharts">
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
                      borderColor: "rgb(20, 33, 61)",
                      backgroundColor: "rgba(20, 33, 61, 0.7)",
                      pointStyle: "circle",
                      pointRadius: 10,
                      pointHoverRadius: 15,
                    },
                  ],
                }}
              />
            </div>
          </div>

          <div
            className="roundPoint"
            style={{
              height: showGainedScoresHeight,
            }}
          >
            <div className="roundDetails">
              <h2>
                {gameName} játékban szerzett pontok alakulása
                <button onClick={showGainedScoresHandler}>
                  <img
                    style={{
                      transform: `rotateZ(${showMoreRotation})`,
                    }}
                    src={expandSVG}
                  />
                </button>
              </h2>
            </div>

            {showGainedScores ? (
              <div className="roundChart">
                <select onChange={UpgradeShowGame} value={viewGame}>
                  {playedGames.map((playedGame, index) => (
                    <option key={index} value={playedGame}>
                      {playedGame}
                    </option>
                  ))}
                </select>
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
                        borderColor: "rgb(20, 33, 61)",
                        backgroundColor: "rgba(20, 33, 61, 0.7)",
                        pointStyle: "circle",
                        pointRadius: 10,
                        pointHoverRadius: 15,
                      },
                    ],
                  }}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayerStats;
