<?php

require("./context/header.php");


if ($input["get"] === "settings") {

    $userID = $input["userID"];

    $data = [];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT * FROM email WHERE userID = ?");
    $stmt->bind_param("i", $userID);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;

    if ($num > 0) {
        $data[] = $result->fetch_assoc()["email"];
    }

    echo json_encode($data);
}

if ($input["get"] === "email") {

    $userID = $input["userID"];
    $email = $input["email"];

    $data = [];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT username FROM users WHERE id = ?");
    $stmt->bind_param("i", $userID);
    $stmt->execute();
    $user = $stmt->get_result();

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT * FROM email WHERE userID = ?");
    $stmt->bind_param("i", $userID);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;

    $template_file = "./context/emailChange_template.php";

    if ($num > 0) {
        $stmt = $database->stmt_init();
        $stmt = $database->prepare("UPDATE email SET email = ? WHERE userID = ?");
        $stmt->bind_param("si", $email, $userID);
        $stmt->execute();

        if (trim($email) !== "" && $email !== "") {

            $email_to = $email;
            $subject = "Email címed megváltozott!";

            $headers = "From: Játékok <support@gyulaibalazs.hu>\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

            $secure = intval($userID) + 1000;
            $username = $user->fetch_assoc()["username"];
            $swap_array = array(
                "{nev}" => $username,
                "{azonosito}" => "#{$secure}",
                "{email}" => $email
            );

            $message = file_get_contents($template_file);

            foreach(array_keys($swap_array) as $key){
                if (strlen($key) > 2 && trim($key) != ""){
                    $message = str_replace($key, $swap_array[$key], $message);
                }
            }

            if (mail($email_to, $subject, $message, $headers)) {
                echo json_encode("Success");
            } else {
                echo json_encode("fail");
            }
        } else {
            echo json_encode("fail");
        }
    } else {
        $stmt = $database->stmt_init();
        $stmt = $database->prepare("INSERT INTO email(userID, email) VALUES(?,?)");
        $stmt->bind_param("is", $userID, $email);
        $stmt->execute();

        if (trim($email) !== "" && $email !== "") {

            $email_to = $email;
            $subject = "Email címed megváltozott!";

            $headers = "From: Játékok <support@gyulaibalazs.hu>\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

            $secure = intval($userID) + 1000;
            $username = $user->fetch_assoc()["username"];
            $swap_array = array(
                "{nev}" => $username,
                "{azonosito}" => "#{$secure}",
                "{email}" => $email
            );

            $message = file_get_contents($template_file);

            foreach(array_keys($swap_array) as $key){
                if (strlen($key) > 2 && trim($key) != ""){
                    $message = str_replace($key, $swap_array[$key], $message);
                }
            }

            if (mail($email_to, $subject, $message, $headers)) {
                echo json_encode("Success");
            } else {
                echo json_encode("fail");
            }
        } else {
            echo json_encode("fail");
        }
    }
}

if ($input["get"] === "pass") {

    $userID = $input["userID"];
    $pass = $input["pass"];
    $pass2 = $input["pass2"];

    $template_file = "./context/passChange_template.php";

    $data = [];
    if ($pass === $pass2) {

        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT username FROM users WHERE id = ?");
        $stmt->bind_param("i", $userID);
        $stmt->execute();
        $user = $stmt->get_result();

        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT email FROM email WHERE userID = ?");
        $stmt->bind_param("i", $userID);
        $stmt->execute();
        $emailres = $stmt->get_result();

        $email = $emailres->fetch_assoc()["email"];

        if($email === "" && $email === NULL){
            $email = "-";
        }

        $option["cost"] = 10;
        $pwdHashed = password_hash($pass, PASSWORD_DEFAULT, $option);

        $stmt = $database->stmt_init();
        $stmt = $database->prepare("UPDATE users SET pass = ? WHERE id = ?");
        $stmt->bind_param("si", $pwdHashed, $userID);
        $stmt->execute();

        if (trim($email) !== "" && $email !== "") {

            $email_to = $email;
            $subject = "A jelszavad megváltozott!";

            $headers = "From: Játékok <support@gyulaibalazs.hu>\r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

            $secure = intval($userID) + 1000;
            $username = $user->fetch_assoc()["username"];
            $swap_array = array(
                "{nev}" => $username,
                "{azonosito}" => "#{$secure}",
                "{secureCode}" => "#{$secure}",
                "{email}" => $email,
                "{pass}" => $pass
            );

            $message = file_get_contents($template_file);

            foreach(array_keys($swap_array) as $key){
                if (strlen($key) > 2 && trim($key) != ""){
                    $message = str_replace($key, $swap_array[$key], $message);
                }
            }

            if (mail($email_to, $subject, $message, $headers)) {
                $data["fail"] = "ok";
            } else {
                $data["fail"] = "Valami hiba történt próbáld meg újra!";
            }
        }
    } else {
        $data["fail"] = "Valami hiba történt próbáld meg újra!";
    }

    echo json_encode($data);
}
