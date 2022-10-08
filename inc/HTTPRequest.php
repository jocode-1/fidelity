<?php 
ini_set("include_path", '/home/neovastl/php:' . ini_get("include_path") );

require_once 'HTTP/Request2.php';
$request = new HTTP_Request2();
$request->setUrl('https://www.bulksmsnigeria.com/api/v1/sms/create');
$request->setMethod(HTTP_Request2::METHOD_POST);
$request->setConfig(array(
  'follow_redirects' => TRUE
));
$request->setHeader(array(
  'Content-Type' => 'application/json'
));
$request->setBody('{
\n    "api_token":"lVR2zRtkL3SXJthJNC9KtfBye0dsjABjwxTsfHy7JwxCfbmv2clUba2X864D",
\n    "from":"FMC EBUTE META",
\n    "to":"07069414892",
\n    "body":"Thank you for opening a record account with the hospital Bank:Sterling Bank Account Number:3652178965 AccountName:Omodara Oluwakayode/FMCEMFund to your record account from any Bank/Agents",
\n    "dnd":"3"
\n}');
try {
  $response = $request->send();
  if ($response->getStatus() == 200) {
    echo $response->getBody();
  }
  else {
    echo 'Unexpected HTTP status: ' . $response->getStatus() . ' ' .
    $response->getReasonPhrase();
  }
}
catch(HTTP_Request2_Exception $e) {
  echo 'Error: ' . $e->getMessage();
}