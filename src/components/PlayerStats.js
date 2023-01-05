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
  const { baseURL, secureCode } = useContext(NavManage);

  const [loses, setLoses] = useState(0);
  const [winPoints, setWinPoints] = useState(0);
  const [viewGame, setViewGame] = useState(0);
  const [gameScoresDates, setGameScoresDates] = useState([]);
  const [gameScores, setGameScores] = useState([]);
  const [gameSumScoresDates, setGameSumScoresDates] = useState([]);
  const [gameSumScores, setGameSumScores] = useState([]);
  const [showGainedScores, setShowGainedScores] = useState(false);
  const [showGainedScoresHeight, setShowGainedScoresHeight] = useState("auto");
  const [showMoreRotation, setShowMoreRotation] = useState("0deg");
  const [chooseableYears, setChooseableYears] = useState([]);
  const [selectedYear, setSelectedYears] = useState(0);
  const [allPlayedGames, setAllPlayedGames] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [loseRate, setLoseRate] = useState(0);

  useEffect(() => {
    UpgradeSelectedYearCollection();

    UpgradeSumChart();

    // UpgradeSumSelect();

    AllGames();
    Losses();
    Wins();
  }, []);

  useEffect(() => {
    UpgradeSumChart();

    AllGames();
    Losses();
    Wins();
  }, [selectedYear]);

  useEffect(() => {
    WinRate();
    LoseRate();
  }, [allPlayedGames, loses, winPoints]);

  useEffect(() => {
    UpgradeChartDates();
    UpgradeChart();
  }, [viewGame]);

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

  //-------------------------------------
  // Sets the chooseable years
  //-------------------------------------

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

  //-------------------------------------------
  // This changes the useStateValue
  //-------------------------------------------

  const ChangeSelectedYearHandler = (year) => {
    setSelectedYears(year);
  };

  //-------------------------------------------
  // This runs when the select's value changes
  //-------------------------------------------

  const selectedYearHandler = (e) => {
    ChangeSelectedYearHandler(e.target.value);
  };

  const AllGames = () => {
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 10,
        id: id,
        gameName: gameName,
        year: selectedYear,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setAllPlayedGames(data);
      });
  };

  const Losses = () => {
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 11,
        user: id,
        gameName: gameName,
        year: selectedYear,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setLoses(data);
      });
  };

  const Wins = () => {
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 12,
        user: id,
        gameName: gameName,
        year: selectedYear,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setWinPoints(data);
      });
  };

  const WinRate = () => {
    setWinRate(Math.round((winPoints / allPlayedGames) * 100));
  };

  const LoseRate = () => {
    setLoseRate(Math.round((loses / allPlayedGames) * 100));
  };

  const UpgradeShowGame = (e) => {
    // console.log(e.target.value);
    setViewGame(e.target.value);
    // UpgradeChart(e.target.value);
  };

  const UpgradeChartDates = () => {
    if (viewGame !== undefined) {
      fetch(`${baseURL}customgame.php`, {
        method: "post",
        body: JSON.stringify({
          players: 13,
          user: id,
          game: viewGame,
          gameName: gameName,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          setGameScoresDates(data);
        });
    }
  };

  const UpgradeChart = () => {
    if (viewGame !== undefined) {
      fetch(`${baseURL}customgame.php`, {
        method: "post",
        body: JSON.stringify({
          players: 14,
          user: id,
          game: viewGame,
          gameName: gameName,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          // console.log(data);
          setGameScores(data);
        });
    }
  };

  const UpgradeSumChart = () => {
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 15,
        user: id,
        gameName: gameName,
        year: selectedYear,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setGameSumScoresDates(data);

        // console.log(data[data.length - 1]);
        setViewGame(data[data.length - 1]);
      });

    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 16,
        user: id,
        gameName: gameName,
        year: selectedYear,
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

            <div>{winPoints}</div>
          </div>
          <div className="GridBox">
            <p>Vesztések</p>
            <div>{loses}</div>
          </div>
          <div className="GridBox">
            <p>Összes játék</p>
            <div>{allPlayedGames}</div>
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
                  {gameSumScoresDates.map((playedGame, index) => (
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
