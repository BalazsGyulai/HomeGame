import React, { useContext, useEffect, useState } from "react";
import NavManage from "../side/NavContext";
import "./Login.css";
import { SetSession } from "../functions/Session";
import LoginSvg from "../img/login.svg";
import CreateSvg from "../img/registration.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [secure, setSecure] = useState("");
  const [pwd, setPwd] = useState("");
  const [submitAllow, setSubmitAllow] = useState(false);
  const {
    upgradeRegist,
    baseURL,
    upgradeLogin,
    UpgradePlayers,
    UpgradeSecureCode,
    errorHandler,
  } = useContext(NavManage);

  useEffect(() => {
    if (username !== "" && pwd !== "" && secure !== "") {
      setSubmitAllow(true);
    } else {
      setSubmitAllow(false);
    }
  }, [username, secure, pwd]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (setSubmitAllow) {
      fetch(`${baseURL}login.php`, {
        method: "post",
        body: JSON.stringify({
          username: username,
          secure: secure,
          pwd: pwd,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data["status"] === "success") {
            UpgradePlayers();
            UpgradeSecureCode(data["gameID"], username);

            SetSession("userID", data["userID"]);
            SetSession("username", username);
            SetSession("gameID", data["gameID"]);
            SetSession("lastAction", new Date().getTime());
            SetSession("loginsha", data["loginsha"]);

            upgradeLogin(true);
          } else if (data["status"] === "wrong") {
            errorHandler("Hibás bejelentkezési adatok!", "fail");
            setUsername("");
            setPwd("");
            setSecure("");
            // sessionStorage.setItem("LoggedIn", false);
            upgradeLogin(false);
          }
        });
    }
  };

  const nameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const secureHandler = (e) => {
    setSecure(e.target.value);
  };

  const pwdHandler = (e) => {
    setPwd(e.target.value);
  };

  return (
    <div className="add">
      <form onSubmit={submitHandler}>
        <div className="field">
          <h1>Belépés</h1>
        </div>
        <div className="field">
          <label>Felhasználónév:</label>
          <input
            type="text"
            value={username}
            onChange={nameChangeHandler}
            required
            className="newPlayer"
          />
        </div>
        <div className="field">
          <label>Biztonsági azonosító:</label>
          <input
            type="text"
            value={secure}
            placeholder="#1234"
            onChange={secureHandler}
            required
            className="newPlayer"
          />
        </div>
        <div className="field">
          <label>Jelszó:</label>
          <input
            type="password"
            value={pwd}
            onChange={pwdHandler}
            required
            className="newPlayer"
          />
        </div>

        <div className="btns">
          <button
            type="button"
            onClick={() => {
              upgradeRegist(true);
            }}
            style={{
              background: "#fff",
            }}
            className="submitbtn"
          >
            <img src={CreateSvg} />
            <span>REGISZTRÁCIÓ</span>
          </button>
          <button
            type="submit"
            className={submitAllow ? "enable submitbtn" : "disable submitbtn"}
          >
            <img src={LoginSvg} />
            <span>BELÉPÉS</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
