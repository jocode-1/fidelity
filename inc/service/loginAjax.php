<?php
include('../portal.php');
//include('inc/session.php');
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
//$database = new database();
//$conn = $database->getConnection();
$portal = new PortalUtility();
//echo $user;
					
	//	$data = json_decode(file_get_contents("php://input"), true);

		$email = trim(mysqli_real_escape_string($conn, !empty($_POST['email']) ? $_POST['email'] : ""));
		$password = trim(mysqli_real_escape_string($conn, !empty($_POST['password']) ? $_POST['password'] : ""));
	
	
		$user = $portal->loginUser($conn,$email,$password);
		echo $user;
		
		
		
	
?>
