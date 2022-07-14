<?php

header('Access-Control-Allow-Origin: http://teszt.gyulaibalazs.hu/');
// header('Access-Control-Allow-Origin: *');

$input = json_decode(file_get_contents('php://input'), true);
require_once("./connect/connect.php");

if ($input["players"] === 0){
    $gameID = $input["gameID"];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT username, id FROM users WHERE gameID = ?")){
        $data["status"] = "failed to connect to database";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("s", $gameID);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;

    // $sql = "SELECT username, id FROM users";
    // $stmt = $database->query($sql);
    // $num = $stmt->num_rows;

    $data = [];
    $players = [];
    for ($i = 0; $i < $num; $i++){
        $row = $result->fetch_assoc();
        array_push($players, $row);
    }

    array_push($data, $players);

    $data["status"] = "success";
    echo json_encode($data);
    $stmt->close();
}

if ($input["players"] == 1){
    $gameID = $input["gameID"];
    // INSERT INTO jatekok(userID, value, round, game) VALUES(12,50,1,1)

    // SELECT * FROM jatekok WHERE round = '1' AND game = '1'

    // SELECT * FROM jatekok, users WHERE jatekok.userID = users.id

    // SELECT jatekok.value, jatekok.round, jatekok.game, users.username, users.id FROM jatekok, users WHERE jatekok.userID = users.id

    // $sql = "SELECT id, username FROM users WHERE";
    // $res = $database->query($sql);
    // $num = $res->num_rows;
    $data = [];
    $players = [];

    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT id, username FROM users WHERE gameID = ?")){
        $data["status"] = "failed to connect to database";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("s", $gameID);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;
    
    
    for ($i = 0; $i < $num; $i++){
        $row = $result->fetch_assoc();
        
        $id = intval($row["id"]);
        $sql2 = "SELECT value, game FROM jatekok WHERE userID = ? ORDER BY jatekID DESC";
        $stmt = $database->stmt_init();
        $stmt = $database->prepare($sql2);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $val = $stmt->get_result();
        $val_num = $val->num_rows;
        if ($val_num > 0){
            $row2 = $val->fetch_assoc();
            
            $row["game"] = $row2["game"];
        } else{
            $row["game"] = 1;
        }
        array_push($players, $row);
    }
     
    array_push($data, $players);
    $data["status"] = "success";
    $stmt->close();
    echo json_encode($data);
}

if ($input["players"] == 2){
    $id = $input["id"];
    $game = $input["round"];
    $gameID = $input["gameID"];
    
    $data = [];
    $sql = "SELECT jatekok.jatekID, jatekok.value FROM users INNER JOIN jatekok ON jatekok.userID = users.id AND jatekok.userID = ? AND jatekok.game = ? AND users.gameID = ? ORDER BY jatekID DESC";
    $stmt = $database->init();
    if (!$stmt = $database->prepare($sql)){
        $data["status"] = "failed to connect to database";
        echo json_encode($data);
        exit;
    };

    $stmt->bind_param("iis", $id, $game, $gameID);
    $stmt->execute();
    $res = $stmt->get_result();
    $num = $res->num_rows;

    $profile = [];
    for ($i = 0; $i < $num; $i++){
        $row = $res->fetch_assoc();

        array_push($profile, $row);
    }
    
    array_push($data, $profile);
    $data["status"] = "success";
    $stmt->close();
    echo json_encode($data);
}

// if ($input["players"] == ){
//     $sql = "SELECT jatekok.value, jatekok.round, jatekok.game, users.username, users.id FROM jatekok, users WHERE jatekok.userID = users.id";2
//     $stmt = $database->query($sql);
//     $num = $stmt->num_rows;

//     $data = [];

//     for ($i = 0; $i < $num; $i++){
//         $row = $stmt->fetch_assoc();
//         array_push($data, $row);
//     }

//     echo json_encode($data);
// }
if ($input["players"] == 3){
    $id = $input["id"];

    $sql = "DELETE FROM jatekok WHERE jatekID = ?";
    $stmt = $database->init();
    $stmt = $database->prepare($sql);

    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
}

if ($input["players"] == 4){
    $id = $input["user"];

    // $sql = "SELECT username FROM users WHERE id = ?";
    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT username FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $result = $stmt->get_result();

    $data = [];

    array_push($data, $result->fetch_assoc());
    
    echo json_encode($data);
}

if ($input["players"] == 5){
    $id = $input["user"];
    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT value, game FROM jatekok WHERE userID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $num = $result->num_rows;
    
    echo json_encode($num);
}

if ($input["players"] == 6){
    
    $game = $input["game"];
    $gameID = $input["gameID"];

    // echo json_encode($game);
    // $users = $database->query("SELECT id FROM users WHERE gameID = ?");
    // $numUser = $users->num_rows;
    $data = [];
    
    $stmt = $database->stmt_init();
    if (!$stmt = $database->prepare("SELECT id FROM users WHERE gameID = ?")){
        $data["status"] = "failed to connect to database";
        echo json_encode($data);
        exit;
    };
    $stmt->bind_param("s", $gameID);
    $stmt->execute();
    $users = $stmt->get_result();
    $numUser = $users->num_rows;
    
    
    for ($y = 0; $y < $numUser; $y++){
        $id = $users->fetch_assoc()["id"];
        
        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT userID, sum(value) FROM jatekok WHERE userID = ? AND game = ?");
        $stmt->bind_param("ii", $id, $game);
        $stmt->execute();
        $result = $stmt->get_result();
        
        $num = $result->num_rows;
        
        for ($i = 0; $i < $num; $i++){
            $row = $result->fetch_assoc();
            array_push($data, $row);
        }
    }
    
    // echo json_encode($data);
    // Vesztés

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT userID FROM loses WHERE game = ?");
    $stmt->bind_param("i", $game);
    $stmt->execute();
    $result = $stmt->get_result();
    $num_loses = $result->num_rows;

    if ($num_loses == 0){

        $max = 0;

        $x = 0;
        while ($x < count($data) && $data[$x]["sum(value)"] == null){
           $x++;
        }
        
        if ($x < count($data)){
            $max = $data[$x]["sum(value)"];
        }

        for ($i = 0; $i < count($data); $i++){
            if ($data[$i]["sum(value)"] > $max && $data[$i]["sum(value)"] != null) {
                $max = $data[$i]["sum(value)"];
            }
        }

        $winers = [];

        for ($i = 0; $i < count($data); $i++){
            if ($data[$i]["sum(value)"] == $max){
                array_push($winers, $data[$i]["userID"]);
            }
        }

        for ($i = 0; $i < count($winers); $i++){
            $stmt = $database->stmt_init();
            $stmt = $database->prepare("INSERT INTO loses(userID, game) VALUES(?,?)");
            $stmt->bind_param("ii", $winers[$i], $game);
            $stmt->execute();
        }

    }

    // győzelem

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT userID FROM wins WHERE game = ?");
    $stmt->bind_param("i", $game);
    $stmt->execute();
    $result = $stmt->get_result();
    $num_win = $result->num_rows;

    if ($num_win == 0){

        $min = 0;

        $x = 0;
        while ($x < count($data) && $data[$x]["sum(value)"] == null){
           $x++;
        }
        
        if ($x < count($data)){
            $min = $data[$x]["sum(value)"];
        }

        for ($i = 0; $i < count($data); $i++){
            if ($data[$i]["sum(value)"] < $min && $data[$i]["sum(value)"] != null) {
                $min = $data[$i]["sum(value)"];
            }
        }
        
        $losers = [];

        for ($i = 0; $i < count($data); $i++){
            if ($data[$i]["sum(value)"] == $min){
                array_push($losers, $data[$i]["userID"]);
            }
        }

        for ($i = 0; $i < count($losers); $i++){
            $stmt = $database->stmt_init();
            $stmt = $database->prepare("INSERT INTO wins(userID, game) VALUES(?,?)");
            $stmt->bind_param("ii", $losers[$i], $game);
            $stmt->execute();
        }
    }
}

if ($input["players"] == 7){
    $id = $input["user"];
    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT userID FROM loses WHERE userID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;

    echo json_encode($num);

}

if ($input["players"] == 8){
    $id = $input["user"];
    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT userID FROM wins WHERE userID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;

    echo json_encode($num);
}

if ($input["players"] == 9){
    $id = $input["user"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("DELETE FROM jatekok WHERE userID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("DELETE FROM loses WHERE userID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("DELETE FROM wins WHERE userID = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();
 
}

if ($input["players"] == 10){
    // $user = 71;
    // $game = 5;
    $user = $input["user"];
    $game = $input["game"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT calendar FROM jatekok WHERE game = ? AND userID = ? ORDER BY jatekID ASC");
    $stmt->bind_param("ii", $game, $user);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;
    $data = [];
    
    for ($i = 0; $i < $num; $i++){
        array_push($data, $result->fetch_assoc()["calendar"]);
    }
    
    echo json_encode($data);
    $stmt->close();
}

if ($input["players"] == 11){
    // $user = 71;
    // $game = 5;
    $user = $input["user"];
    $game = $input["game"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT value FROM jatekok WHERE game = ? AND userID = ? ORDER BY jatekID ASC");
    $stmt->bind_param("ii", $game, $user);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;
    $data = [];
    
    for ($i = 0; $i < $num; $i++){
        array_push($data, $result->fetch_assoc()["value"]);
    }
    
    echo json_encode($data);
    $stmt->close();
}

if ($input["players"] == 12){
    // $user = 71;
    // $game = 5;
    $user = $input["user"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT game FROM jatekok WHERE  userID = ?");
    $stmt->bind_param("i", $user);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;
    $data = [];
    
    $act_game = 0;

    for ($i = 0; $i < $num; $i++){
        $row = $result->fetch_assoc()["game"];
        if ($act_game != $row){
            $act_game = $row;
            array_push($data, $row);
        }
    }
    
    echo json_encode($data);
    $stmt->close();
}

if ($input["players"] == 13){
    // $user = 71;
    // $game = 5;
    $user = $input["user"];
    // $game = $input["game"];

    $user = $input["user"];

    $stmt = $database->stmt_init();
    $stmt = $database->prepare("SELECT game FROM jatekok WHERE  userID = ?");
    $stmt->bind_param("i", $user);
    $stmt->execute();
    $result = $stmt->get_result();
    $num = $result->num_rows;
    $games = [];
    
    $act_game = 0;

    for ($i = 0; $i < $num; $i++){
        $row = $result->fetch_assoc()["game"];
        if ($act_game != $row){
            $act_game = $row;
            array_push($games, $row);
        }
    }

    $data = [];
    for($i = 0; $i < count($games); $i++ ){
        $a = $games[$i];

        $stmt = $database->stmt_init();
        $stmt = $database->prepare("SELECT sum(value) FROM jatekok WHERE game = ? AND userID = ? ORDER BY jatekID ASC");
        $stmt->bind_param("ii", $a, $user);
        $stmt->execute();
        $result = $stmt->get_result();
        $num = $result->num_rows;
        array_push($data, $result->fetch_assoc()["sum(value)"]);
    }
    

    
    echo json_encode($data);
    $stmt->close();
}

?>