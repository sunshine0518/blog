<?php
    error_reporting(0);
    header("Content-type:text/html;charset=utf-8");
    session_start();
    $userId=$_SESSION[userId];
    $con=mysqli_connect("127.0.0.1","root","root","blog");
      if (mysqli_connect_errno())
      {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
      }
      $sql="insert into blogcontent(userId,blogImg,blogTitle,blogCon,blogPostTime)
      values
      ($userId,'$_POST[path]','$_POST[title]','$_POST[con]','$_POST[time]')";
      if(!mysqli_query($con,$sql))
        {
            echo "0";
        }
      else{
        echo '1';
        }
      mysqli_close($con);
?>