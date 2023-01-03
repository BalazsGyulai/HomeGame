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
  const { baseURL, column, game, games } = useContext(NavManage);

  useEffect(() => {
    SetUsername();
  }, [id, game]);

  //-------------------------------------------------
  // Sets the username
  //-------------------------------------------------

  const SetUsername = () => {
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

  //-------------------------------------------------
  // Players's login secured code
  //-------------------------------------------------

  function PlayerCode() {
    return <span>{`#${parseInt(id) + 1000}`}</span>;
  }

  //-------------------------------------------------
  // Sets the all played games
  //-------------------------------------------------
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

  //---------------------------------------------------
  // Sets the losses from the played games
  //---------------------------------------------------
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

  //---------------------------------------------------
  // Sets the wins from the played games
  //---------------------------------------------------
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

  // --------------------------------------------------
  // Calculating the win and lose rates
  // --------------------------------------------------
  function WinRate() {
    return <div>{Math.round((winPoints / gamesA) * 100)} %</div>;
  }

  function LoseRate() {
    return <div>{Math.round((loses / gamesA) * 100)} %</div>;
  }

  return (
    <>
      <div className="playerInfo" id="playerInfo">
        <div className="playerName">
          <h1>
            {`${username}`}
            <PlayerCode />
          </h1>
        </div>

        <div className="Stats">
          <div className="gameStats">
            <h2>Összes játék</h2>
            <div className="scores">
              <div className="GridBox">
                <p>Nyerési esély</p>
                <WinRate />
              </div>
              <div className="GridBox">
                <p>Vesztési esély</p>
                <LoseRate />
              </div>
              <div className="GridBox">
                <p>Győzelmek</p>
                <Wins />
              </div>
              <div className="GridBox">
                <p>Vesztések</p>
                <Losses />
              </div>
              <div className="GridBox">
                <p>Játékok</p>
                <AllGames />
              </div>
            </div>
          </div>

          {games.map((game, index) => (
            <>
              <PlayerStats gameName={game} id={id} key={index} />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlayerInfo;
