<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Content-Type");
$data = json_decode(file_get_contents('php://input'), true);

require_once("./connect/connect.php");
    
// if ($data['get'] == "players"){
//     $sql = "SELECT username FROM users";
//     $stmt = $database->prepare($sql);
//     $result = $stmt->get_result();

//     json_encode("run");
// }
echo json_encode($data);

?>