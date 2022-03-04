<!--<?php
	//Initiate form variable names
	//$username = $_POST['username'];
	//$email = $_POST['email'];
	//$password = $_POST['password'];

	//Database Connection
	//$conn = new mysqli('localhost', 'root','M@dhu1ti','users');
	//if ($conn->connect_error) {
		//die('Connection Failed : '.$conn->connect_error);//check connection is active or not
	//}else{
	//	$stmt = $conn->prepare("insert into registration(username,email,password)
	//		values(?,?,?)");//insert column and value details
	//	$stmt->bind_param("sss",$username,$email,$password);//Bind the '?' with proper data.
	//	$stmt->execute();//Now execute the query
	//	echo "Registation is successful!"//Message to user
	//	$stmt->close();//Close the statement
	//	$conn->close();//Close the connection
	}
?>-->

<?php
	if (isset($_POST["submit"])) {
		$username = $_POST["username"];
		$email = $_POST["email"];
		$password = $_POST["password"];
	}

	$query = "INSERT INTO registration($username','$email','$password')VALUES('$_POST["username"]','$_POST["email"]','$_POST["password"]')";
	if($query)
	{
	echo "Success";

	}
	else
	{
	echo "Error";

	}
	mysql_query($conn,$query);
	echo "<script>alert('Data Inserted successfully');</script>";
?>