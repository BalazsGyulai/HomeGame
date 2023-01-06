import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import NavManage from "../side/NavContext";
import EditSVG from "../img/edit.svg";
import DoneSVG from "../img/done.svg";
import { FaTrash } from "react-icons/fa";
import "./UserSettings.css";

const UserSettings = () => {
  const { id } = useParams();
  const { baseURL, errorHandler, UpgradePlayers, playerStatus, usID } =
    useContext(NavManage);
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showEmailEdit, setShowEmailEdit] = useState(false);
  const [newPass, setPass] = useState("");
  const [newPass2, setPass2] = useState("");
  const [showPass, setShowPass] = useState(false);

  useEffect(() => {
    SetUsername();
    PlayerCode();
    GetEmail();
  }, [id]);

  const EmailHandler = (e) => {
    setNewEmail(e.target.value);
  };

  const NewPassHandler = (e) => {
    setPass(e.target.value);
  };

  const NewPassHandler2 = (e) => {
    setPass2(e.target.value);
  };

  const GetEmail = () => {
    fetch(`${baseURL}settings.php`, {
      method: "post",
      body: JSON.stringify({
        get: "settings",
        userID: id,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setEmail(data);
      });
  };

  const SendEmail = () => {
    fetch(`${baseURL}settings.php`, {
      method: "post",
      body: JSON.stringify({
        get: "email",
        userID: id,
        email: newEmail,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        GetEmail();
        errorHandler("Új email beállítva!", "success");
      });
  };

  const SendPass = () => {
    if (newPass !== "" && newPass2 !== "" && newPass === newPass2) {
      fetch(`${baseURL}settings.php`, {
        method: "post",
        body: JSON.stringify({
          get: "pass",
          userID: id,
          pass: newPass,
          pass2: newPass2,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data["fail"] === "ok") {
            errorHandler("Új jelszó beállítva!", "success");
          } else {
            errorHandler(data["fail"], "fail");
          }
        });
    } else {
      errorHandler(
        "Minden mezőt tölts ki vagy a jelszók nem egyeznek!",
        "fail"
      );
    }
  };

  const PlayerCode = () => {
    setCode(parseInt(id) + 1000);
  };

  const SetUsername = () => {
    fetch(`${baseURL}players.php`, {
      method: "post",
      body: JSON.stringify({
        players: 4,
        user: id,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setUsername(data[0].username);
      });
  };

  const delPlayer = (val) => {
    fetch(`${baseURL}players.php`, {
      method: "post",
      body: JSON.stringify({
        players: 9,
        user: val,
      }),
    }).then(() => {
      UpgradePlayers();
    });
  };

  return id === usID ? (
    <>
      <div className="playerInfo">
        <div className="playerName">
          <h1>
            {`${username}`}
            <span>#{code}</span>

            {playerStatus === "leader" ? (
              <button
                onClick={() => {
                  delPlayer(id);
                }}
                className="delbtn"
              >
                <FaTrash />
              </button>
            ) : (
              ""
            )}
          </h1>
        </div>

        <div className="SettingsEdit">
          <div className="header">
            <button
              onClick={() => {
                setShowEmailEdit(!showEmailEdit);
              }}
            >
              <img src={EditSVG} />
            </button>
            <h1>Email módosítása</h1>
          </div>

          {showEmailEdit ? (
            <>
              <input
                type="email"
                onChange={EmailHandler}
                value={newEmail}
                placeholder="Új email"
              />
              <button onClick={SendEmail} className="DoneEdit">
                <img src={DoneSVG} />
              </button>
            </>
          ) : (
            <p>{email}</p>
          )}
        </div>

        <div className="SettingsEdit">
          <div className="header">
            <button
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              <img src={EditSVG} />
            </button>
            <h1>Jelszó módosítása</h1>
          </div>

          {showPass ? (
            <>
              <input
                type="password"
                placeholder="Új jelszó"
                onChange={NewPassHandler}
                value={newPass}
              />
              <br />
              <input
                type="password"
                placeholder="Új jelszó újra"
                onChange={NewPassHandler2}
                value={newPass2}
              />
              <button onClick={SendPass} className="DoneEdit">
                <img src={DoneSVG} />
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export default UserSettings;
