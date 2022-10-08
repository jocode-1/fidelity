<?php

include('../portal.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

$portal = new PortalUtility();

$point_name = trim(mysqli_real_escape_string($conn, !empty($_POST['point_name']) ? $_POST['point_name'] : ""));
$point_address = trim(mysqli_real_escape_string($conn, !empty($_POST['point_address']) ? $_POST['point_address'] : ""));
$manager_number = trim(mysqli_real_escape_string($conn, !empty($_POST['manager_number']) ? $_POST['manager_number'] : ""));
$active = trim(mysqli_real_escape_string($conn, !empty($_POST['active']) ? $_POST['active'] : ""));

$user = $portal->createSalesPoint($conn, $point_name, $point_address, $manager_number, $active );
echo $user;