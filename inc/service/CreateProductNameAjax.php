<?php

include('../portal.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$portal = new PortalUtility();

$product_name = trim(mysqli_real_escape_string($conn, !empty($_POST['product_name']) ? $_POST['product_name'] : ""));
$active = trim(mysqli_real_escape_string($conn, !empty($_POST['active']) ? $_POST['active'] : ""));

$user = $portal->createProductName($conn, $product_name, $active );
echo $user;