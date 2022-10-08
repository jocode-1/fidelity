<?php

include('../portal.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$portal = new PortalUtility();

$point_id = trim(mysqli_real_escape_string($conn, !empty($_POST['point_id']) ? $_POST['point_id'] : ""));

$user = $portal->fetchSalesPointById($conn, $point_id);
echo $user;