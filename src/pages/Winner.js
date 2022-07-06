import React, { useEffect, useState } from "react";
import "./Winner.css";
import { Chart, BarElement } from "chart.js";
import { Bar } from "react-chartjs-2";

Chart.register(BarElement);

const Winner = () => {
  const [players, setPlayers] = useState([]);
  const [playerWins, setPlayersWins] = useState([]);
  const [playerLose, setPLayerLose] = useState([]);

  useEffect(() => {
    UpgradePlayer();
    UpgradeWins();
    UpgradeLose();
  }, []);

  const UpgradePlayer = () => {
    fetch("http://localhost/stats.php", {
      method: "post",
      body: JSON.stringify({
        get: "players",
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setPlayers(data);
      });
  };

  const UpgradeWins = () => {
    fetch("http://localhost/stats.php", {
      method: "post",
      body: JSON.stringify({
        get: "wins",
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setPlayersWins(data);
      });
  };

  const UpgradeLose = () => {
    fetch("http://localhost/stats.php", {
      method: "post",
      body: JSON.stringify({
        get: "lose",
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setPLayerLose(data);
      });
  }

  return (
    <>
      <div id="wins">
        <header>
          <h1>Statisztika</h1>
        </header>
        <h2>Nyerések</h2>
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
                label: "wins",
                data: playerWins,
                borderColor: "rgb(253, 163, 18)",
                backgroundColor: "rgba(253, 163, 18, 0.4)",
              },
            ],
          }}
        />
        </div>
          <h2>Vesztések</h2>
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
                label: "wins",
                data: playerLose,
                borderColor: "rgb(253, 163, 18)",
                backgroundColor: "rgba(253, 163, 18, 0.4)",
              },
            ],
          }}
        />
        </div>
      </div>
    </>
  );
};

export default Winner;
