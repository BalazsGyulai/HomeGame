<?php
header('Access-Control-Allow-Origin: http://teszt.gyulaibalazs.hu/');
// header('Access-Control-Allow-Origin: *');
$input = json_decode(file_get_contents('php://input'), true);

require_once("./connect/connect.php");

$gameName = $input["GameName"];
$winnerOption = $input["winnerOption"];
$gameID = $input["gameID"];

$stmt = $database->stmt_init();
$stmt = $database->prepare("INSERT INTO navsettings(GameName, winnerOption, gameID) VALUES (?,?,?)");
$stmt->bind_param("sss", $gameName, $winnerOption, $gameID);
$stmt->execute();

$stmt->close();
$database->close();