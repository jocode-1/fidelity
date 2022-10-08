<?php

include('../portal.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$portal = new PortalUtility();

$agent_id = trim(mysqli_real_escape_string($conn, !empty($_POST['agent_id']) ? $_POST['agent_id'] : ""));
$agent_name = trim(mysqli_real_escape_string($conn, !empty($_POST['fullname']) ? $_POST['fullname'] : ""));
// $customer_name = trim(mysqli_real_escape_string($conn, !empty($_POST['customer_name']) ? $_POST['customer_name'] : ""));
$product_name = trim(mysqli_real_escape_string($conn, !empty($_POST['product_name']) ? $_POST['product_name'] : ""));
$product_quantity = trim(mysqli_real_escape_string($conn, !empty($_POST['product_quantity']) ? $_POST['product_quantity'] : ""));
$sales_point = trim(mysqli_real_escape_string($conn, !empty($_POST['sales_point']) ? $_POST['sales_point'] : ""));
$date = trim(mysqli_real_escape_string($conn, !empty($_POST['date']) ? $_POST['date'] : ""));
$status = trim(mysqli_real_escape_string($conn, !empty($_POST['status']) ? $_POST['status'] : ""));

$user = $portal->createProductOrder($conn, $agent_id, $agent_name, $product_name, $product_quantity, $sales_point, $date, $status);
echo $user; 