<?php

include('inc/portal.php'); //database connection



if (!isset($_SESSION['login_user'])) {
    header('Location: /fidelity'); 
}

// Stored Session
$user_check = $_SESSION['login_user'];


// current signed in user
$email = mysqli_real_escape_string($conn, $user_check);

// SQL Query To Fetch Complete Information Of User
$query = "SELECT * FROM agent WHERE email = '$email'";

$result = mysqli_query($conn, $query);

// Associative array
$userDetails = mysqli_fetch_assoc($result); 