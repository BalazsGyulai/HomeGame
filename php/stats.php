<?php
header('Access-Control-Allow-Origin: http://teszt.gyulaibalazs.hu/');
header('Access-Control-Allow-Origin: *');

$input = json_decode(file_get_contents('php://input'), true);

require_once("./connect/connect.php");

if ($input["get"] == "players"){
    $game = $input["gameID"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT username FROM users WHERE gameID = ?");
    $stmt->bind_param("s", $game);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;

    $data = [];
    
    for ($i = 0; $i < $num; $i++){
        array_push($data, $result->fetch_assoc()["username"]);
    }

    echo json_encode($data);
}

if ($input["get"] == "wins"){
    
    $game = $input["gameID"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT id FROM users WHERE gameID = ?");
    $stmt->bind_param("s", $game);
    $stmt->execute();
    $result = $stmt->get_result();
    $id_num = $result->num_rows;

    $data = [];

    for ($i = 0; $i < $id_num; $i++){
        $id = $result->fetch_assoc()["id"];

        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT count(game) FROM wins WHERE userID = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $wins = $stmt->get_result();
        
        array_push($data, $wins->fetch_assoc()["count(game)"]);
    }

    echo json_encode($data);
}

if ($input["get"] == "allgames"){
    $id = $input["id"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT game FROM jatekok WHERE userID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();
    $num = $result->num_rows;

    $data = [];

    for ($i = 0; $i < $num; $i++){
        $game = $result->fetch_assoc();
        
        array_push($data, $game);
    }

    $dbgame = 0;
    $game = 0;

    for ($i = 0; $i < count($data); $i++){
        if ($data[$i]["game"] != $game){
            $dbgame++;
            $game = $data[$i]["game"];
        }
    }

    echo json_encode($dbgame);
}

if ($input["get"] == "lose"){
    $game = $input["gameID"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT id FROM users WHERE gameID = ?");
    $stmt->bind_param("s", $game);
    $stmt->execute();
    $result = $stmt->get_result();
    $id_num = $result->num_rows;

    $data = [];

    for ($i = 0; $i < $id_num; $i++){
        $id = $result->fetch_assoc()["id"];

        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT count(game) FROM loses WHERE userID = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $wins = $stmt->get_result();
        
        array_push($data, $wins->fetch_assoc()["count(game)"]);
    }

    echo json_encode($data);
}

if ($input["get"] == "gamewins"){
    $game = $input["gameID"];
    $gameName = $input["gameName"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT id FROM users WHERE gameID = ?");
    $stmt->bind_param("s", $game);
    $stmt->execute();
    $result = $stmt->get_result();
    $id_num = $result->num_rows;

    $data = [];

    for ($i = 0; $i < $id_num; $i++){
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

if ($input["get"] == "gamelose"){
    $game = $input["gameID"];
    $gameName = $input["gameName"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT id FROM users WHERE gameID = ?");
    $stmt->bind_param("s", $game);
    $stmt->execute();
    $result = $stmt->get_result();
    $id_num = $result->num_rows;

    $data = [];

    for ($i = 0; $i < $id_num; $i++){
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

?>