import React, { useContext, useEffect, useState } from "react";
import "./Add.css";
import NavManage from "../side/NavContext";

const Add = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [submitAllow, setSubmitAllow] = useState(false);
  const { baseURL, UpgradePlayers, errorHandler, secureCode } = useContext(NavManage);

  useEffect(() => {
    if (
      username !== "" &&
      password !== "" &&
      password2 !== ""
    ) {
      if (password === password2) {
        setSubmitAllow(true);
      } else {
        setSubmitAllow(false);
      }
    } else {
      setSubmitAllow(false);
    }
  }, [password, password2, username]);

  //---------------------------------------------
  // Stores the newest values
  //---------------------------------------------
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const password2ChangeHandler = (event) => {
    setPassword2(event.target.value);
  };

  //---------------------------------------------
  //Sends the values
  //---------------------------------------------
  const submitHandler = (event) => {
    event.preventDefault();
    if (
      username !== "" &&
      password !== "" &&
      password2 !== ""
    ) {
      if (password === password2) {
        let data = {
          username: username,
          password: password,
          password2: password2,
          gameID: secureCode,
        };

        fetch(`${baseURL}add/add.php`, {
          method: "post",
          body: JSON.stringify(data),
        })
          .then((data) => data.json())
          .then((data) => {
            if (data === "failed to connect to database") {
              errorHandler(
                "Váratlan hiba! Kérem küldje el újból a regisztrációt!",
                "fail"
              );
              setPassword("");
              setPassword2("");
              setUsername("");
            } else if (data === "success") {
              errorHandler("Sikeres regisztráció!", "success");
              UpgradePlayers();
              setPassword("");
              setPassword2("");
              setUsername("");
            } else if (data === "Already exist") {
              errorHandler("Már létezik ilyen felhasználó!", "fail");
              setPassword("");
              setPassword2("");
              setUsername("");
            }
          });
      }
    }
  };

  return (
    <>
      <div className="add">
        <form onSubmit={submitHandler}>
          <div className="field">
            <label>Felhasználónév:</label>
            <input
              type="text"
              value={username}
              onChange={usernameChangeHandler}
              required
              className="newPlayer"
            />
          </div>
          <div className="field">
            <label>Jelszó:</label>
            <input
              type="password"
              value={password}
              onChange={passwordChangeHandler}
              required
              className="newPlayer"
            />
          </div>
          <div className="field">
            <label>Jelszó újra:</label>
            <input
              type="password"
              value={password2}
              onChange={password2ChangeHandler}
              required
              className="newPlayer"
            />
          </div>
          <button
            type="submit"
            className={submitAllow ? "enable submitbtn" : "disable submitbtn"}
          >
            Regisztráció
          </button>
        </form>
      </div>
    </>
  );
};

export default Add;
