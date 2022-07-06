import React, { useContext, useEffect, useState } from "react";
import Error from "../components/Error";
import "./Add.css";
import NavManage from "../side/NavContext";

const Add = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [submitAllow, setSubmitAllow] = useState(false);
  const [ErrorShow, setErrorShow] = useState(2);
  const [ErrorDesc, setErrorDesc] = useState("Sikeres csatlakozás!");
  const [ErrorType, setErrorType] = useState("");
  const { UpgradePlayers } = useContext(NavManage);

  useEffect(() => {
    if (
      name !== "" &&
      username !== "" &&
      email !== "" &&
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
  }, [password, password2, name, username, email]);

  const nameChangeHandler = (event) => {
    // const pattern = /[a-zA-Z0-9.]$/g;
    // if (pattern.test(event.target.value)) {
    //   setName(event.target.value);
    //   setErrorShow(false);
    // } else {
    //   setName(event.target.value);
    //   setErrorShow(true);
    //   setErrorDesc(
    //     `A név mező nem tartalmazhat ${event.target.value.slice(-1)} karaktert!`
    //   );
    // }
    setName(event.target.value);
    // const allowed = ["/", "."]
  };

  const usernameChangeHandler = (event) => {
    setUsername(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const password2ChangeHandler = (event) => {
    setPassword2(event.target.value);
  };

  const errorHandler = (desc, type) => {
    setErrorDesc(desc);
    setErrorType(type);

    setErrorShow(1);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      name !== "" &&
      username !== "" &&
      email !== "" &&
      password !== "" &&
      password2 !== ""
    ) {
      if (password === password2) {
        let data = {
          name: name,
          username: username,
          email: email,
          password: password,
          password2: password2,
        };

        fetch("http://localhost/add/add.php", {
          method: "post",
          body: JSON.stringify(data),
        })
          .then((data) => data.json())
          .then((data) => {
            if (data === "failed to connect to database") {
              errorHandler(
                "Váratlan hiba! Kérem küldje le újból a regisztrációt!",
                "fail"
              );
              setPassword("");
              setPassword2("");
              setEmail("");
              setUsername("");
            } else if (data === "success") {
              errorHandler("Sikeres regisztráció!", "success");
              UpgradePlayers();
              setName("");
              setPassword("");
              setPassword2("");
              setEmail("");
              setUsername("");
            } else if (data === "Already exist") {
              errorHandler("Felhasználónév vagy email már létezik!", "fail");
              setPassword("");
              setPassword2("");
              setEmail("");
              setUsername("");
            }
          });
      }
    }
  };

  return (
    <>
      <Error
        type={ErrorType}
        value={ErrorDesc}
        className={
          ErrorShow === 1 ? "visible" : ErrorShow === 0 ? "hidden" : ""
        }
      />
      <div className="add">
        <form onSubmit={submitHandler}>
          <div className="field">
            <label>Név:</label>
            <input
              type="text"
              value={name}
              onChange={nameChangeHandler}
              required
              className="newPlayer"
            />
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
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={emailChangeHandler}
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
