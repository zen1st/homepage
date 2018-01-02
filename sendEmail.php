<?php
//echo $_POST["subject"] . $_POST["email"] . $_POST["message"];

// define variables and set to empty values
$errMessage = "";
$subject = $_POST["subject"];
$email = $_POST["email"];
$message = $_POST["message"];

if($subject == null)
{
    $errMessage .= "Error: Please add a subject. <br>";
}

if($email == null)
{
    $errMessage .= "Error: Please add a returning Email address. <br>";  
}

if($message == null)
{
    $errMessage .= "Error: Please add a message. <br>";   
}

$to = "zheerikzeng@gmail.com";
$message1 = "
	<html>
	<body>
		<h2>$subject</h2>
		<div>$message</div>
	</body>
	</html>
	";
// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
// More headers
$headers .= "From: <$email>" . "\r\n";

$subject2 = "Receipt from Erik Zeng";
$message2 = "
	<html>
	<body>
		<h1>You've successfully sent a message to Erik Zeng's inbox with the following message:</h1>
		<h2>$subject</h2>
		<div>$message</div>
	</body>
	</html>
	";

// Always set content-type when sending HTML email
$headers2 = "MIME-Version: 1.0" . "\r\n";
$headers2 .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers2 .= "From: <zheerikzeng@gmail.com>" . "\r\n";

if($errMessage == null)
{
	mail($to,$subject,$message1,$headers);
	mail($email,$subject2,$message2,$headers2);
	echo "Message sent! Please check your inbox/junk for the receipt!";
}
else
{
	echo $errMessage;
}
?>