import React, { useState, useContext, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import "./Okros.css";
import NavManage from "../side/NavContext";

const AddCustomPoint = ({ id, gameName }) => {
  const [score, setScore] = useState("");
  const [visbtn, setVisbtn] = useState(false);
  const { baseURL, customGame, UpgradeCustomScores } = useContext(NavManage);

  //------------------------------------------------------
  // When the input value is changing it changes its value
  //------------------------------------------------------
  const changeHandler = (e) => {
    setScore(e.target.value);
  };

  //---------------------------------------------------
  //If user click on the input field it shows the check button
  //----------------------------------------------------
  const focusHandler = () => {
    setVisbtn(true);
  };

  //------------------------------------------------------
  //If user clicked outside of teh input field then if the field is empty, it hides the check button
  //------------------------------------------------------
  const BlurHandler = (e) => {
    if (e.target.value === "" || e.target.value === null) {
      setVisbtn(false);
    } else {
      setVisbtn(true);
    }
  };

  //----------------------------------------------------
  //When user click on the check button it uploads the user's newest value
  //---------------------------------------------------
  const submitHandler = (e) => {
    e.preventDefault();

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
            onBlur={BlurHandler}
            onFocus={focusHandler}
            onChange={changeHandler}
            value={score}
          />

          {visbtn ? (
            <button type="submit">
              {" "}
              <FaCheck />
            </button>
          ) : (
            ""
          )}
        </form>
      </div>
    </>
  );
};

export default AddCustomPoint;
