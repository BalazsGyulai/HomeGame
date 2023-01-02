<?php
require("./context/header.php");

function AccessDenied($error)
{
    $data["status"] = $error;

    echo json_encode($data);
    exit;
};

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



if ($num == 1) {
    $user = $result->fetch_assoc();

    $checkPwd = password_verify($pwd, $user["pass"]);

    if ($checkPwd === false) {
        AccessDenied("wrong");
    } else if ($checkPwd === true) {

        $data["userID"] = $user["id"];
        $data["gameID"] = $user["gameID"];
        $data["loginsha"] = hash("sha256", $user["id"] . $data["gameID"] . $_SERVER["REMOTE_ADDR"]);
        $data["status"] = "success";

        echo json_encode($data);
        exit;
    }
} else {
    AccessDenied("wrong");
}

//a
// echo json_encode($input);
