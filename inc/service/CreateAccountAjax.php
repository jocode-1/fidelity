<?php

include('../portal.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$portal = new PortalUtility();

$merchant_id = trim(mysqli_real_escape_string($conn, !empty($_POST['merchant_id']) ? $_POST['merchant_id'] : ""));
$full_name = trim(mysqli_real_escape_string($conn, !empty($_POST['fullname']) ? $_POST['fullname'] : ""));
$phone = trim(mysqli_real_escape_string($conn, !empty($_POST['phone']) ? $_POST['phone'] : ""));
$address  = trim(mysqli_real_escape_string($conn, !empty($_POST['address']) ? $_POST['address'] : ""));
$email = trim(mysqli_real_escape_string($conn, !empty($_POST['email']) ? $_POST['email'] : ""));

$user = $portal->new_account($conn, $merchant_id, $full_name, $phone, $address, $email);
echo $user;