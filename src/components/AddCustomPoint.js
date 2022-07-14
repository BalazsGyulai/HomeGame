import React, { useState, useContext, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import "./Okros.css";
import NavManage from "../side/NavContext";

const AddCustomPoint = ({ id, gameName }) => {
  const [score, setScore] = useState("");
  const [visbtn, setVisbtn] = useState(false);
  const { baseURL, customGame, UpgradeCustomScores } = useContext(NavManage);

  const changeHandler = (e) => {
    setScore(e.target.value);
  };

  const focusHandler = () => {
    setVisbtn(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(e.target[0].id);
    // console.log(e.target[0].value);
    // console.log(game);
    // console.log(gameName);
    fetch(`${baseURL}customgame.php`, {
      method: "post",
      body: JSON.stringify({
        players: 2,
        id: e.target[0].id,
        val: e.target[0].value,
        game: customGame,
        gameName: gameName,
      }),
    })
      .then((data) => {
        data.json();
      })
      .then(() => {
        UpgradeCustomScores(gameName);
      });

    setScore("");
  };

  const clickHandler = () => {
    setVisbtn(false);
  };

  return (
    <>
      <div className="addPoints">
        <form onSubmit={submitHandler}>
          <input
            id={id}
            type="number"
            placeholder="Új pont"
            onBlur={focusHandler}
            onFocus={focusHandler}
            onChange={changeHandler}
            value={score}
          />

          <button
            type="submit"
            className={visbtn ? "visiblebtn" : "hiddenbtn"}
            onClick={clickHandler}
          >
            <FaCheck />
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCustomPoint;
