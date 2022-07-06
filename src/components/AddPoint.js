import React, { useState, useContext } from "react";
import { FaCheck } from "react-icons/fa";
import "./Okros.css";
import NavManage from "../side/NavContext";

const AddPoint = ({ id }) => {
  const [score, setScore] = useState("");
  const [visbtn, setVisbtn] = useState(false);
  const {game, UpgradeScores } = useContext(NavManage);

  const changeHandler = (e) => {
    setScore(e.target.value);
  };

  const focusHandler = () => {
    setVisbtn(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    fetch("http://localhost/add/score.php", {
      method: "post",
      body: JSON.stringify({
        id: e.target[0].id,
        val: e.target[0].value,
        game: game
      }),
    })
    .then(() => {
      UpgradeScores();
    })

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

          {/* className="hiddenbtn" */}
          <button
            type="submit"
            // onMouseOver={onMouseOverHandller}
            // onMouseOut={onMouseOutHandler}
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

export default AddPoint;
