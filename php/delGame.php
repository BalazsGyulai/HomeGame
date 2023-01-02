<?php
    require("./context/header.php");
    
    $gameName = $input["game"];
    $gameID = $input["gameID"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("DELETE FROM navsettings WHERE GameName = ? AND gameID = ?");
    $stmt->bind_param("ss",$gameName, $gameID);
    $stmt->execute();
?>