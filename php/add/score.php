<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");
$data = json_decode(file_get_contents('php://input'), true);

require_once("../connect/connect.php");
    
$id = $data["id"];
$val = $data["val"];
$game = $data["game"];

$sql = "INSERT INTO jatekok(userID, value, game) VALUES(?,?,?)";
$stmt = $database->stmt_init();
$stmt = $database->prepare($sql);
$stmt->bind_param("iii", $id, $val, $game);
$stmt->execute();

$stmt->close();
$database->close();
echo json_encode($data);

?>