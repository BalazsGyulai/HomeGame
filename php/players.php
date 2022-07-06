<?php

header('Access-Control-Allow-Origin: *');

require_once("./connect/connect.php");

if ($_GET["players"] == 0){
    $sql = "SELECT username, id FROM users";
    $stmt = $database->query($sql);
    $num = $stmt->num_rows;

    $data = [];

    for ($i = 0; $i < $num; $i++){
        $row = $stmt->fetch_assoc();
        array_push($data, $row);
    }

    echo json_encode($data);
}

if ($_GET["players"] == 1){
    // INSERT INTO jatekok(userID, value, round, game) VALUES(12,50,1,1)

    // SELECT * FROM jatekok WHERE round = '1' AND game = '1'

    // SELECT * FROM jatekok, users WHERE jatekok.userID = users.id

    // SELECT jatekok.value, jatekok.round, jatekok.game, users.username, users.id FROM jatekok, users WHERE jatekok.userID = users.id

    $sql = "SELECT id, username FROM users";
    $res = $database->query($sql);
    $num = $res->num_rows;

    $data = [];

    for ($i = 0; $i < $num; $i++){
        $row = $res->fetch_assoc();

        $id = intval($row["id"]);
        $sql2 = "SELECT value, game FROM jatekok WHERE userID = ? ORDER BY jatekID DESC";
        $stmt = $database->stmt_init();
        $stmt = $database->prepare($sql2);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $val = $stmt->get_result();
        $val_num = $val->num_rows;
        if ($val_num > 0){
            $row2 = $val->fetch_assoc();

            $row["game"] = $row2["game"];
        } else{
            $row["game"] = 1;
        }
        array_push($data, $row);
    }

    // $sql = "SELECT jatekok.value, jatekok.round, jatekok.game, users.username, users.id FROM jatekok, users WHERE jatekok.userID = users.id";
    // $stmt = $database->query($sql);
    // $num = $stmt->num_rows;

    // $data = [];

    // if ($num == 0){
    //     $sql = "SELECT username, id FROM users";
    //     $stmt = $database->query($sql);
    //     $num = $stmt->num_rows;

    //     for ($i = 0; $i < $num; $i++){
    //         $row = $stmt->fetch_assoc();
    //         $row["game"] = 1;
    //         $row["round"] = 1;

    //         array_push($data, $row);
    //     }


    // } else{
    //     for ($i = 0; $i < $num; $i++){
    //         $row = $stmt->fetch_assoc();
    //         array_push($data, $row);
    //     }

    //     $sql = ""
    // }
        
    echo json_encode($data);
}

if ($_GET["players"] == 2){
    $id = $_GET["id"];
    $game = $_GET["game"];

    $sql = "SELECT jatekID, value FROM jatekok WHERE userID = ? AND game = ? ORDER BY jatekID DESC";
    $stmt = $database->init();
    $stmt = $database->prepare($sql);

    $stmt->bind_param("ii", $id, $game);
    $stmt->execute();
    $res = $stmt->get_result();
    $num = $res->num_rows;

    $data = [];

    for ($i = 0; $i < $num; $i++){
        $row = $res->fetch_assoc();

        array_push($data, $row);
    }
    
    echo json_encode($data);
}

// if ($_GET["players"] == ){
//     $sql = "SELECT jatekok.value, jatekok.round, jatekok.game, users.username, users.id FROM jatekok, users WHERE jatekok.userID = users.id";2
//     $stmt = $database->query($sql);
//     $num = $stmt->num_rows;

//     $data = [];

//     for ($i = 0; $i < $num; $i++){
//         $row = $stmt->fetch_assoc();
//         array_push($data, $row);
//     }

//     echo json_encode($data);
// }
if ($_GET["players"] == 3){
    $id = $_GET["id"];

    $sql = "DELETE FROM jatekok WHERE jatekID = ?";
    $stmt = $database->init();
    $stmt = $database->prepare($sql);

    $stmt->bind_param("i", $id);
    $stmt->execute();
}

if ($_GET["players"] == 4){
    $id = $_GET["user"];

    // $sql = "SELECT username FROM users WHERE id = ?";
    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT username FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();

    $data = [];

    array_push($data, $result->fetch_assoc());
    
    echo json_encode($data);
}

if ($_GET["players"] == 5){
    $id = $_GET["user"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT value, game FROM jatekok WHERE userID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();
    $num = $result->num_rows;
    
    echo json_encode($num);
}

if ($_GET["players"] == 6){
    
    $game = $_GET["game"];
    echo json_encode($game);
    $users = $database->query("SELECT id FROM users");
    $numUser = $users->num_rows;

    $data = [];

    for ($y = 0; $y < $numUser; $y++){
        $id = $users->fetch_assoc();

        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT userID, sum(value) FROM jatekok WHERE userID = ? AND game = ?");
        $stmt->bind_param("ii", $id["id"], $game);
        $stmt->execute();
        $result = $stmt->get_result();

        $num = $result->num_rows;
        
        for ($i = 0; $i < $num; $i++){
            $row = $result->fetch_assoc();
            array_push($data, $row);
        }
    }

    // Vesztés

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT userID FROM loses WHERE game = ?");
    $stmt->bind_param("i", $game);
    $stmt->execute();
    $result = $stmt->get_result();
    $num_loses = $result->num_rows;

    if ($num_loses == 0){

        $max = 0;

        $x = 0;
        while ($x < count($data) && $data[$x]["sum(value)"] == null){
           $x++;
        }
        
        if ($x < count($data)){
            $max = $data[$x]["sum(value)"];
        }

        for ($i = 0; $i < count($data); $i++){
            if ($data[$i]["sum(value)"] > $max && $data[$i]["sum(value)"] != null) {
                $max = $data[$i]["sum(value)"];
            }
        }

        $winers = [];

        for ($i = 0; $i < count($data); $i++){
            if ($data[$i]["sum(value)"] == $max){
                array_push($winers, $data[$i]["userID"]);
            }
        }

        for ($i = 0; $i < count($winers); $i++){
            $stmt = $database->stmt_init();
            $stmt = $database->prepare("INSERT INTO loses(userID, game) VALUES(?,?)");
            $stmt->bind_param("ii", $winers[$i], $game);
            $stmt->execute();
        }

    }

    // győzelem

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT userID FROM wins WHERE game = ?");
    $stmt->bind_param("i", $game);
    $stmt->execute();
    $result = $stmt->get_result();
    $num_win = $result->num_rows;

    if ($num_win == 0){

        $min = 0;

        $x = 0;
        while ($x < count($data) && $data[$x]["sum(value)"] == null){
           $x++;
        }
        
        if ($x < count($data)){
            $min = $data[$x]["sum(value)"];
        }

        for ($i = 0; $i < count($data); $i++){
            if ($data[$i]["sum(value)"] < $min && $data[$i]["sum(value)"] != null) {
                $min = $data[$i]["sum(value)"];
            }
        }
        
        $losers = [];

        for ($i = 0; $i < count($data); $i++){
            if ($data[$i]["sum(value)"] == $min){
                array_push($losers, $data[$i]["userID"]);
            }
        }

        for ($i = 0; $i < count($losers); $i++){
            $stmt = $database->stmt_init();
            $stmt = $database->prepare("INSERT INTO wins(userID, game) VALUES(?,?)");
            $stmt->bind_param("ii", $losers[$i], $game);
            $stmt->execute();
        }
    }
}

if ($_GET["players"] == 7){
    $id = $_GET["user"];
    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT userID FROM loses WHERE userID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;

    echo json_encode($num);

}

if ($_GET["players"] == 8){
    $id = $_GET["user"];
    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT userID FROM wins WHERE userID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;

    echo json_encode($num);
}

if ($_GET["players"] == 9){
    $id = $_GET["user"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("DELETE FROM jatekok WHERE userID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("DELETE FROM loses WHERE userID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("DELETE FROM wins WHERE userID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
 
}
?>