<?php
require("./context/header.php");

if ($input["players"] == 1) {
    $gameID = $input["gameID"];
    $gameName = $input["game"];

    $data = [];
    $players = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT id, username FROM users WHERE gameID = ?")) {
        $data["status"] = "failed to connect to database";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("s", $gameID);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;

    for ($i = 0; $i < $num; $i++) {
        $row = $result->fetch_assoc();

        $id = intval($row["id"]);
        $sql2 = "SELECT game, value FROM jatekok WHERE userID = ? AND gameName = ? ORDER BY jatekID DESC";
        $stmt = $database->stmt_init();
        $stmt = $database->prepare($sql2);
        $stmt->bind_param("is", $id, $gameName);
        $stmt->execute();
        $val = $stmt->get_result();
        $val_num = $val->num_rows;

        if ($val_num > 0) {
            $row2 = $val->fetch_assoc();

            $row["game"] = $row2["game"];
        } else {
            $row["game"] = 1;
        }
        array_push($players, $row);
    }

    array_push($data, $players);
    $data["status"] = "success";
    $stmt->close();
    echo json_encode($data);
}

if ($input["players"] == 2) {
    $id = $input["id"];
    $val = $input["val"];
    $game = $input["game"];
    $caledar = date("Y.m.d. G:i");
    $gameName = $input["gameName"];

    $sql = "INSERT INTO jatekok(userID, value, game, gameName, calendar) VALUES(?,?,?,?,?)";
    $stmt = $database->stmt_init();
    $stmt = $database->prepare($sql);
    $stmt->bind_param("iiiss", $id, $val, $game, $gameName, $caledar);
    $stmt->execute();

    $stmt->close();
    $database->close();
    echo json_encode($game);
}

if ($input["players"] == 3) {
    $id = $input["id"];
    $game = $input["round"];
    $gameID = $input["gameID"];
    $gameName = $input["gameName"];

    $data = [];
    $sql = "SELECT jatekok.jatekID, jatekok.value FROM users INNER JOIN jatekok ON jatekok.userID = users.id AND jatekok.userID = ? AND jatekok.game = ? AND jatekok.gameName = ? AND users.gameID = ? ORDER BY jatekID DESC";
    $stmt = $database->init();
    if (!$stmt = $database->prepare($sql)) {
        $data["status"] = "failed to connect to database";
        echo json_encode($data);
        exit;
    };

    $stmt->bind_param("iiss", $id, $game, $gameName, $gameID);
    $stmt->execute();
    $res = $stmt->get_result();
    $num = $res->num_rows;

    $profile = [];
    for ($i = 0; $i < $num; $i++) {
        $row = $res->fetch_assoc();

        array_push($profile, $row);
    }

    array_push($data, $profile);
    $data["status"] = "success";
    $stmt->close();
    echo json_encode($data);
}

if ($input["players"] == 4) {
    $id = $input["id"];
    $gameName = $input["gameName"];

    $sql = "DELETE FROM jatekok WHERE jatekID = ? AND gameName = ?";
    $stmt = $database->stmt_init();
    $stmt = $database->prepare($sql);
    $stmt->bind_param("is", $id, $gameName);
    $stmt->execute();
}

if ($input["players"] == 5) {
    $gameID = $input["gameID"];
    $gameName = $input["game"];

    $data = [];
    $players = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT jatekok.game FROM users INNER JOIN jatekok ON users.id = jatekok.userID AND users.gameID = ? AND jatekok.gameName = ?")) {
        $data["status"] = "failed to connect to database";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("ss", $gameID, $gameName);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;

    for ($i = 0; $i < $num; $i++) {
        $row = $result->fetch_assoc()['game'];

        // $id = intval($row["id"]);
        // $sql2 = "SELECT game, place FROM eredmenyek WHERE userID = ? AND gameName = ? ORDER BY id DESC";
        // $stmt = $database->stmt_init();
        // $stmt = $database->prepare($sql2);
        // $stmt->bind_param("is", $id, $gameName);
        // $stmt->execute();
        // $val = $stmt->get_result();
        // $val_num = $val->num_rows;

        // if ($val_num > 0){
        //     $row2 = $val->fetch_assoc();

        //     $row["game"] = $row2["game"];
        // } else{
        //     $row["game"] = 1;
        // }
        array_push($players, $row);
    }


    array_push($data, $players);

    if ($num > 0) {

        $max = $data[0][0];
        for ($i = 1; $i < count($data[0]); $i++) {
            if ($data[0][$i] > $max) {
                $max = $data[0][$i];
            }
        }
    } else {
        $max = 1;
    }
    $data["status"] = "success";
    $stmt->close();
    echo json_encode($max);
}

if ($input["players"] == 6) {
    $id = $input["id"];
    $gameID = $input["game"];
    $games = $input["games"];
    $search = '1';

    $data = [];
    for ($i = 0; $i < count($games); $i++) {
        $act_game = $games[$i];
        $sql = "SELECT COUNT(place) FROM eredmenyek WHERE place = ? AND userID = ? AND gameName = ?";
        $stmt = $database->stmt_init();
        $stmt = $database->prepare($sql);
        $stmt->bind_param("sis", $search, $id, $act_game);
        $stmt->execute();
        $result = $stmt->get_result();

        array_push($data, $result->fetch_assoc()["COUNT(place)"]);
        // array_push($data, );
    }
    echo json_encode($data);
}

if ($input["players"] == 7) {
    $id = $input["id"];
    $gameID = $input["game"];
    $games = $input["games"];
    $player = $input["max"];
    $search = count($player);

    $data = [];
    for ($i = 0; $i < count($games); $i++) {
        $act_game = $games[$i];
        $sql = "SELECT COUNT(place) FROM eredmenyek WHERE place = ? AND userID = ? AND gameName = ?";
        $stmt = $database->stmt_init();
        $stmt = $database->prepare($sql);
        $stmt->bind_param("iis", $search, $id, $act_game);
        $stmt->execute();
        $result = $stmt->get_result();

        array_push($data, $result->fetch_assoc()["COUNT(place)"]);
        // array_push($data, );
    }
    echo json_encode($data);
}

if ($input["players"] == 8) {
    // $gameID = "Bali62cae449dafba6.41342841";
    // $gameName = "VasÃºt";
    // $round = 30;
    $gameID = $input["gameID"];
    $gameName = $input["game"];
    $round = $input["round"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT winnerOption FROM navsettings WHERE GameName = ? AND gameID = ?");
    $stmt->bind_param("ss", $gameName, $gameID);
    $stmt->execute();
    $result = $stmt->get_result();

    $type = $result->fetch_assoc()["winnerOption"];

    if ($type === "min") {

        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT userID FROM wins WHERE game = ? AND gameName = ?");
        $stmt->bind_param("is", $round, $gameName);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 0) {
            // NYERÉS
            $stmt = $database->stmt_init();
            $stmt = $database->prepare("SELECT id FROM users WHERE gameID = ?");
            $stmt->bind_param("s", $gameID);
            $stmt->execute();
            $result = $stmt->get_result();

            $data = [];
            $sum = [];

            // kiszedi a játékosokat
            for ($i = 0; $i < $result->num_rows; $i++) {
                $id = $result->fetch_assoc()["id"];

                $stmt2 = $database->stmt_init();
                $stmt2 = $database->prepare("SELECT sum(value), userID FROM jatekok WHERE userID = ? AND game = ? AND gameName=?");
                $stmt2->bind_param("iis", $id, $round, $gameName);
                $stmt2->execute();
                $result2 = $stmt2->get_result();

                array_push($sum, $result2->fetch_assoc());
            }

            // beállítja a minimumot ami nem null
            $min = null;
            $playerID = null;
            $x = 0;
            while ($sum[$x]["sum(value)"] === null && $x < count($sum)) {
                $x++;
            }

            if ($x < count($sum)) {
                $min = $sum[$x]["sum(value)"];
                $playerID = $sum[$x]["userID"];
            }

            // keresi a minimumot
            for ($i = $x; $i < count($sum); $i++) {
                if ($sum[$i]["sum(value)"] !== null && $sum[$i]["sum(value)"] < $min) {
                    $min = $sum[$i]["sum(value)"];
                    $playerID = $sum[$i]["userID"];
                }
            }

            // beteszi a nyerteseket
            for ($i = 0; $i < count($sum); $i++) {
                if ($sum[$i]["sum(value)"] == $min) {

                    $userID = $sum[$i]["userID"];
                    $stmt3 = $database->stmt_init();
                    $stmt3 = $database->prepare("INSERT INTO wins(userID, game, gameName) VALUES(?,?,?)");
                    $stmt3->bind_param("iis", $userID, $round, $gameName);
                    $stmt3->execute();
                    // array_push($players, $sum[$i]["sum(value)"]);
                }
            }
        }



        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT userID FROM loses WHERE game = ? AND gameName = ?");
        $stmt->bind_param("ss", $round, $gameName);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 0) {
            // VESZTÉS
            $stmt = $database->stmt_init();
            $stmt = $database->prepare("SELECT id FROM users WHERE gameID = ?");
            $stmt->bind_param("s", $gameID);
            $stmt->execute();
            $result = $stmt->get_result();

            $data = [];
            $sum = [];

            // kiszedi a játékosokat
            for ($i = 0; $i < $result->num_rows; $i++) {
                $id = $result->fetch_assoc()["id"];

                $stmt2 = $database->stmt_init();
                $stmt2 = $database->prepare("SELECT sum(value), userID FROM jatekok WHERE userID = ? AND game = ? AND gameName=?");
                $stmt2->bind_param("iis", $id, $round, $gameName);
                $stmt2->execute();
                $result2 = $stmt2->get_result();

                array_push($sum, $result2->fetch_assoc());
            }

            // beállítja a minimumot ami nem null
            $max = null;
            $playerID = null;
            $x = 0;
            while ($sum[$x]["sum(value)"] === null && $x < count($sum)) {
                $x++;
            }

            if ($x < count($sum)) {
                $max = $sum[$x]["sum(value)"];
                $playerID = $sum[$x]["userID"];
            }

            // keresi a minimumot
            for ($i = $x; $i < count($sum); $i++) {
                if ($sum[$i]["sum(value)"] !== null && $sum[$i]["sum(value)"] > $max) {
                    $max = $sum[$i]["sum(value)"];
                    $playerID = $sum[$i]["userID"];
                }
            }

            // beteszi a nyerteseket
            for ($i = 0; $i < count($sum); $i++) {
                if ($sum[$i]["sum(value)"] == $max) {

                    $userID = $sum[$i]["userID"];
                    $stmt3 = $database->stmt_init();
                    $stmt3 = $database->prepare("INSERT INTO loses(userID, game, gameName) VALUES(?,?,?)");
                    $stmt3->bind_param("iis", $userID, $round, $gameName);
                    $stmt3->execute();
                    // array_push($players, $sum[$i]["sum(value)"]);
                }
            }
        }
    } else {

        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT userID FROM wins WHERE game = ? AND gameName = ?");
        $stmt->bind_param("is", $round, $gameName);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 0) {
            // NYERÉS
            $stmt = $database->stmt_init();
            $stmt = $database->prepare("SELECT id FROM users WHERE gameID = ?");
            $stmt->bind_param("s", $gameID);
            $stmt->execute();
            $result = $stmt->get_result();

            $data = [];
            $sum = [];

            // $round = intval($round) - 1;

            // kiszedi a játékosokat
            for ($i = 0; $i < $result->num_rows; $i++) {
                $id = $result->fetch_assoc()["id"];
                $stmt2 = $database->stmt_init();
                $stmt2 = $database->prepare("SELECT sum(value), userID FROM jatekok WHERE userID = ? AND game = ? AND gameName=?");
                $stmt2->bind_param("iis", $id, $round, $gameName);
                $stmt2->execute();
                $result2 = $stmt2->get_result();
                
                array_push($sum, $result2->fetch_assoc());
            }

            // beállítja a minimumot ami nem null
            $min = null;
            $playerID = null;
            $x = 0;

            
            while ($sum[$x]["sum(value)"] === null && $x < count($sum)) {
                $x++;
            }
            
            if ($x < count($sum)) {
                $min = $sum[$x]["sum(value)"];
                $playerID = $sum[$x]["userID"];
            }

            // keresi a max-t
            for ($i = $x; $i < count($sum); $i++) {
                if ($sum[$i]["sum(value)"] !== null && $sum[$i]["sum(value)"] > $min) {
                    $min = $sum[$i]["sum(value)"];
                    $playerID = $sum[$i]["userID"];
                }
            }

            // beteszi a nyerteseket
            for ($i = 0; $i < count($sum); $i++) {
                if ($sum[$i]["sum(value)"] == $min) {

                    $userID = $sum[$i]["userID"];
                    $stmt3 = $database->stmt_init();
                    $stmt3 = $database->prepare("INSERT INTO wins(userID, game, gameName) VALUES(?,?,?)");
                    $stmt3->bind_param("iis", $playerID, $round, $gameName);
                    $stmt3->execute();
                    // array_push($players, $sum[$i]["sum(value)"]);
                }
            }
        }



        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT userID FROM loses WHERE game = ? AND gameName = ?");
        $stmt->bind_param("is", $round, $gameName);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 0) {
            // VESZTÉS
            $stmt = $database->stmt_init();
            $stmt = $database->prepare("SELECT id FROM users WHERE gameID = ?");
            $stmt->bind_param("s", $gameID);
            $stmt->execute();
            $result = $stmt->get_result();

            $data = [];
            $sum = [];

            // $round = intval($round) - 1;

            // kiszedi a játékosokat
            for ($i = 0; $i < $result->num_rows; $i++) {
                $id = $result->fetch_assoc()["id"];

                $stmt2 = $database->stmt_init();
                $stmt2 = $database->prepare("SELECT sum(value), userID FROM jatekok WHERE userID = ? AND game = ? AND gameName=?");
                $stmt2->bind_param("iis", $id, $round, $gameName);
                $stmt2->execute();
                $result2 = $stmt2->get_result();

                array_push($sum, $result2->fetch_assoc());
            }

            // beállítja a minimumot ami nem null
            $max = null;
            $playerID = null;
            $x = 0;
            while ($sum[$x]["sum(value)"] === null && $x < count($sum)) {
                $x++;
            }

            if ($x < count($sum)) {
                $max = $sum[$x]["sum(value)"];
                $playerID = $sum[$x]["userID"];
            }

            // keresi a minimumot
            for ($i = $x; $i < count($sum); $i++) {
                if ($sum[$i]["sum(value)"] !== null && $sum[$i]["sum(value)"] < $max) {
                    $max = $sum[$i]["sum(value)"];
                    $playerID = $sum[$i]["userID"];
                }
            }

            // beteszi a nyerteseket
            for ($i = 0; $i < count($sum); $i++) {
                if ($sum[$i]["sum(value)"] == $max) {

                    $userID = $sum[$i]["userID"];
                    $stmt3 = $database->stmt_init();
                    $stmt3 = $database->prepare("INSERT INTO loses(userID, game, gameName) VALUES(?,?,?)");
                    $stmt3->bind_param("iis", $playerID, $round, $gameName);
                    $stmt3->execute();
                    // array_push($players, $sum[$i]["sum(value)"]);
                }
            }
        }
    }
}

if ($input["players"] == 9) {
    $act_user = $input["id"];
    $round = $input["round"];
    $gameID = $input["gameID"];
    $gameName = $input["gameName"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT id FROM users WHERE gameID = ?");
    $stmt->bind_param("s", $gameID);
    $stmt->execute();
    $result = $stmt->get_result();

    $sum = [];

    // kiszedi a játékosokat
    for ($i = 0; $i < $result->num_rows; $i++) {
        $id = $result->fetch_assoc()["id"];

        $stmt2 = $database->stmt_init();
        $stmt2 = $database->prepare("SELECT sum(value), userID FROM jatekok WHERE userID = ? AND game = ? AND gameName=?");
        $stmt2->bind_param("iis", $id, $round, $gameName);
        $stmt2->execute();
        $result2 = $stmt2->get_result();

        $row = $result2->fetch_assoc();
        if ($row["sum(value)"] !== null) {
            array_push($sum, $row);
        }
    }

    // sorting

    for ($i = 0; $i < count($sum); $i++) {
        for ($j = 0; $j < count($sum) - $i - 1; $j++) {
            if ($sum[$j]["sum(value)"] > $sum[$j + 1]["sum(value)"]) {
                $temp = $sum[$j];
                $sum[$j] = $sum[$j + 1];
                $sum[$j + 1] = $temp;
            }
        }
    }

    $x = 0;
    while ($x < count($sum) && $act_user != $sum[$x]["userID"]) {
        $x++;
    }

    // echo json_encode($sum);

    if ($x < count($sum)) {
        // echo json_encode($sum);
        echo json_decode($x + 1);
    } else {
        echo json_encode("not found");
    }
}


if ($input["players"] == 10) {
    $userID = $input["id"];
    $gameName = $input["gameName"];
    $date = $input["year"];

    $data = [];

    if ($date !== "all") {

        $stmt = $database->stmt_init();
        // $stmt = $database->prepare("SELECT count(game) FROM wins WHERE userID = ?");

        $stmt = $database->prepare("SELECT count(a.jatekID) as games FROM (SELECT * FROM jatekok WHERE userID = ? AND gameName = ? AND year(jatekok.calendar) = ? GROUP BY game, gameName) a;");
        $stmt->bind_param("iss", $userID, $gameName, $date);
        $stmt->execute();
        $wins = $stmt->get_result();

        array_push($data, $wins->fetch_assoc()["games"]);
    } else {

        $stmt = $database->stmt_init();
        // $stmt = $database->prepare("SELECT count(game) FROM wins WHERE userID = ?");

        $stmt = $database->prepare("SELECT count(a.jatekID) as games FROM (SELECT * FROM jatekok WHERE userID = ? AND gameName = ? GROUP BY game, gameName) a;");
        $stmt->bind_param("is", $userID, $gameName);
        $stmt->execute();
        $wins = $stmt->get_result();

        array_push($data, $wins->fetch_assoc()["games"]);
    }

    echo json_encode($data);
}

if ($input["players"] == 11) {
    $userID = $input["user"];
    $date = $input["year"];
    $gameName = $input["gameName"];


    $data = [];

    if ($date !== "all") {

        $stmt = $database->stmt_init();
        // $stmt = $database->prepare("SELECT count(game) FROM wins WHERE userID = ?");

        $stmt = $database->prepare("SELECT count(a.game) as loses FROM (SELECT j.userID, j.game, YEAR(j.calendar) as year from jatekok j WHERE j.userID = ? AND j.gameName = ? and YEAR(j.calendar) = ? GROUP BY j.game) a INNER JOIN (SELECT l.game, l.gameName from loses l WHERE l.userID = ? and l.gameName= ? ) b on a.game = b.game;");
        $stmt->bind_param("issis", $userID, $gameName, $date, $userID, $gameName);
        $stmt->execute();
        $wins = $stmt->get_result();

        array_push($data, $wins->fetch_assoc()["loses"]);
    } else {

        $stmt = $database->stmt_init();
        // $stmt = $database->prepare("SELECT count(game) FROM wins WHERE userID = ?");

        $stmt = $database->prepare("SELECT count(a.game) as loses FROM (SELECT j.userID, j.game from jatekok j WHERE j.userID = ? AND j.gameName = ? GROUP BY j.game) a INNER JOIN (SELECT l.game, l.gameName from loses l WHERE l.userID = ? and l.gameName= ? ) b on a.game = b.game;");
        $stmt->bind_param("isis", $userID, $gameName, $userID, $gameName);
        $stmt->execute();
        $wins = $stmt->get_result();

        array_push($data, $wins->fetch_assoc()["loses"]);
    }

    echo json_encode($data);
}

if ($input["players"] == 12) {
    $userID = $input["user"];
    $date = $input["year"];
    $gameName = $input["gameName"];

    $data = [];

    if ($date !== "all") {

        $stmt = $database->stmt_init();
        // $stmt = $database->prepare("SELECT count(game) FROM wins WHERE userID = ?");

        $stmt = $database->prepare("SELECT count(a.game) as wins FROM (SELECT j.userID, j.game, YEAR(j.calendar) as year from jatekok j WHERE j.userID = ? AND j.gameName = ? and YEAR(j.calendar) = ? GROUP BY j.game) a INNER JOIN (SELECT w.game, w.gameName from wins w WHERE w.userID = ? and w.gameName=?) b on a.game = b.game;");
        $stmt->bind_param("issis", $userID, $gameName, $date, $userID, $gameName);
        $stmt->execute();
        $wins = $stmt->get_result();

        array_push($data, $wins->fetch_assoc()["wins"]);
    } else {

        $stmt = $database->stmt_init();
        // $stmt = $database->prepare("SELECT count(game) FROM wins WHERE userID = ?");

        $stmt = $database->prepare("SELECT count(a.game) as wins FROM (SELECT j.userID, j.game from jatekok j WHERE j.userID = ? AND j.gameName = ? GROUP BY j.game) a INNER JOIN (SELECT w.game, w.gameName from wins w WHERE w.userID = ? and w.gameName=?) b on a.game = b.game;");
        $stmt->bind_param("isis", $userID, $gameName, $userID, $gameName);
        $stmt->execute();
        $wins = $stmt->get_result();

        array_push($data, $wins->fetch_assoc()["wins"]);
    }

    echo json_encode($data);
}

if ($input["players"] == 13) {
    $id = $input["user"];
    $gameName = $input["gameName"];
    $show = $input["game"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT calendar FROM jatekok WHERE userID = ? AND gameName = ? AND game = ? ORDER BY jatekID ASC");
    $stmt->bind_param("isi", $id, $gameName, $show);
    $stmt->execute();
    $result = $stmt->get_result();

    $data = [];

    for ($i = 0; $i < $result->num_rows; $i++) {
        array_push($data, $result->fetch_assoc()["calendar"]);
    }


    echo json_encode($data);
}

if ($input["players"] == 14) {
    $id = $input["user"];
    $gameName = $input["gameName"];
    $show = $input["game"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT value FROM jatekok WHERE userID = ? AND gameName = ? AND game = ? ORDER BY jatekID ASC");
    $stmt->bind_param("isi", $id, $gameName, $show);
    $stmt->execute();
    $result = $stmt->get_result();

    $data = [];

    for ($i = 0; $i < $result->num_rows; $i++) {
        array_push($data, $result->fetch_assoc()["value"]);
    }

    echo json_encode($data);
}

if ($input["players"] == 15) {
    $id = $input["user"];
    $gameName = $input["gameName"];
    $year = $input["year"];

    $data = [];

    if ($year !== "all") {

        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT game FROM jatekok WHERE userID = ? AND gameName = ? AND year(jatekok.calendar) = ? GROUP BY game, gameName;");
        $stmt->bind_param("iss", $id, $gameName, $year);
        $stmt->execute();
        $results = $stmt->get_result();

        foreach ($results as $result) {
            array_push($data, $result["game"]);
        }
    } else {
        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT game FROM jatekok WHERE userID = ? AND gameName = ? GROUP BY game, gameName;");
        $stmt->bind_param("is", $id, $gameName);
        $stmt->execute();
        $results = $stmt->get_result();

        foreach ($results as $result) {
            array_push($data, $result["game"]);
        }
    }

    echo json_encode($data);
}

if ($input["players"] == 16) {
    $id = $input["user"];
    $gameName = $input["gameName"];
    $year = $input["year"];

    // SELECT game, gameName, userID, sum(jatekok.value) as sum FROM jatekok WHERE userID = ? AND gameName = ? GROUP BY game, gameName;

    $data = [];

    if ($year !== "all") {
        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT sum(jatekok.value) as sum FROM jatekok WHERE userID = ? AND gameName = ? AND YEAR(jatekok.calendar) = ? GROUP BY game, gameName;");
        $stmt->bind_param("iss", $id, $gameName, $year);
        $stmt->execute();
        $results = $stmt->get_result();

        foreach ($results as $result) {
            array_push($data, $result["sum"]);
        }
    } else {
        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT sum(jatekok.value) as sum FROM jatekok WHERE userID = ? AND gameName = ? GROUP BY game, gameName;");
        $stmt->bind_param("is", $id, $gameName);
        $stmt->execute();
        $results = $stmt->get_result();

        foreach ($results as $result) {
            array_push($data, $result["sum"]);
        }
    }

    echo json_encode($data);
}
