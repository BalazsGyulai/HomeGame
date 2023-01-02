import React, { useContext, useEffect, useState } from 'react'
import NavManage from '../side/NavContext';
import "./AddGame.css";

const AddGame = () => {
    const [NewGameName, setNewGameName] = useState("");
    const [winner, setWinner] = useState("");
    const [submitAllow, setSubmitAllow] = useState(false);
    const {errorHandler, baseURL, secureCode, UpgradeGames} = useContext(NavManage);

    useEffect(() => {
        UpgraeSubmitAllow();
    }, [NewGameName, winner])

    //---------------------------------------------
    //Stores the newest value
    //---------------------------------------------
    const NewGameHandler = (e) => {
        setNewGameName(e.target.value);
    }
    
    const winnerChangeHandler = (e) => {
      setWinner(e.target.value);
    }
  
    //---------------------------------------------
    //Allows submitting
    //---------------------------------------------
    const UpgraeSubmitAllow = () => {
        if (NewGameName !== "" && winner !== ""){
            setSubmitAllow(true);
        } else {
            setSubmitAllow(false);
        }
    }

    //---------------------------------------------
    //Submits the values
    //---------------------------------------------
    const submitHandler = (e) => {
        e.preventDefault();

        if (submitAllow){
            fetch(`${baseURL}addgame.php`, {
                method: 'post',
                body: JSON.stringify({
                    GameName: NewGameName,
                    winnerOption: winner,
                    gameID: secureCode
                })
            })
            .then(data => {data.json()})
            .then(data => {
                UpgradeGames();
            })
        } else {
            errorHandler("Kérlek tölts ki minden mezőt!", "fail");
        }
    }

  return (
    <>
      <div className="add">
        <form onSubmit={submitHandler}>
          <div className="field">
            <label>Az fog nyerni:</label>
            <select value={winner} onChange={winnerChangeHandler}>
              <option value={""}></option>
              <option value={"min"}>Akinek a legkevesebb pontja van</option>
              <option value={"max"}>Akinek a legtöbb pontja van</option>
            </select>
          </div>
          <div className="field">
            <label>Új játék neve:</label>
            <input
              type="text"
              value={NewGameName}
              onChange={NewGameHandler}
              className="newPlayer"
            />
          </div>
          <button
            type="submit"
            className={submitAllow ? "enable submitbtn" : "disable submitbtn"}
          >
            Játék felvétele
          </button>
        </form>
      </div>
    </>
  )
}

export default AddGame
