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
  const { baseURL, games, secureCode } = useContext(NavManage);
  const [username, setUsername] = useState("");
  const [allPlayedGames, setAllPlayedGames] = useState(0);
  const [loses, setLoses] = useState(0);
  const [wins, setWinPoints] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [loseRate, setLoseRate] = useState(0);
  const [chooseableYears, setChooseableYears] = useState([]);
  const [selectedYear, setSelectedYears] = useState(0);

  useEffect(() => {
    SetUsername();
    UpgradeSelectedYearCollection();

    AllGames();
    Losses();
    Wins();
  }, [id]);

  useEffect(() => {
    AllGames();
    Losses();
    Wins();
  }, [selectedYear]);

  useEffect(() => {
    WinRate();
    LoseRate();
  }, [loses, wins, allPlayedGames])

  // //-------------------------------------
  // // Sets the chooseable years
  // //-------------------------------------

  const UpgradeSelectedYearCollection = () => {
    fetch(`${baseURL}stats.php`, {
      method: "post",
      body: JSON.stringify({
        get: "playedYears",
        gameID: secureCode,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        let years = ["all"];

        data.forEach((year) => {
          years.push(year);
        });

        setChooseableYears(years);
        ChangeSelectedYearHandler(years[1]);
      });
  };

  // //-------------------------------------------
  // // This changes the useStateValue
  // //-------------------------------------------

  const ChangeSelectedYearHandler = (year) => {
    setSelectedYears(year);
  };

  // //-------------------------------------------
  // // This runs when the select's value changes
  // //-------------------------------------------

  const selectedYearHandler = (e) => {
    ChangeSelectedYearHandler(e.target.value);
  };

  // //-------------------------------------------------
  // // Sets the username
  // //-------------------------------------------------

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

  // //-------------------------------------------------
  // // Players's login secured code
  // //-------------------------------------------------

  function PlayerCode() {
    return <span>{`#${parseInt(id) + 1000}`}</span>;
  }

  // //-------------------------------------------------
  // // Sets the all played games
  // //-------------------------------------------------
  const AllGames = () => {
    fetch(`${baseURL}stats.php`, {
      method: "post",
      body: JSON.stringify({
        get: "allgames",
        year: selectedYear,
        id: id,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setAllPlayedGames(data);
      });
  };

  // //---------------------------------------------------
  // // Sets the losses from the played games
  // //---------------------------------------------------
  const Losses = () => {
    fetch(`${baseURL}players.php`, {
      method: "post",
      body: JSON.stringify({
        players: 7,
        user: id,
        year: selectedYear,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setLoses(data);
      });
  };

  // //---------------------------------------------------
  // // Sets the wins from the played games
  // //---------------------------------------------------
  const Wins = () => {
    fetch(`${baseURL}players.php`, {
      method: "post",
      body: JSON.stringify({
        players: 8,
        user: id,
        year: selectedYear,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setWinPoints(data);
      });
  };

  // // --------------------------------------------------
  // // Calculating the win and lose rates
  // // --------------------------------------------------
  const WinRate = () => {
    setWinRate(Math.round((wins / allPlayedGames) * 100));
  };

  const LoseRate = () => {
    setLoseRate(Math.round((loses / allPlayedGames) * 100));
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

            <div className="selectYear">
              <select value={selectedYear} onChange={selectedYearHandler}>
                {chooseableYears.map((year, index) =>
                  year === "all" ? (
                    <option key={index} value={year}>
                      Összes
                    </option>
                  ) : (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="scores">
              <div className="GridBox">
                <p>Nyerési esély</p>
                <div>{winRate} %</div>
              </div>
              <div className="GridBox">
                <p>Vesztési esély</p>
                <div>{loseRate} %</div>
              </div>
              <div className="GridBox">
                <p>Győzelmek</p>
                <div>{wins}</div>
              </div>
              <div className="GridBox">
                <p>Vesztések</p>
                <div>{loses}</div>
              </div>
              <div className="GridBox">
                <p>Játékok</p>
                <div>{allPlayedGames}</div>
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
