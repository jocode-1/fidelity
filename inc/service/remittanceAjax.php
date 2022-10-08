<?php

include('../portal.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$portal = new PortalUtility();

// $product_id = trim(mysqli_real_escape_string($conn, !empty($_POST['product_id']) ? $_POST['product_id'] : ""));
$agent_id = trim(mysqli_real_escape_string($conn, !empty($_POST['agent_id']) ? $_POST['agent_id'] : ""));
$remittance_title = trim(mysqli_real_escape_string($conn, !empty($_POST['remittance_title']) ? $_POST['remittance_title'] : ""));
$amount_deposited = trim(mysqli_real_escape_string($conn, !empty($_POST['amount_deposited']) ? $_POST['amount_deposited'] : ""));
$bank_deposited = trim(mysqli_real_escape_string($conn, !empty($_POST['bank_deposited']) ? $_POST['bank_deposited'] : ""));
$teller_id = trim(mysqli_real_escape_string($conn, !empty($_POST['teller_id']) ? $_POST['teller_id'] : ""));
$date = trim(mysqli_real_escape_string($conn, !empty($_POST['date']) ? $_POST['date'] : ""));
$sales_point = trim(mysqli_real_escape_string($conn, !empty($_POST['sales_point']) ? $_POST['sales_point'] : ""));
// $payment_type = trim(mysqli_real_escape_string($conn, !empty($_POST['payment_type']) ? $_POST['payment_type'] : ""));


$user = $portal->createRemittance($conn, $agent_id, $remittance_title, $amount_deposited, $bank_deposited, $teller_id, $date, $sales_point);
echo $user;