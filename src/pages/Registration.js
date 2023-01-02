import React, {useState, useContext, useEffect} from "react";
import NavManage from "../side/NavContext";
import "./Registration.css";
import LoginSvg from "../img/login.svg";
import CreateSvg from "../img/registration.svg";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [submitAllow, setSubmitAllow] = useState(false);
  const { upgradeRegist, baseURL, UpgradePlayers, UpgradeSecureCode, upgradeLogin, errorHandler } = useContext(NavManage);

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

  //---------------------------------------
  //Update the fields value
  //---------------------------------------
  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const password2ChangeHandler = (event) => {
    setPassword2(event.target.value);
  };

  //--------------------------------------
  //submits the fields vlaues
  //--------------------------------------
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
        };

        fetch(`${baseURL}registration.php`, {
          method: "post",
          body: JSON.stringify(data),
        })
          .then((data) => data.json())
          .then((data) => {
            if (data["status"] === "failed to connect to database") {
              errorHandler(
                "Váratlan hiba! Kérem küldje le újból a regisztrációt!",
                "fail"
              );
              setPassword("");
              setPassword2("");
              setUsername("");
              upgradeLogin(false);
            } else if (data["status"] === "success") {
              errorHandler("Sikeres regisztráció!", "success");
              UpgradePlayers();
              UpgradeSecureCode(data["code"], username);
              upgradeLogin(true);
              setPassword("");
              setPassword2("");
              setUsername("");
            }
          });
      }
    }
}
  return (
    <>
      <div className="add">
        <form onSubmit={submitHandler}>
          <div className="field">
            <h1>Regisztráció</h1>
          </div>
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
          <div className="btns">
          <button
            type="submit"
            className={submitAllow ? "enable submitbtn" : "disable submitbtn"}
          >
             <img src={CreateSvg} />
            <span>REGISZTRÁCIÓ</span>
          </button>
          <button
            type="button"
            onClick={() => upgradeRegist(false)}
            style={{
                background: "#fff"
            }}
            className="submitbtn"
          >
            <img src={LoginSvg} />
            <span>BELÉPÉS</span>
          </button>
        </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
