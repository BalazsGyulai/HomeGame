import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PlayerInfo.css";
import { Chart , PointElement, LineElement, CategoryScale, LinearScale} from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(
    PointElement, LineElement, CategoryScale, LinearScale
)

const PlayerInfo = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [scores, setScores] = useState(0);
  const [loses, setLoses] = useState(0);
  const [winPoints, setWinPoints] = useState(0);

  useEffect(() => {
    UpgradeUsername();
    UpgradePlayerScores();
  }, [id]);

  const UpgradeUsername = () => {
    axios
      .get(`http://localhost/players.php/?players=4&user=${id}`)
      .then((res) => {
        setUsername(res.data[0].username);
      });
  };

  const UpgradePlayerScores = () => {
    axios
      .get(`http://localhost/players.php/?players=5&user=${id}`)
      .then((res) => {
        setScores(res.data);
      });
  };

  function AllGames() {
    return <div>{scores}</div>;
  }

  function Losses() {
    axios
      .get(`http://localhost/players.php/?players=7&user=${id}`)
      .then((res) => {
        setLoses(res.data);
      });
    return <div>{loses}</div>;
  }

  function Wins() {
    axios
      .get(`http://localhost/players.php/?players=8&user=${id}`)
      .then((res) => {
        setWinPoints(res.data);
      });
    return <div>{winPoints}</div>;
  }

  return (
    <>
      <div className="playerInfo">
        <div className="playerName">
          <h1>{username}</h1>
        </div>
        <div className="scores">
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
        </div>
        <Line
          options={{
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: "Egy",
                }
            }
          }}
        data = {{
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6'],
            datasets: [
              {
                label: 'Dataset',
                data: [10,20,30,20,30,10],
                borderColor: "rgb(255,0,0)",
                backgroundColor: "rgba(255,0,0,0.2)",
                pointStyle: 'circle',
                pointRadius: 10,
                pointHoverRadius: 15
              }
            ]
        }}

        />
      </div>
    </>
  );
};

export default PlayerInfo;
