import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./PlayerInfo.css";

const PlayerInfo = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [ scores, setScores ] = useState(0);
  const [ loses, setLoses] = useState(0);
  const [ winPoints, setWinPoints] = useState(0);

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
        console.log(res.data);
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
      console.log(res.data);
      setLoses(res.data);
    //   setScores(res.data);
    });
    return <div>{loses}</div>
  }

  function Wins() {
    axios
    .get(`http://localhost/players.php/?players=8&user=${id}`)
    .then((res) => {
      console.log(res.data);
      setWinPoints(res.data);
    //   setScores(res.data);
    });
    return <div>{winPoints}</div>
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
      </div>
    </>
  );
};

export default PlayerInfo;
