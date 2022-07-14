<?php
    header('Access-Control-Allow-Origin: http://teszt.gyulaibalazs.hu/');
    // header('Access-Control-Allow-Origin: *');

    $input = json_decode(file_get_contents('php://input'), true);
    
    require_once("./connect/connect.php");
    
    $gameName = $input["game"];
    $gameID = $input["gameID"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("DELETE FROM navsettings WHERE GameName = ? AND gameID = ?");
    $stmt->bind_param("ss",$gameName, $gameID);
    $stmt->execute();
?>