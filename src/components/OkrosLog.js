import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Okros.css";
import NavManage from "../side/NavContext";
import AddPoint from "./AddPoint";
// import ListOfPoints from "./ListOfPoints";
import Player from "./Player";

const OkrosLog = () => {
  const [focus, setFocus] = useState(false);
  const { newGame, scores, UpgradeScores } = useContext(NavManage);
  // const [game, setGame] = useState(0);
  // const [round, setRound] = useState(0);

  const [playerScore, setPlayerSore] = useState([]);

  useEffect(() => {
    UpgradeScores();

    // console.log(scores);
    // UpgradeGameRound();
  }, []);

  // const UpgradeGameRound = () => {
  //   if (scores[0].game){
  //     setGame(parseInt(scores[0].game));
  //   }

  //   if (scores[0].game){
  //     setRound(parseInt(scores[0].round));
  //   }
  // }

  const onClickHandler = () => {
    newGame();
  };

  // console.log(game);
  // console.log(scores);

  return (
    <>
      <div className="game">
        {scores.map((score, index) => (
          // <div className="player" key={index}>
          //   <div className="gameInfo">
          //     <h1>{score.username}</h1>
          //     <p>70</p>
          //     <AddPoint id={score.id} />
          //   </div>
          //   <div className="gameRounds">
          //     <ListOfPoints game={game} id={score.id} />
          //   </div>
          // </div>
          <Player score={score} key={index} del={1}/>
        ))}
      </div>
    </>
  );
};

export default OkrosLog;
