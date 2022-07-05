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
?>