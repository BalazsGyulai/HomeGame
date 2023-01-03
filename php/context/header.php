<?php

// header('Access-Control-Allow-Origin: http://games.gyulaibalazs.hu/');
header('Access-Control-Allow-Origin: *');
$input = json_decode(file_get_contents('php://input'), true);

require_once("./connect/connect.php");

function dd($value){
    echo "<pre>";
    var_dump($value);
    echo "</pre>";

    die();
}


// SELECT jatekok.jatekID, YEAR(jatekok.calendar) AS year from jatekok WHERE jatekok.userID = 1 GROUP BY year;