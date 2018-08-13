<?php
   error_reporting(0);
  $con=mysqli_connect("127.0.0.1","root","root","blog");
  if (mysqli_connect_errno())
  {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  $sql="
  select * from blogcontent where userId=$_POST[userId]";
  $result = mysqli_query($con,$sql);
  if($result>=1){
    echo '1';
  }
  else{
    echo '0';
  }
   mysqli_close($con);
?>