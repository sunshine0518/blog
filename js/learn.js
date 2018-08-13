var path="";
$(function(){
       var top=$("#top");
       var list_image=$(".list_image");
       var image=$(".image");
       var list_image_copy=$(".list_image_copy");
       var speed=2;
       var index=0;
       var timer=setInterval(lunbo,10);
       list_image_copy.html(list_image.html());
       //无缝滚动 根据scrollLeft实现的图片轮播
        var width=parseInt($("#top").css("width"));
        var borderW=parseInt($("#top").css("borderWidth"));
       function lunbo(){
           if(top.scrollLeft()<=0){
               top.scrollLeft((width-borderW)/2);
           }
           else{
               scrollLeft=top.scrollLeft()-speed;
               top.scrollLeft(scrollLeft);
           }
       }
       //sessionStorage保存值
        function saveSessionStorage(name,value){
           sessionStorage.setItem(name,value);
        }
        //sessionStorage会话期取值
        function loadSessionStorage(name){
            return sessionStorage.getItem(name);
        }
        saveSessionStorage("isOnload","false");
        //页面首次加载 发送ajax请求去请求数据库中的博文数据
        (function (){
            if(loadSessionStorage("isOnload")){
                $.ajax({
                    method:"get",
                    url:"../../xmbk/php/selectBlog.php",
                    success:function (res){
                        res=JSON.parse(res);
                        if(res.length>=1){
                            for(var i=0;i<res.length;i++){
                                var time=res[i].blogPostTime;
                                var month=parseInt(time.substr(4,2));
                                var day=parseInt(time.substr(6,2));
                                var year=parseInt(time.substr(0,4));
                                var hour=parseInt(time.substr(8,2));
                                var minute=parseInt(time.substr(10,2));
                                var resJson={"blogId":res[i].blogId,"blogTitle":res[i].blogTitle,"blogCon":res[i].blogCon,"blogTime":res[i].timie};
                                createEle(res[i].blogImg,res[i].blogTitle,res[i].blogCon,month,day,year,hour,minute);
                                $(".essay").eq(i).attr("index",res[i].blogId);
                            }
                            saveSessionStorage("isOnload","");
                        }
                    }
                });
            }

        })();

       //点击上传文件获取文件名
        $("#file").bind("change",function (){
            var res=$(this).val().split("\\");
            path=res[(res.length-1)];
            return path;
        });
       //获取博客发表的时间
       var months=["January","February","March","April","May","June","July","August","September","October","November","December "];
       var date=new Date();
       var month=(date.getMonth() +1)>9?date.getMonth()+1+"":"0"+date.getMonth() +1;
       var day=(date.getDate())>9?date.getDate()+"":"0"+date.getDate();
       var year=""+date.getFullYear();
       var hour=(date.getHours())>9?date.getHours():"0"+date.getHours();
       var minute=(date.getMinutes())>9?date.getMinutes():"0"+date.getMinutes();

       //发表博客请求 先去查询数据库中有无此人 看此人是否有权限去发表博文
       $("#btn_fabiao").click(function () {
           //检查用户是否登录，如果未登录，显示登录框
           var title = $("#blog_title").val();
           var con = $("#blog_con_input").val();
           var time = month + year + day + hour + minute;
           $.ajax({
               method: "get",
               url: "../../xmbk/php/quanxian.php",
               success: function (res) {
                   console.log(res);
                   if (res == 1) {
                       $.ajax({
                           method: "post",
                           url: "../../xmbk/php/insert.php",
                           data: {
                               time: time,
                               path: path,
                               title: title,
                               con: con,
                           },
                           success: function (res) {
                               console.log(res);
                               if (res == 1) {
                                   createEle(path, title, con, months[month - 1], day, year, hour, minute);
                               }
                           }
                       });
                   }
                   else {
                       $(".login_div").show();
                   }
               },
               error:function (res){
                   console.log(2);
                   console.log(res);
               }
           });
       })

       //动态创建DOM元素并添加到页面中去显示
        function createEle(path,title,con,month,day,year,hour,minute){
            var left = $(".left");
            var essay = $("<div class='essay'></div>");
            var opration_div=$("<div class='operation_div'></div>");
            var contents = $("<div class='contents'></div>");
            $("<div class='image'></div>").append('<img src="http://localhost/xmbk/image/'+path+'">').appendTo(essay);
            var caption = $("<div class='caption'></div>");
            $("<h2>"+title+"</h2>").appendTo(caption).bind("click",function (){
                location.href="../html/blogDetail.html"+"\?title="+title+"&con="+con;
            });
            $("<b>" + month+ ' ' + day + ',' + year + ' at ' + hour + ':' + minute + "</b>").appendTo(caption);
            var sub = $("<div class='substance effect'></div>");
            $("<p></p>").append("<a href='#'>" + con + "</a>").appendTo(sub);
            //jquery给动态生成的元素在创建时就要绑定事件
            $("<span><i class='iconfont'>&#xf013f;</i></span>").appendTo(opration_div).bind("click",function (){
                var id=parseInt($(this).parent().parent().attr("index"));
                $(this).parent().parent().remove();
                $.ajax({
                    method:"post",
                    url:"../../xmbk/php/delete.php",
                    data:{
                        blogId:id
                    },
                    success:function (res){
                        console.log(res);
                        if(res==1){
                            return true;
                        }
                    }
                });
            });
            //修改博客的请求
            $("<span><i class='iconfont'>&#xf0022;</i></span>").appendTo(opration_div).bind("click",function (){
                var id=parseInt($(this).parent().parent().attr("index"));
                location.href="../html/editBlog.html\?title="+title+"&con="+con+"&blogId="+id;
            });
            opration_div.appendTo(essay);
            caption.appendTo(contents);
            sub.appendTo(contents);
            contents.appendTo(essay);
            essay.appendTo(left);
            $("#blog_title").val("");
            $("#blog_con_input").val("");
            showText(con);
        }

        //博客内容超过100各自多余的以省略号显示
        function showText(value){
            if(value.length>106){
                value=value.substr(0,106)+"...";
            }
            return value;
         }

        $("#btn_search").click(function (){
        });

});