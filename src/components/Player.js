import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import AddPoint from "./AddPoint";
import NavManage from "../side/NavContext";
import { FaTrash } from "react-icons/fa";

function Player({ score, del }) {
  const [Actscores, setActScores] = useState([]);
  const { game, scores } = useContext(NavManage);
  const [sum, setSum] = useState(0);

  // let sum = 0;

  useEffect(() => {
    // axios
    //   .get(
    //     `http://localhost/players.php/?players=2&id=${score.id}&game=${game}`
    //   )
    //   .then((res) => {
    //     setActScores(res.data);

    //     // console.log(res.data);
    //     // let point = 0;
    //     // for (let i = 0; i < res.data.length; i++) {
    //     //   point += res.data[i].value;
    //     // }

    //     // setSum(point);
    //     UpgradeSum(res.data);
    //   });
    UpdateActScores();
  }, [scores, game]);

  const UpdateActScores = () => {
    axios
      .get(
        `http://localhost/players.php/?players=2&id=${score.id}&game=${game}`
      )
      .then((res) => {
        setActScores(res.data);

        // console.log(res.data);
        // let point = 0;
        // for (let i = 0; i < res.data.length; i++) {
        //   point += res.data[i].value;
        // }

        // setSum(point);
        UpgradeSum(res.data);
      });
  };

  const UpgradeSum = (array) => {
    let point = 0;
    for (let i = 0; i < array.length; i++) {
      point += array[i].value;
    }

    setSum(point);
  };

  const delScore = (id) => {
    axios.get(`http://localhost/players.php/?players=3&id=${id}`)
    .then(() =>{
      UpdateActScores();
  })
    ;
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
