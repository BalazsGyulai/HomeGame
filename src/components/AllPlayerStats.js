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
  const [chooseableYears, setChooseableYears] = useState([]);
  const [selectedYear, setSelectedYears] = useState(0);

  useEffect(() => {
    UpgradePlayer();
    UpgradeSelectedYearCollection();
    UpgradeWins();
    UpgradeLose();
    // console.log(`${secureCode}         ${gameName}`)
  }, []);

  useEffect(() => {
    UpgradePlayer();
    UpgradeWins();
    UpgradeLose();
  }, [selectedYear]);

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
  }

  //-------------------------------------------
  // This runs when the select's value changes
  //-------------------------------------------

  const selectedYearHandler = (e) =>{
    ChangeSelectedYearHandler(e.target.value);
  }

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
        year: selectedYear,
        gameID: secureCode,
        gameName: gameName,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);
        setPlayersWins(data);
      });
  };

  const UpgradeLose = () => {
    fetch(`${baseURL}stats.php`, {
      method: "post",
      body: JSON.stringify({
        get: "gamelose",
        year: selectedYear,
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
