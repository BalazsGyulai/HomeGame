import React, { useContext, useEffect, useState } from "react";
import NavManage from "../side/NavContext";
import { FaTrash } from "react-icons/fa";
import AddCustomPoint from "./AddCustomPoint";
import "./PlayerCustom.css";

const PlayerCustom = ({score, del, gameName}) => {
  const [Actscores, setActScores] = useState([]);
  const { baseURL, customGame, customScores, secureCode, errorHandler, UpgradeCutomGame} = useContext(NavManage);
  const [sum, setSum] = useState(0);
  const [place, setPlace] = useState(0);

  useEffect(() => {
    // console.log(customGame);
    UpdateActScores();
    // UpgradeCutomGame(gameName);
  }, [customScores, customGame]);

  const UpgradeSum = (array) => {

    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 9,
        id: score.id,
        round: customGame,
        gameID: secureCode,
        gameName: gameName,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data);

        if (data === "not found"){
          setPlace("-");
        } else {
          setPlace(data);
        }
      });

    let point = 0;
    for (let i = 0; i < array.length; i++) {
      point += array[i].value;
    }

    setSum(point);
  };

  const UpdateActScores = () => {
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 3,
        id: score.id,
        round: customGame,
        gameID: secureCode,
        gameName: gameName,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        // console.log(data[0]);
        if (data["status"] === "success") {
          const res = data[0];
          setActScores(res);
          UpgradeSum(res);
        } else if (data["status"] === "failed to connect to database") {
          errorHandler("Váratlan hiba! Kérem jelentkezzen be újra!", "fail");
        }
      });
  };


  const delScore = (id) => {
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 4,
        id: id,
        gameName: gameName,
      }),
    }).then(() => {
      UpdateActScores();
    });
  };

  return (
    <>
      <div className="player">
        <div className="gameInfo">
          <h2 className="PlayerPlace">#{place}</h2>
          <h1>{score.username}</h1>
          <p>{sum}</p>
          <div className="Adder">
          <AddCustomPoint id={score.id} gameName={gameName}/>
          </div>
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
};

export default PlayerCustom;
