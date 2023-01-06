<?php

require("./context/header.php");

function usersInGame($database, $gameID)
{
  $stmt = $database->stmt_init();
  $stmt = $database->prepare("SELECT id FROM users WHERE gameID = ?");
  $stmt->bind_param("s", $gameID);
  $stmt->execute();
  $result = $stmt->get_result();
  $id_num = $result->num_rows;

  return [$id_num, $result];
}

$gameID = $input["gameID"];

$stmt = $database->stmt_init();
$stmt = $database->prepare("SELECT b.id, b.username, b.gameID, email.email FROM email INNER JOIN (SELECT * FROM users WHERE gameID = ?) b ON email.userID = b.id");
$stmt->bind_param("s", $gameID);
$stmt->execute();

$year = date("Y");
$year = $year - 1;

$emails = $stmt->get_result();





$template_file = "./context/yearStat_template.php";

foreach ($emails as $email) {

  $id = $email["id"];
  $date = $year;

  $stmt = $database->stmt_init();
  $stmt = $database->prepare("SELECT count(a.jatekID) as games FROM (SELECT * FROM jatekok WHERE jatekok.userID = ? and year(jatekok.calendar) = ? GROUP BY game, gameName) a;");
  $stmt->bind_param("is", $id, $date);
  $stmt->execute();
  $result = $stmt->get_result();

  $allPlayedGames = $result->fetch_assoc()["games"];

  $stmt = $database->stmt_init();
  $stmt = $database->prepare("SELECT count(a.game) as loses FROM (SELECT j.userID, j.game, j.gameName, YEAR(j.calendar) FROM jatekok j WHERE j.userID = ? AND YEAR(j.calendar) = ? GROUP BY j.game, j.gameName) a INNER JOIN (SELECT l.game, l.gameName FROM loses l WHERE l.userID = ?) b ON a.gameName = b.gameName AND a.game = b.game;");
  $stmt->bind_param("isi", $id, $date, $id);
  $stmt->execute();
  $wins = $stmt->get_result();

  $loses = $wins->fetch_assoc()["loses"];


  $stmt = $database->stmt_init();
  // $stmt = $database->prepare("SELECT count(game) FROM wins WHERE userID = ?");

  $stmt = $database->prepare("SELECT count(a.game) as wins FROM (SELECT j.userID, j.game, j.gameName, YEAR(j.calendar) FROM jatekok j WHERE j.userID = ? AND YEAR(j.calendar) = ? GROUP BY j.game, j.gameName) a INNER JOIN (SELECT w.game, w.gameName FROM wins w WHERE w.userID = ?) b ON a.gameName = b.gameName AND a.game = b.game;");
  $stmt->bind_param("isi", $id, $date, $id);
  $stmt->execute();
  $wins = $stmt->get_result();

  $victories = $wins->fetch_assoc()["wins"];

  if (trim($email["email"]) !== "" && $email["email"] !== "") {

    $email_to = $email["email"];
    $subject = "Éves statisztikád!";

    $headers = "From: Játékok <support@gyulaibalazs.hu>\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $secure = intval($email["id"]) + 1000;
    $username = $email["username"];
    $swap_array = array(
      "{nev}" => $username,
      "{azonosito}" => "#{$secure}",
      "{year}" => $year,
      "{games}" => $allPlayedGames,
      "{loses}" => $loses,
      "{wins}" => $victories,
      "{loserate}" => round($loses / $allPlayedGames * 100),
      "{winrate}" => round($victories / $allPlayedGames * 100),
    );

    $message = file_get_contents($template_file);

    foreach (array_keys($swap_array) as $key) {
      if (strlen($key) > 2 && trim($key) != "") {
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
