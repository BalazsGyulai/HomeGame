<?php 

require("./context/header.php");

$username = $data["username"];
$password = $data["password"];
$password2 = $data["password2"];
$gameID = uniqid($username, true);
$num = 1;
$data = [];

while ($num != 0){
    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT * FROM users WHERE gameID = ?")){
        $data["status"] = "failed to connect to database";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("s", $gameID);
    $stmt->execute();
    // $result = $stmt->get_result();
    $num = $stmt->get_result()->num_rows;
    $gameID = uniqid($username, true);
    
}

$stmt = $database->stmt_init();
if (!$stmt = $database->prepare("INSERT INTO users(username, pass, gameID, status) VALUES(?,?,?,?)")) {
    $data["status"] = "failed to connect to database";
    echo json_encode($data);
    exit;
};

$option["cost"] = 10;
$pwdHashed = password_hash($password, PASSWORD_DEFAULT, $option);
$status = "leader";

$stmt->bind_param("ssss", $username, $pwdHashed, $gameID, $status);
$stmt->execute();

$data["code"] = $gameID;
$data["status"] = "success";

echo json_encode($data);
$stmt->close();
$database->close();

?>