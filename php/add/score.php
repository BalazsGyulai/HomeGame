<?php

header('Access-Control-Allow-Origin: http://teszt.gyulaibalazs.hu/');
// header('Access-Control-Allow-Origin: *');
$data = json_decode(file_get_contents('php://input'), true);

require_once("../connect/connect.php");
    
$id = $data["id"];
$val = $data["val"];
$game = $data["game"];
$caledar = date("Y.d.m. G:i");

$sql = "INSERT INTO jatekok(userID, value, game, calendar) VALUES(?,?,?,?)";
$stmt = $database->stmt_init();
$stmt = $database->prepare($sql);
$stmt->bind_param("iiis", $id, $val, $game, $caledar);
$stmt->execute();

$stmt->close();
$database->close();
echo json_encode($game);

?>