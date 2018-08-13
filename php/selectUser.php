<?php
  error_reporting(0);
  session_start();
  $error_msg = "";
  $con=mysqli_connect("127.0.0.1","root","root","blog");
  if (mysqli_connect_errno())
  {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  $sql="
  select * from user where userName='$_POST[userName]' and userPwd='$_POST[pwd]'
  ";
  $result=mysqli_query($con,$sql);
  if(mysqli_num_rows($result)==1){
            $row = mysqli_fetch_array($result);
            $_SESSION[userId]=$row[userId];
            echo "1";
  }
 else{
          echo '0';
 }
 mysqli_close($con);
?>