import React, { useContext, useEffect, useState } from "react";
import AddPoint from "./AddPoint";
import NavManage from "../side/NavContext";
import { FaTrash } from "react-icons/fa";

function Player({ score, del }) {
  const [Actscores, setActScores] = useState([]);
  const { baseURL, game, scores, secureCode, errorHandler } = useContext(NavManage);
  const [sum, setSum] = useState(0);


  useEffect(() => {
    UpdateActScores();
  }, [scores, game]);

  const UpdateActScores = () => {
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 3,
        id: score.id,
        round: game,
        gameID: secureCode,
        gameName: "okros"
      })
    })
      .then((data) => data.json())
      .then((data) => {
        if (data["status"] === "success") {
          const res = data[0];
          setActScores(res);
          UpgradeSum(res);
        } else if (data["status"] === "failed to connect to database") {
          errorHandler("Váratlan hiba! Kérem jelentkezzen be újra!", "fail");

        }
    })
  };

  const UpgradeSum = (array) => {
    let point = 0;
    for (let i = 0; i < array.length; i++) {
      point += array[i].value;
    }

    setSum(point);
  };

  const delScore = (id) => {
    fetch(`${baseURL}players.php`, {
      method: 'post',
      body: JSON.stringify({
        players: 3,
        id: id,
      }),
    })
    .then(() => {
      UpdateActScores();
    })
  };

  return (
    <>
      <div className="player">
        <div className="gameInfo">
          <h1>{score.username}</h1>
          <p>{sum}</p>
          <AddPoint id={score.id} />
        </div>
        <div className="gameRounds">
          {Actscores.map((actScore, index, array) => (
            <div key={index}>
              <span className="round">{array.length - index}.</span>
              <p>{actScore.value}</p>
              {del === 1 ? (
                <button
                className="delbtn"
                  onClick={() => {
                    delScore(actScore.jatekID);
                  }}
                >
                  <FaTrash />
                </button>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Player;
