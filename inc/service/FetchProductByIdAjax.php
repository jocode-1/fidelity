<?php

include('../portal.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$portal = new PortalUtility();

$product_id = trim(mysqli_real_escape_string($conn, !empty($_POST['product_id']) ? $_POST['product_id'] : ""));

$user = $portal->fetchProductById($conn,$product_id);
echo $user;