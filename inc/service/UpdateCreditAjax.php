<?php

include('../portal.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$portal = new PortalUtility();

$sales_id = trim(mysqli_real_escape_string($conn, !empty($_POST['sales_id']) ? $_POST['sales_id'] : ""));
$sales_amount = trim(mysqli_real_escape_string($conn, !empty($_POST['sales_amount']) ? $_POST['sales_amount'] : ""));

$user = $portal->updateCreditStatus($conn, $sales_id, $sales_amount);
echo $user;