import React, { useState, useEffect, useContext } from "react";
import { Chart, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";
import NavManage from "../side/NavContext";

Chart.register(BarElement);

const AllPlayerStats = ({ gameName }) => {
  const [players, setPlayers] = useState([]);
  const [playerWins, setPlayersWins] = useState([]);
  const [playerLose, setPLayerLose] = useState([]);
  const { baseURL, secureCode } = useContext(NavManage);

  useEffect(() => {
    UpgradePlayer();
    UpgradeWins();
    UpgradeLose();

    // console.log(`${secureCode}         ${gameName}`)
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
        get: "gamewins",
        gameID: secureCode,
        gameName: gameName,
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
        get: "gamelose",
        gameID: secureCode,
        gameName: gameName,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setPLayerLose(data);
      });
  };

  return (
    <>
      <div className="Games">
        <h2>{gameName} játék</h2>
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
                      backgroundColor: "rgba(20, 33, 61, 0.7)",
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
                      backgroundColor: "rgba(20, 33, 61, 0.7)",
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPlayerStats;
