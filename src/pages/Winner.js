import React, { useEffect } from "react";
import "./Winner.css";
import Plotly from "plotly.js-dist";

const Winner = () => {
  let data = [
    {
      x: ["Bali", "Gery", "Atis"],
      y: [30, 20, 10],
      type: "bar",
      marker: {
        color: 'rgb(252, 163, 17)',
      }
    },
  ];

  useEffect(() => {
    Plotly.newPlot("chart", data);
  });

  return (
    <>
      <div id="wins">
        <header>
          <h1>Nyerések</h1>
        </header>
        <div id="chart"></div>
        <div className="rank">
          <h2>Rangsor</h2>
          <table>
            <thead>
              <tr>
                <th>Helyezés</th>
                <th>Név</th>
                <th>Nyerések</th>
                <th>Vesztések</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1.</td>
                <td>Bali</td>
                <td>30</td>
                <td>10</td>
              </tr>
              <tr>
                <td>2.</td>
                <td>Gery</td>
                <td>20</td>
                <td>10</td>
              </tr>
              <tr>
                <td>3.</td>
                <td>Atis</td>
                <td>10</td>
                <td>10</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Winner;
