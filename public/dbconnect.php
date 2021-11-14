<?php
//connect mysql database
$host = "127.0.0.1";
$user = "root";
$pass = "";
$db = "nodelogin";
$con = mysqli_connect($host, $user, $pass, $db) or die("Error " . mysqli_error($con));
?>