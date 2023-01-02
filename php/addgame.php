<?php
require("./context/header.php");

$gameName = $input["GameName"];
$winnerOption = $input["winnerOption"];
$gameID = $input["gameID"];

$stmt = $database->stmt_init();
$stmt = $database->prepare("INSERT INTO navsettings(GameName, winnerOption, gameID) VALUES (?,?,?)");
$stmt->bind_param("sss", $gameName, $winnerOption, $gameID);
$stmt->execute();

$stmt->close();
$database->close();