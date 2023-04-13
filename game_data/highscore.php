<?php

$data = json_decode(file_get_contents("php://input"), true);
$allScores = json_decode(file_get_contents("highscore.json"), true);

if ($allScores == null) {
    $allScores = [];
}


function sendJSON($message, $http_code = 200) {
    header("content-type: application/json");
    http_response_code($http_code);
    echo json_encode($message);
    exit();
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    if (strlen($data["player_name"]) > 3) {
        $message = ["name" => $data["player_name"], "score" => $data["player_score"]];
        $allScores[] = $message;
        file_put_contents("highscore.json", json_encode($allScores, JSON_PRETTY_PRINT));
        sendJSON($message);
    } 
    
    $message = ["error" => "Your name needs to contain at least 3 characters!"];
    sendJSON($message, 400);
}

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    
    if (count($allScores) != null) {

        function get_players($a, $b)
        {
            if ($a["score"] == $b["score"]) {
                return 1;
            }
            return ($a["score"] < $b["score"]) ? 1 : -1;
        }
        
        
        usort($allScores, "get_players");
        sendJSON($allScores);
    }
}

?>