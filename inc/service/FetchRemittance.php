<?php

include('../portal.php');

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");

$portal = new PortalUtility();

$user = $portal->fetchRemittance($conn);
echo $user;