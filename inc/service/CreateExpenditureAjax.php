<?php

include('../portal.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$portal = new PortalUtility();

// $product_id = trim(mysqli_real_escape_string($conn, !empty($_POST['product_id']) ? $_POST['product_id'] : ""));
$agent_id = trim(mysqli_real_escape_string($conn, !empty($_POST['agent_id']) ? $_POST['agent_id'] : ""));
$expenditure_amount = trim(mysqli_real_escape_string($conn, !empty($_POST['expenditure_amount']) ? $_POST['expenditure_amount'] : ""));
$expenditure_description = trim(mysqli_real_escape_string($conn, !empty($_POST['expenditure_description']) ? $_POST['expenditure_description'] : ""));
$authorizer_name = trim(mysqli_real_escape_string($conn, !empty($_POST['authorizer_name']) ? $_POST['authorizer_name'] : ""));
$date = trim(mysqli_real_escape_string($conn, !empty($_POST['date']) ? $_POST['date'] : ""));
$sales_point = trim(mysqli_real_escape_string($conn, !empty($_POST['sales_point']) ? $_POST['sales_point'] : ""));
// $payment_type = trim(mysqli_real_escape_string($conn, !empty($_POST['payment_type']) ? $_POST['payment_type'] : ""));


$user = $portal->createExpenditure($conn, $agent_id, $expenditure_amount, $expenditure_description, $authorizer_name, $date, $sales_point);
echo $user;