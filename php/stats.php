<?php

require("./context/header.php");

function usersInGame($database, $gameID)
{
    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT id FROM users WHERE gameID = ?");
    $stmt->bind_param("s", $gameID);
    $stmt->execute();
    $result = $stmt->get_result();
    $id_num = $result->num_rows;

    return [$id_num, $result];
}


if ($input["get"] == "players") {
    $game = $input["gameID"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT username FROM users WHERE gameID = ?");
    $stmt->bind_param("s", $game);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;

    $data = [];

    for ($i = 0; $i < $num; $i++) {
        array_push($data, $result->fetch_assoc()["username"]);
    }

    echo json_encode($data);
}

//------------------------------------------
// Returns the years
//------------------------------------------

if ($input["get"] == "playedYears") {

    $data = [];
    $gameID = $input["gameID"];


    $stmt = $database->prepare("SELECT b.year FROM (SELECT users.id FROM users WHERE users.gameID = ?) a INNER JOIN (SELECT jatekok.userID, YEAR(jatekok.calendar) as year FROM jatekok GROUP BY YEAR(jatekok.calendar)) b ON a.id = b.userID ORDER BY year DESC;");
    $stmt->bind_param("s", $gameID);
    $stmt->execute();
    $result = $stmt->get_result();

    foreach ($result as $result) {
        array_push($data, $result["year"]);
    }

    echo json_encode($data);
}

//------------------------------------------
// Returns the user's wins by a year
//------------------------------------------

if ($input["get"] == "wins") {

    $gameID = $input["gameID"];
    $date = $input["year"];

    $result = usersInGame($database, $gameID);

    $data = [];

    if ($date !== "all") {
        for ($i = 0; $i < $result[0]; $i++) {
            $userID = $result[1]->fetch_assoc()["id"];

            $stmt = $database->stmt_init();
            // $stmt = $database->prepare("SELECT count(game) FROM wins WHERE userID = ?");

            $stmt = $database->prepare("SELECT count(a.game) as wins FROM (SELECT j.userID, j.game, j.gameName, YEAR(j.calendar) FROM jatekok j WHERE j.userID = ? AND YEAR(j.calendar) = ? GROUP BY j.game, j.gameName) a INNER JOIN (SELECT w.game, w.gameName FROM wins w WHERE w.userID = ?) b ON a.gameName = b.gameName AND a.game = b.game;");
            $stmt->bind_param("isi", $userID, $date, $userID);
            $stmt->execute();
            $wins = $stmt->get_result();

            array_push($data, $wins->fetch_assoc()["wins"]);
        }
    } else {
        for ($i = 0; $i < $result[0]; $i++) {
            $userID = $result[1]->fetch_assoc()["id"];

            $stmt = $database->stmt_init();
            // $stmt = $database->prepare("SELECT count(game) FROM wins WHERE userID = ?");

            $stmt = $database->prepare("SELECT count(a.game) as wins FROM (SELECT j.userID, j.game, j.gameName, YEAR(j.calendar) FROM jatekok j WHERE j.userID = ? GROUP BY j.game, j.gameName) a INNER JOIN (SELECT w.game, w.gameName FROM wins w WHERE w.userID = ?) b ON a.gameName = b.gameName AND a.game = b.game;");
            $stmt->bind_param("ii", $userID, $userID);
            $stmt->execute();
            $wins = $stmt->get_result();

            array_push($data, $wins->fetch_assoc()["wins"]);
        }
    }

    echo json_encode($data);
}

if ($input["get"] == "allgames") {
    $id = $input["id"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT game FROM jatekok WHERE userID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();
    $num = $result->num_rows;

    $data = [];

    for ($i = 0; $i < $num; $i++) {
        $game = $result->fetch_assoc();

        array_push($data, $game);
    }

    $dbgame = 0;
    $game = 0;

    for ($i = 0; $i < count($data); $i++) {
        if ($data[$i]["game"] != $game) {
            $dbgame++;
            $game = $data[$i]["game"];
        }
    }

    echo json_encode($dbgame);
}

if ($input["get"] == "lose") {

    $gameID = $input["gameID"];
    $date = $input["year"];

    $result = usersInGame($database, $gameID);

    $data = [];

    if ($date !== "all") {
        for ($i = 0; $i < $result[0]; $i++) {
            $userID = $result[1]->fetch_assoc()["id"];

            $stmt = $database->stmt_init();
            // $stmt = $database->prepare("SELECT count(game) FROM wins WHERE userID = ?");

            $stmt = $database->prepare("SELECT count(a.game) as loses FROM (SELECT j.userID, j.game, j.gameName, YEAR(j.calendar) FROM jatekok j WHERE j.userID = ? AND YEAR(j.calendar) = ? GROUP BY j.game, j.gameName) a INNER JOIN (SELECT l.game, l.gameName FROM loses l WHERE l.userID = ?) b ON a.gameName = b.gameName AND a.game = b.game;");
            $stmt->bind_param("isi", $userID, $date, $userID);
            $stmt->execute();
            $wins = $stmt->get_result();

            array_push($data, $wins->fetch_assoc()["loses"]);
        }
    } else {
        for ($i = 0; $i < $result[0]; $i++) {
            $userID = $result[1]->fetch_assoc()["id"];

            $stmt = $database->stmt_init();
            // $stmt = $database->prepare("SELECT count(game) FROM wins WHERE userID = ?");

            $stmt = $database->prepare("SELECT count(a.game) as loses FROM (SELECT j.userID, j.game, j.gameName, YEAR(j.calendar) FROM jatekok j WHERE j.userID = ? GROUP BY j.game, j.gameName) a INNER JOIN (SELECT l.game, l.gameName FROM loses l WHERE l.userID = ?) b ON a.gameName = b.gameName AND a.game = b.game;");
            $stmt->bind_param("ii", $userID, $userID);
            $stmt->execute();
            $wins = $stmt->get_result();

            array_push($data, $wins->fetch_assoc()["loses"]);
        }
    }

    echo json_encode($data);
}

if ($input["get"] == "gamewins") {
    $game = $input["gameID"];
    $gameName = $input["gameName"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT id FROM users WHERE gameID = ?");
    $stmt->bind_param("s", $game);
    $stmt->execute();
    $result = $stmt->get_result();
    $id_num = $result->num_rows;

    $data = [];

    for ($i = 0; $i < $id_num; $i++) {
        $id = $result->fetch_assoc()["id"];

        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT count(game) FROM wins WHERE userID = ? AND gameName = ?");
        $stmt->bind_param("is", $id, $gameName);
        $stmt->execute();
        $wins = $stmt->get_result();

        array_push($data, $wins->fetch_assoc()["count(game)"]);
    }

    echo json_encode($data);
}

if ($input["get"] == "gamelose") {
    $game = $input["gameID"];
    $gameName = $input["gameName"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT id FROM users WHERE gameID = ?");
    $stmt->bind_param("s", $game);
    $stmt->execute();
    $result = $stmt->get_result();
    $id_num = $result->num_rows;

    $data = [];

    for ($i = 0; $i < $id_num; $i++) {
        $id = $result->fetch_assoc()["id"];

        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT count(game) FROM loses WHERE userID = ? AND gameName = ?");
        $stmt->bind_param("is", $id, $gameName);
        $stmt->execute();
        $wins = $stmt->get_result();

        array_push($data, $wins->fetch_assoc()["count(game)"]);
    }

    echo json_encode($data);
}
