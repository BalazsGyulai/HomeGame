<?php

require("./context/header.php");

$gameID = $data["gameID"];
$username = $data["username"];

$stmt = $database->stmt_init();
$stmt = $database->prepare("SELECT id FROM users WHERE gameID = ? AND username = ?");
$stmt->bind_param("ss", $gameID, $username);
$stmt->execute();

$result = $stmt->get_result();
$row = $result->fetch_assoc();

echo json_encode($row);


?>