<?php
  $con=mysqli_connect("127.0.0.1","root","root","blog");
  if (mysqli_connect_errno())
  {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  $sql="update blogcontent set blogTitle='$_POST[title]',blogCon='$_POST[con]',blogPostTime='$_POST[time]' where blogId=$_POST[blogId]";
   $con->query($sql);
   if(mmysql_affected_rows()>0){
            echo "1";
   }
   else{
            echo"0";
   }
    mysqli_close($con);
?>