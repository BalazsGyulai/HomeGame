<?php

header('Access-Control-Allow-Origin: http://games.gyulaibalazs.hu/');
// header('Access-Control-Allow-Origin: *');

$data = json_decode(file_get_contents('php://input'), true);

require_once("../connect/connect.php");

    $username = $data["username"];
    $password = $data["password"];
    $password2 = $data["password2"];
    $gameID = $data["gameID"];

    $sql = "SELECT * FROM users WHERE username = ? AND gameID = ?";
    $stmt = $database->stmt_init();

    if (!$stmt = $database->prepare($sql)){
        echo json_encode("failed to connect to database");
        exit;
    }

    $stmt->bind_param("ss", $username, $gameID);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()){
        echo json_encode("Already exist");
    } else {
        $status = "member";
        $sql = "INSERT INTO users(username, pass, gameID, status) VALUES(?, ?, ?, ?)";
        $stmt = $database->stmt_init();

        if (!$stmt = $database->prepare($sql)){
            echo json_encode("failed to connect to database");
            exit;
        }

        $option["cost"] = 10;
        $pwdHashed = password_hash($password, PASSWORD_DEFAULT, $option);

        $stmt->bind_param("ssss", $username, $pwdHashed, $gameID, $status);
        $stmt->execute();

        echo json_encode("success");
    }

    $stmt->close();
    $database->close();

?>