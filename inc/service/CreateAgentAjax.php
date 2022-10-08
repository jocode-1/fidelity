<?php

include('../portal.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$portal = new PortalUtility();

// $merchant_id = trim(mysqli_real_escape_string($conn, !empty($_POST['merchant_id']) ? $_POST['merchant_id'] : ""));
$full_name = trim(mysqli_real_escape_string($conn, !empty($_POST['fullname']) ? $_POST['fullname'] : ""));
$phone = trim(mysqli_real_escape_string($conn, !empty($_POST['phone']) ? $_POST['phone'] : ""));
$address  = trim(mysqli_real_escape_string($conn, !empty($_POST['address']) ? $_POST['address'] : ""));
$email = trim(mysqli_real_escape_string($conn, !empty($_POST['email']) ? $_POST['email'] : ""));
$sales_point = trim(mysqli_real_escape_string($conn, !empty($_POST['sales_point']) ? $_POST['sales_point'] : ""));
$sales_point_id =  trim(mysqli_real_escape_string($conn, !empty($_POST['sales_point_id']) ? $_POST['sales_point_id'] : ""));
$role = trim(mysqli_real_escape_string($conn, !empty($_POST['role']) ? $_POST['role'] : ""));

$user = $portal->createAgent($conn, $full_name, $phone, $address, $email, $sales_point,$sales_point_id, $role);
echo $user; 