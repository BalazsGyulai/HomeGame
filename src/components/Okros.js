import React, { useContext, useEffect } from "react";
import "./Okros.css";
import NavManage from "../side/NavContext";
import Player from "./Player";

const View = () => {
  const { column, scores, UpgradeScores } = useContext(NavManage);
  // const [game, setGame] = useState(0);
  // const [round, setRound] = useState(0);
  useEffect(() => {
    UpgradeScores();
 
    // console.log(scores);
    // UpgradeGameRound();
  }, []);

  // const styles = {
  //   columns : {
  //     gridTemp
  //   }
  // }

  // const UpgradeGameRound = () => {
  //   if (scores[0].game){
  //     setGame(parseInt(scores[0].game));
  //   }

  //   if (scores[0].game){
  //     setRound(parseInt(scores[0].round));
  //   }
  // }

  // console.log(game);
  // console.log(scores);

  return (
    <>
      <div className="game" style={{gridTemplateColumns: `repeat(auto-fit, calc(100% / ${column}))`}}>
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
            <Player score={score} key={index} del={0}/>
        ))}
      </div>
    </>
  );
};

export default View;
