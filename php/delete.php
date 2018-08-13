<?php
    header("Content-type:text/html;charset=utf-8");
    session_start();
    $userId=$_SESSION['userId'];
    $con=mysqli_connect("127.0.0.1","root","root","blog");
      if (mysqli_connect_errno())
      {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
      }
      $sql="delete from blogcontent where blogId=$_POST[blogId] and userId=$_SESSION[userId]";
       $con->query($sql);
       if(mysql_affected_rows()>0){
            echo "1";
        }
        else{
            echo"0";
        }

      mysqli_close($con);
?>