<?php

header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents('php://input'), true);
// $data = json_decode(array_keys($_POST), true);
// echo json_encode($data);
require_once("../connect/connect.php");

    $name = $data['name'];
    $username = $data["username"];
    $email = $data["email"];
    $password = $data["password"];
    $password2 = $data["password2"];

    $sql = "SELECT * FROM users WHERE email = ? OR username = ?";
    $stmt = $database->stmt_init();

    if (!$stmt = $database->prepare($sql)){
        echo json_encode("failed to connect to database");
        exit;
    }

    $stmt->bind_param("ss", $email, $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($row = $result->fetch_assoc()){
        echo json_encode("Already exist");
    } else {
        $sql = "INSERT INTO users(nev, username, email, pass) VALUES(?, ?, ?, ?)";
        $stmt = $database->stmt_init();

        if (!$stmt = $database->prepare($sql)){
            echo json_encode("failed to connect to database");
            exit;
        }

        $option["cost"] = 10;
        $pwdHashed = password_hash($password, PASSWORD_DEFAULT, $option);

        $stmt->bind_param("ssss", $name, $username, $email, $pwdHashed);
        $stmt->execute();

        echo json_encode("success");
    }

    $stmt->close();
    $database->close();

?>