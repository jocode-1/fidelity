<?php

include('db_connection.php');
session_start();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
// Load Composer's autoloader
require 'vendor/autoload.php';

// Instantiation and passing `true` enables exceptions

//$conn = new mysqli('localhost','root', '', 'property');
//$conn = new mysqli('localhost','bernini47', 'Javax.swing2020', 'wuxianco_cbt');
//$username = "bernini47";
//$password = "Javax.swing2020";
$database = new database();
$conn = $database->getConnection();

class PortalUtility
{

	public function createProduct($conn, $sales_point_id, $product_name, $sales_point, $product_quantity, $empty_create, $product_category, $product_price, $published_date, $active)
	{
		$status = "";
		// $SalesDeduction = $this->getProductQuantity($conn, $product);
		$product_id = substr(str_shuffle(str_repeat("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5)), 0, 5);
		$sql = "INSERT INTO `products`(`product_id`, `sales_point_id`, `product_name`, `sales_point`, `product_quantity`, `empty_create`, `product_category`, `product_price`, `published_date`, `active`)
		 VALUES ('$product_id', '$sales_point_id', '$product_name', '$sales_point', '$product_quantity', '$empty_create', '$product_category', '$product_price','$published_date','Y')";
		if (mysqli_query($conn, $sql)) {
			$status = json_encode(array("message" => "success", "product_id" => $product_id), JSON_PRETTY_PRINT);
		} else {
			$status = json_encode(array("message" => "error", "product_id" => "null"), JSON_PRETTY_PRINT);
		}
		return $status;
	}

	public function createSalesPoint($conn, $point_name, $point_address, $manager_number, $active)
	{
		$status = "";
		$point_id = substr(str_shuffle(str_repeat("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5)), 0, 5);
		$sql = "INSERT INTO `sales_point`(`point_id`, `point_name`, `point_address`, `manager_number`, `active`)
		 VALUES ('$point_id','$point_name','$point_address','$manager_number','Y')";
		if (mysqli_query($conn, $sql)) {
			$status = json_encode(array("message" => "success", "point_id" => $point_id), JSON_PRETTY_PRINT);
		} else {
			$status = json_encode(array("message" => "error", "point_id" => "null"), JSON_PRETTY_PRINT);
		}
		return $status;
	}

	public function fetchCategory($conn)
	{
		$json = array();
		$sql = "SELECT * FROM category";
		$result = mysqli_query($conn, $sql);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}
		return json_encode($json, JSON_PRETTY_PRINT);
	}

	public function fetchProduct($conn)
	{
		$json = array();
		$sql = "SELECT * FROM products";
		$result = mysqli_query($conn, $sql);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}
		return json_encode($json, JSON_PRETTY_PRINT);
	}

	public function fetchSalesPoint($conn)
	{
		$json = array();
		$sql = "SELECT * FROM sales_point WHERE active = 'Y' ORDER BY stampdate DESC";
		$result = mysqli_query($conn, $sql);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}
		return json_encode($json, JSON_PRETTY_PRINT);
	}


	public function createAgent($conn, $full_name, $phone, $address, $email, $sales_point,$sales_point_id, $role)
	{

		$status = "";
		$agent_id = substr(str_shuffle(str_repeat("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5)), 0, 5);
		$password = substr(str_shuffle(str_repeat("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4)), 0, 4);
		
		$sql = "INSERT INTO `agent`(`agent_id`, `fullname`, `phone`, `address`, `email`, `sales_point`,`sales_point_id`, `role` ,`active`,`password`)
		 VALUES ('$agent_id','$full_name','$phone','$address', '$email', '$sales_point','$sales_point_id', '$role', 'Y', '$password')";
		if (mysqli_query($conn, $sql)) {
			$status = json_encode(array("message" => "success", "agent_id" => $agent_id), JSON_PRETTY_PRINT);
			$this->sendSms($phone, $password);
		} else {
			$status = json_encode(array("message" => "error", "agent_id" => "null"), JSON_PRETTY_PRINT);
		}
		return $status;
	}

	public function fetchProductById($conn, $product)
	{
		$json = array();

		$sqlSelect = "SELECT * FROM `products` WHERE `product_id`  = '$product'";
		$result = mysqli_query($conn, $sqlSelect);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}

		return json_encode($json, JSON_PRETTY_PRINT);
	}

	public function fetchAgentProductById($conn, $agent)
	{
		$json = array();
		$sales_point = $this->fetchPointByAgent($conn,$agent);
		$sqlSelect = "SELECT * FROM `products` WHERE `sales_point_id` = '$sales_point'";
		$result = mysqli_query($conn, $sqlSelect);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}

		return json_encode($json, JSON_PRETTY_PRINT);
	}
	
	
	public function fetchPointByAgent($conn,$agent){
	    $sqlSelect = "SELECT * FROM `agent` WHERE `agent_id`  = '$agent'";
		$result = mysqli_query($conn, $sqlSelect);
		$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
		return $row['sales_point_id'];
	}

	public function updateProduct($conn, $product_name, $sales_point, $product_quantity, $empty_create, $product_category, $product_price, $product_description)
	{

		$sql = "UPDATE `products` SET `product_name`= '$product_name', `sales_point` = '$sales_point', `product_quantity` = '$product_quantity', `empty_create` = '$empty_create', `product_category` = '$product_category', `product_price` = '$product_price', `product_description` = '$product_description' WHERE `active` = 'Y'";
		$result = mysqli_query($conn, $sql);
		return '1';
	}

	public function deleteProduct($conn, $product_id)
	{

		$sql = "UPDATE `products` SET `active` = 'N' WHERE `product_id` = '$product_id'";
		$result = mysqli_query($conn, $sql);
		return '1';
	}

	//login and twofactor authenticator

	public function loginUser($conn, $email, $password)
	{
		$json = array();

		$query = "SELECT email, password, role from agent where email = '" . $email . "' and password = '" . $password . "'";
		$result = mysqli_query($conn, $query);
		$r = mysqli_fetch_array($result);
		if ($r > 0) {
			$_SESSION['login_user'] = $email;
			$json[] = $r;
		} else {
			$json[] = 0;
		}

		return json_encode($json, JSON_PRETTY_PRINT);
	}


	public function agents($conn)
	{
		$json = array();

		$query = "SELECT * FROM `staff` WHERE active = 'Y'";
		$result = mysqli_query($conn, $query);

		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}

		return json_encode($json, JSON_PRETTY_PRINT);
	}

	public function createSales($conn, $agent_id, $agent_name, $sales_point, $product_name, $product_price, $product_quantity, $total_amount, $amount_paid, $amount_credit, $empty_create, $customer_name, $payment_type,$product_id)
{
    $status = "";
    $flag = "";
    if($amount_credit > 0){
        $flag = 'N';
    }else{
        $flag = 'Y';
    }
    $updateProducts = $this->getProductQuantity($conn, $product_id);
    $updateCrate = $this->getCrateQuantity($conn, $product_id);
    $cratesDeduction = $updateCrate + $empty_create;
    $salesDeduction =  $updateProducts - $product_quantity;
    $sales_id = substr(str_shuffle(str_repeat("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5)), 0, 5);
    $sql = "INSERT INTO `sales`(`sales_id`, `agent_id`, `fullname`, `sales_point`, `product_name`, `product_price`, `product_quantity`, `total_amount`, `amount_paid`, `amount_credit`, `empty_create`, `customer_name`, `payment_type`,`status`)
     VALUES ('$sales_id','$agent_id', '$agent_name', '$sales_point','$product_name','$product_price','$product_quantity','$total_amount','$amount_paid', '$amount_credit', '$empty_create', '$customer_name','$payment_type','$flag')";
    if (mysqli_query($conn, $sql)) {
        $status = json_encode(array("message" => "success", "agent_id" => $agent_id), JSON_PRETTY_PRINT);
         $this->updateProductQuantity($conn, $product_id, $salesDeduction);
         $this->updateCrateQuantity($conn, $product_id, $cratesDeduction);
    } else {
        $status = json_encode(array("message" => "error", "agent_id" => "null"), JSON_PRETTY_PRINT);
    }
    return $status;
}



	public function createRemittance($conn, $agent_id, $remittance_title, $amount_deposited, $bank_deposited, $teller_id, $date, $sales_point)
	{
		$status = "";
		$remittance_id = substr(str_shuffle(str_repeat("abcdefghijklmnopqrstuvwxyz", 9)), 0, 5);
		$sql = "INSERT INTO `remittance`(`remittance_id`, `agent_id`, `remittance_title`, `amount_deposited`, `bank_deposited`, `teller_id`, `date`, `sales_point`)
		 VALUES ('$remittance_id','$agent_id','$remittance_title','$amount_deposited','$bank_deposited','$teller_id','$date', '$sales_point')";
		if (mysqli_query($conn, $sql)) {
			$status = json_encode(array("message" => "success", "agent_id" => $agent_id), JSON_PRETTY_PRINT);
		} else {
			$status = json_encode(array("message" => "error", "agent_id" => "null"), JSON_PRETTY_PRINT);
		}
		return $status;
	}

	public function fetchRemittanceById($conn, $agent_id)
	{
		$json = array();

		$sqlSelect = "SELECT * FROM `remittance` WHERE `agent_id`  = '$agent_id'";
		$result = mysqli_query($conn, $sqlSelect);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}

		return json_encode($json, JSON_PRETTY_PRINT);
	}
	
	public function fetchSalesPointById($conn, $point_id)
	{
		$json = array();
		$sql = "SELECT * FROM `sales_point` WHERE `point_id` = '$point_id'";
		$result = mysqli_query($conn, $sql);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}
		return json_encode($json, JSON_PRETTY_PRINT);
	}

	public function fetchRemittance($conn)
	{
		$json = array();

		$sqlSelect = "SELECT * FROM `remittance` order by stampdate";
		$result = mysqli_query($conn, $sqlSelect);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}

		return json_encode($json, JSON_PRETTY_PRINT);
	}

	public function createExpenditure($conn, $agent_id, $expenditure_amount, $expenditure_description, $authorizer_name, $date, $sales_point)
	{
		$status = "";
		$expenditure_id = substr(str_shuffle(str_repeat("abcdefghijklmnopqrstuvwxyz", 9)), 0, 9);
		$sql = "INSERT INTO `expenditure`(`expenditure_id`, `agent_id`, `expenditure_amount`, `expenditure_description`, `authorizer_name`, `date`, `sales_point`)
		 VALUES ('$expenditure_id','$agent_id','$expenditure_amount', '$expenditure_description', '$authorizer_name','$date', '$sales_point')";
		if (mysqli_query($conn, $sql)) {
			$status = json_encode(array("message" => "success", "agent_id" => $agent_id), JSON_PRETTY_PRINT);
		} else {
			$status = json_encode(array("message" => "error", "agent_id" => "null"), JSON_PRETTY_PRINT);
		}
		return $status;
	}

	public function fetchExpenditureById($conn, $agent_id)
	{
		$json = array();

		$sqlSelect = "SELECT * FROM `expenditure` WHERE `agent_id`  = '$agent_id'";
		$result = mysqli_query($conn, $sqlSelect);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}

		return json_encode($json, JSON_PRETTY_PRINT);
	}

	public function fetchSales($conn)
	{
		$json = array();
		$sql = "SELECT * FROM sales ORDER BY timestamp DESC";
		$result = mysqli_query($conn, $sql);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}
		return json_encode($json, JSON_PRETTY_PRINT);
	}

	public function fetchAgents($conn)
	{
		$json = array();
		$sql = "SELECT * FROM agent ORDER BY stampdate DESC ";
		$result = mysqli_query($conn, $sql);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}
		return json_encode($json, JSON_PRETTY_PRINT);
	}

	public function fetchAgentByid($conn, $agent)
	{
		$json = array();

		$sql = "SELECT * FROM `agent` WHERE `agent_id` = '$agent'";
		$result = mysqli_query($conn, $sql);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}
		return json_encode($json, JSON_PRETTY_PRINT);
	}

	public function deleteAgent($conn, $agent_id)
	{

		$sql = "DELETE FROM agent WHERE `agent_id` = '$agent_id'";
		$result = mysqli_query($conn, $sql);
		return '1';
	}
	
	public function deleteSales($conn, $sales)
	{

		$sql = "DELETE FROM sales WHERE `sales_id` = '$sales'";
		$result = mysqli_query($conn, $sql);
		return '1';
	}

	public function fetchExpenditure($conn)
	{
		$json = array();
		// $sales_point = $this->fetchSalesPointById($conn, $agent_id);

		$sql = "SELECT * FROM `expenditure`";
		$result = mysqli_query($conn, $sql);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}
		return json_encode($json, JSON_PRETTY_PRINT);
	}

	public function fetchSalesByid($conn, $agent_id)
	{
		$json = array();

		$sql = "SELECT * FROM `sales` WHERE `agent_id` = '$agent_id'";
		$result = mysqli_query($conn, $sql);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}
		return json_encode($json, JSON_PRETTY_PRINT);
	}

	public function fetchAllSalesByid($conn, $sales)
	{
		$json = array();

		$sql = "SELECT * FROM `sales` WHERE `sales_id` = '$sales'";
		$result = mysqli_query($conn, $sql);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}
		return json_encode($json, JSON_PRETTY_PRINT);
	}

	public function updateProductQuantity($conn, $product_id, $newValue)
	{

	
		$sql = "UPDATE `products` SET product_quantity = '$newValue' WHERE `product_id` = '$product_id'";
		$result = mysqli_query($conn, $sql);
		//return '1';
	}
	
	public function updateCrateQuantity($conn, $product_id, $cratesDeduction){
	   	$sql = "UPDATE `products` SET empty_create = '$cratesDeduction' WHERE `product_id` = '$product_id'";
		$result = mysqli_query($conn, $sql);
	    
	}

	public function getProductQuantity($conn, $product)
	{
		
		$sql = "SELECT * FROM `products` WHERE `product_id`  = '$product'";
		$result = mysqli_query($conn, $sql);
		$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
	 	return $row['product_quantity'];
	}
	
	
	public function getCrateQuantity($conn, $product)
	{
		
		$sql = "SELECT * FROM `products` WHERE `product_id`  = '$product'";
		$result = mysqli_query($conn, $sql);
		$row = mysqli_fetch_array($result,MYSQLI_ASSOC);
	 	return $row['empty_create'];
	}

	
	 public function sendSms($phone, $token)
    {

        $message = 'Your Fidelity Structure password is ' . $token;

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://customer.smsprovider.com.ng/api/?username=dtuzzy@yahoo.com&password=bernini47&message=' . $message . '&sender=MobileToken&mobiles=' . $phone,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'GET',
        ));

        $response = curl_exec($curl);

        curl_close($curl);
       // return $response;
    }
    
    public function updatePassword($conn, $agent, $password){
		$sql = "UPDATE `agent` SET `password` = '$password' WHERE `agent_id` = '$agent'";
		$result = mysqli_query($conn, $sql);
		return '1';
	}

	public function createProductName($conn, $product_name, $active)
	{
		$status = "";
		$name_id = substr(str_shuffle(str_repeat("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5)), 0, 5);
		$sql = "INSERT INTO `product_name`(`name_id`, `product_name`, `active`)
		 VALUES ('$name_id','$product_name', 'Y')";
		if (mysqli_query($conn, $sql)) {
			$status = json_encode(array("message" => "success", "name_id" => $name_id), JSON_PRETTY_PRINT);
		} else {
			$status = json_encode(array("message" => "error", "name_id" => "null"), JSON_PRETTY_PRINT);
		}
		return $status;
	}

	public function fetchProductName($conn)
	{
		$json = array();
		$sql = "SELECT * FROM product_name ORDER BY stampdate DESC ";
		$result = mysqli_query($conn, $sql);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}
		return json_encode($json, JSON_PRETTY_PRINT);
	}

	// public function fetchAllCredit($conn)
	// {
	// 	$json = array();
	// 	$sql = "SELECT * FROM credits ORDER BY stampdate DESC ";
	// 	$result = mysqli_query($conn, $sql);
	// 	while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
	// 		$json[] = $r;
	// 	}
	// 	return json_encode($json, JSON_PRETTY_PRINT);
	// }

	public function createProductOrder($conn, $agent_id, $agent_name, $product_name, $product_quantity, $sales_point, $date, $status)
	{
		$status = "";
		$order_id = substr(str_shuffle(str_repeat("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 5)), 0, 5);
		$sql = "INSERT INTO `orders`(`order_id`, `agent_id`, `fullname`, `product_name`, `product_quantity`, `sales_point`, `date`, `status`)
		 VALUES ('$order_id', '$agent_id', '$agent_name', '$product_name', '$product_quantity', '$sales_point', '$date', 'Pending')";
		if (mysqli_query($conn, $sql)) {
			$status = json_encode(array("message" => "success", "order_id" => $order_id), JSON_PRETTY_PRINT);
		} else {
			$status = json_encode(array("message" => "error", "order_id" => "null"), JSON_PRETTY_PRINT);
		}
		return $status;
	}
	

	public function fetchAllOrder($conn)
	{
		$json = array();
		$sql = "SELECT * FROM orders WHERE `status` = 'Pending'";
		$result = mysqli_query($conn, $sql);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}
		return json_encode($json, JSON_PRETTY_PRINT);
	}


	public function fetchCreditById($conn)
	{
		$json = array();
		$sql = "SELECT * from sales where status = 'N'";
		$result = mysqli_query($conn, $sql);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}
		return json_encode($json, JSON_PRETTY_PRINT);
	}

	public function updateAllSales($conn, $sales)
	{

		$sql = "UPDATE `sales` SET `status` = 'C' WHERE `sales_id` = '$sales'";
		$result = mysqli_query($conn, $sql);
		return '1';
	}

	public function updateAllSalesPaid($conn, $sales)
	{

		$sql = "UPDATE `sales` SET `status` = 'P' WHERE `sales_id` = '$sales'";
		$result = mysqli_query($conn, $sql);
		return '1';
	}

	public function updateOrder($conn, $sales)
	{

		$sql = "UPDATE `orders` SET `status` = 'Cancelled' WHERE `order_id` = '$sales'";
		$result = mysqli_query($conn, $sql);
		return '1';
	}

	public function fetchOrderById($conn, $agent)
	{
		$json = array();

		$sqlSelect = "SELECT * FROM `orders` WHERE `agent_id`  = '$agent'";
		$result = mysqli_query($conn, $sqlSelect);
		while ($r = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
			$json[] = $r;
		}

		return json_encode($json, JSON_PRETTY_PRINT);
	}
	
	
	public function updateCreditStatus($conn, $sales_id,$sales_amount){
	    
	    $sql = "UPDATE `sales` SET `amount_credit` = '$sales_amount' WHERE `sales_id` = '$sales_id'";
		$result = mysqli_query($conn, $sql);
	//	return '1';
	}

	


}

$portal = new PortalUtility();

// echo $portal->createProduct($conn,'test','test','test','test','test','test','test','test','test');
// echo $portal->createSales($conn,'test','test','test','test','test','test','test','test','test','test','test','test','test','test','test');
// echo $portal->createSalesPoint($conn,'test','test','test','test');
// echo $portal->fetchPointByAgent($conn,'QQ9I8');
 //echo $portal->loginUser($conn, 'ola@gmail.com', '1111');
//  echo $portal->updateProductQuantity($conn, 'R0GWH', 'N1F62');
//echo $portal->getProductQuantity($conn, 'AEHTX');
// echo $portal->getProductQuantity($conn, 'EM1Y3');
// echo $portal->fetchExpenditure($conn, 'N5TB5');
// echo $portal->createProductOrder($conn, 'test', 'test', 'test', 'test');
// echo $portal->fetchCredit($conn, '9AZ6D');

