<?php

include('../portal.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$portal = new PortalUtility();

// $product_id = trim(mysqli_real_escape_string($conn, !empty($_POST['product_id']) ? $_POST['product_id'] : ""));
$sales_point_id = trim(mysqli_real_escape_string($conn, !empty($_POST['sales_point_id']) ? $_POST['sales_point_id'] : ""));
$product_name = trim(mysqli_real_escape_string($conn, !empty($_POST['product_name']) ? $_POST['product_name'] : ""));
$sales_point = trim(mysqli_real_escape_string($conn, !empty($_POST['sales_point']) ? $_POST['sales_point'] : ""));
$product_quantity = trim(mysqli_real_escape_string($conn, !empty($_POST['product_quantity']) ? $_POST['product_quantity'] : ""));
$empty_create = trim(mysqli_real_escape_string($conn, !empty($_POST['empty_create']) ? $_POST['empty_create'] : ""));
$product_category = trim(mysqli_real_escape_string($conn, !empty($_POST['product_category']) ? $_POST['product_category'] : ""));
$product_price = trim(mysqli_real_escape_string($conn, !empty($_POST['product_price']) ? $_POST['product_price'] : ""));
$published_date = trim(mysqli_real_escape_string($conn, !empty($_POST['published_date']) ? $_POST['published_date'] : ""));
$active = trim(mysqli_real_escape_string($conn, !empty($_POST['active']) ? $_POST['active'] : ""));

$user = $portal->createProduct($conn,$sales_point_id, $product_name, $sales_point, $product_quantity, $empty_create, $product_category, $product_price, $published_date, $active);
echo $user;