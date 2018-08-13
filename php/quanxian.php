<?php
//开启一个会话
session_start();
//如果用户未登录，即未设置$_SESSION['userId']时，执行以下代码
if(!isset( $_SESSION['userId'])){
     echo "0";
}
else
{//如果用户已经登
  echo  "1";
}
?>