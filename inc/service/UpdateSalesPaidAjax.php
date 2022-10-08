<?php

include('../portal.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$portal = new PortalUtility();

$sales = trim(mysqli_real_escape_string($conn, !empty($_POST['sales_id']) ? $_POST['sales_id'] : ""));
//	echo $agent;
// $user = $portal->fetchSalesByid($conn, 'N5TB5');
$user = $portal->updateAllSalesPaid($conn, $sales);
echo $user;