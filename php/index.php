<?php
header("Access-Control-Allow-Headers: Content-Type");

require("./context/header.php");
    
// if ($data['get'] == "players"){
//     $sql = "SELECT username FROM users";
//     $stmt = $database->prepare($sql);
//     $result = $stmt->get_result();

//     json_encode("run");
// }
echo json_encode($data);

?>