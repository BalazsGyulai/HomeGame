import React, { useContext, useEffect, useState } from "react";
import "./Winner.css";
import { Chart, BarElement, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";
import NavManage from "../side/NavContext";
import AllPlayerStats from "../components/AllPlayerStats";

Chart.register(BarElement, Tooltip);

const Winner = () => {
  const [players, setPlayers] = useState([]);
  const [playerWins, setPlayersWins] = useState([]);
  const [playerLose, setPLayerLose] = useState([]);
  const { baseURL, secureCode, games } = useContext(NavManage);

  useEffect(() => {
    UpgradePlayer();
    UpgradeWins();
    UpgradeLose();
  }, []);

  const UpgradePlayer = () => {
    fetch(`${baseURL}stats.php`, {
      method: "post",
      body: JSON.stringify({
        get: "players",
        gameID: secureCode,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setPlayers(data);
      });
  };

  const UpgradeWins = () => {
    fetch(`${baseURL}stats.php`, {
      method: "post",
      body: JSON.stringify({
        get: "wins",
        gameID: secureCode,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setPlayersWins(data);
      });
  };

  const UpgradeLose = () => {
    fetch(`${baseURL}stats.php`, {
      method: "post",
      body: JSON.stringify({
        get: "lose",
        gameID: secureCode,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setPLayerLose(data);
      });
  };

  return (
    <>
      <div id="wins">
        <header>
          <h1>Statisztika</h1>
        </header>

        <div className="Games">
          <h2>Összes játék</h2>

          <div className="Bars">
            <div className="Bar">
              <h3>Nyerések</h3>
              <div className="chart">
                <Bar
                  options={{
                    maintainAspectRatio: false,
                    indexAxis: "y",
                    elements: {
                      bar: {
                        borderWidth: 2,
                      },
                    },
                    plugins: {
                      legend: {
                        position: "right",
                      },
                    },
                  }}
                  data={{
                    labels: players,
                    datasets: [
                      {
                        label: "Nyerések",
                        data: playerWins,
                        borderColor: "rgb(20, 33, 61)",
                        backgroundColor: "rgba(20, 33, 61, 0.6)",
                      },
                    ],
                  }}
                />
              </div>
            </div>
            <div className="Bar">
              <h3>Vesztések</h3>
              <div className="chart">
                <Bar
                  options={{
                    maintainAspectRatio: false,
                    indexAxis: "y",
                    elements: {
                      bar: {
                        borderWidth: 2,
                      },
                    },
                    plugins: {
                      legend: {
                        position: "right",
                      },
                    },
                  }}
                  data={{
                    labels: players,
                    datasets: [
                      {
                        label: "Vesztések",
                        data: playerLose,
                        borderColor: "rgb(20, 33, 61)",
                        backgroundColor: "rgba(20, 33, 61, 0.6)",
                      },
                    ],
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {games.map((game, index) => (
          <>
            <AllPlayerStats key={index} gameName={game} />
          </>
        ))}
      </div>
    </>
  );
};

export default Winner;
