<?php
    error_reporting(0);
  $con=mysqli_connect("127.0.0.1","root","root","blog");
  if (mysqli_connect_errno())
  {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
  $sql="
  select * from blogcontent";
  $data=array();
   class Blog{
    public $blogId;
    public $blogTitle;
    public $blogCon;
    public $blogImg;
   };
    $result = mysqli_query($con,$sql);
    while($row = mysqli_fetch_array($result))
    {
       $blog=new Blog();
       $blog->blogId=$row[blogId];
       $blog->blogTitle=$row[blogTitle];
       $blog->blogCon=$row[blogCon];
       $blog->blogImg=$row[blogImg];
       $blog->blogPostTime=$row[blogPostTime];
       $data[]=$blog;
    }
    echo json_encode($data);
    mysqli_close($con);
?>