<?php
header('Access-Control-Allow-Origin: http://teszt.gyulaibalazs.hu/');
// header('Access-Control-Allow-Origin: *');

$input = json_decode(file_get_contents('php://input'), true);

require_once("./connect/connect.php");

$username = $input["username"];
$pwd = $input["pwd"];
$secure =  intval(ltrim($input["secure"], '#'));

$secure = $secure - 1000;

$stmt = $database->stmt_init();
$stmt = $database->prepare("SELECT * FROM users WHERE username = ? AND id = ?");
$stmt->bind_param("si", $username, $secure);
$stmt->execute();

$result = $stmt->get_result();
$num = $result->num_rows;

$data = [];
if ($num == 1){
    $user = $result->fetch_assoc();

    $checkPwd = password_verify($pwd, $user["pass"]);

    if ($checkPwd === false){
        $data["status"] = "wrong";
        echo json_encode($data);
        exit;
    } else if ($checkPwd === true){
        $data["status"] = "success";
        $data["code"] = $user["gameID"];
        echo json_encode($data);
        exit;
    }
} else{
    $data["status"] = "wrong";
    echo json_encode($data);
    exit;
}


// echo json_encode($input);

?>