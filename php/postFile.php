<?php
error_reporting(0);
// 允许上传的图片后缀
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["file"]["name"]);//将文件名以点号分开，分别获取文件名和后缀名
$extension = end($temp);        // 获取文件后缀名
echo "上传文件名: " . $_FILES["file"]["name"] . "<br>";
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
&& ($_FILES["file"]["size"] < 204800)    // 小于 200 kb
&& in_array($extension, $allowedExts))
{
    if ($_FILES["file"]["error"] > 0)
    {
        echo "错误：: " . $_FILES["file"]["error"] . "<br>";
    }
    else
    {
        echo "上传文件名: " . $_FILES["file"]["name"] . "<br>";
        echo "文件类型: " . $_FILES["file"]["type"] . "<br>";
        echo "文件大小: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
        echo "文件临时存储的位置: " . $_FILES["file"]["tmp_name"];
        echo $_FILES["file"]["name"];
    }
}
else
{
    echo "上传文件名: " . $_FILES["file"]["name"] . "<br>";
            echo "文件类型: " . $_FILES["file"]["type"] . "<br>";
            echo "文件大小: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
            echo "文件临时存储的位置: " . $_FILES["file"]["tmp_name"];
            echo $_FILES["file"]["name"];
    echo "非法的文件格式";
}
?>