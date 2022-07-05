import React, { useContext, useEffect } from "react";
import "./Okros.css";
import NavManage from "../side/NavContext";
import Player from "./Player";

const View = () => {
  const { column, scores, UpgradeScores } = useContext(NavManage);
  useEffect(() => {
    UpgradeScores();
  }, []);


  return (
    <>
      <div className="game" style={{gridTemplateColumns: `repeat(auto-fit, calc(100% / ${column}))`}}>
        {scores.map((score, index) => (
            <Player score={score} key={index} del={0}/>
        ))}
      </div>
    </>
  );
};

export default View;
