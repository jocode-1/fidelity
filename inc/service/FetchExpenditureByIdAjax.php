<?php

include('../portal.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$portal = new PortalUtility();

$agent_id = trim(mysqli_real_escape_string($conn, !empty($_POST['agent_id']) ? $_POST['agent_id'] : ""));

$user = $portal->fetchExpenditureById($conn, $agent_id);
echo $user;