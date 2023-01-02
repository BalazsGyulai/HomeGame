<?php 
require("./context/header.php");

$gameID = $input["gameID"];

$stmt = $database->stmt_init();
$stmt = $database->prepare("SELECT GameName FROM navsettings WHERE gameID = ?");
$stmt->bind_param("s", $gameID);
$stmt->execute();
$result = $stmt->get_result();
$num = $result->num_rows;

$data = [];

for ($i = 0; $i < $num; $i++){
    array_push($data, $result->fetch_assoc()["GameName"]);
}

echo json_encode($data);

?>