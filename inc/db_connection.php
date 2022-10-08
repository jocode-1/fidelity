<?php


 class database{


//   private $host = "localhost";
//     private $db_name = "fidelity";
//     private $username = "root";
//     private $password = "";
//   public $conn;

    private $host = "localhost";
    private $db_name = "akbfound_fidelity";
    private $username = "akbfound_fidelity";
    private $password = "Cougar@123..??";
    public $conn;

 

    // get the database connection
    public function getConnection(){
  
        $this->conn = null;
  
        try{
            $this->conn = new mysqli($this->host,$this->username, $this->password, $this->db_name);
           // $this->conn->exec("set names utf8");
		//	echo 'Success';
        }catch(Exception $exception){
            echo "Connection error: " . $exception->getMessage();
        }
  
        return $this->conn;
    }
	
	
}




?>
