<!--?php
	$sname = "localhost";
	$uname = "root"
	$password = "M@dhu1ti";
	$db_name = "users";

	$conn = mysql_connect($sname, $uname, $passwor, $db_name);

	if (!$conn) {
		echo "Connection_aborted!";
		exit();
	}
?-->
<?php
	$conn = mysql_connect("localhost","root","M@dhu1ti","users");
?>