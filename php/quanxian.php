<?php
//����һ���Ự
session_start();
//����û�δ��¼����δ����$_SESSION['userId']ʱ��ִ�����´���
if(!isset( $_SESSION['userId'])){
     echo "0";
}
else
{//����û��Ѿ���
  echo  "1";
}
?>