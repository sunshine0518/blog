$(function () {
    //设置cookie
    function setCookie(name, value, iDay) {
        var oDate = new Date();
        oDate.setDate(oDate.getDate() + iDay*24*60*60*1000);
        document.cookie = name + '=' + value + ';expires=' + oDate;
    }

    //获取cookie
    function getCookie(name) {
        var arr = document.cookie.split('; ');
        for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('=');
            if (arr2[0] == name) {
                return arr2[1];
            }
        }
        return '';
    }

    //删除cookie
    function removeCookie(name) {
        setCookie(name, 1, -1);
    }

    //点击登录按钮数据库查询此人是否有权限登录，同时让登录成功或者失败的弹出框显示
    $(".login").click(function () {
        $(".login_div").show();
        $(".btn_login").click(function () {
            var userName = $(".userName").val();
            var pwd = $(".pwd").val();
            var isRemember=$(".rememberCheck").attr("checked");
            $.ajax({
                method: "post",
                data: {
                    userName: userName,
                    pwd: pwd
                },
                url: "../../xmbk/php/selectUser.php",
                success: function (res) {
                    console.log(res);
                    if(res==1){
                        $(".successDiv").show();
                        $(".login_div").hide();
                        if( isRemember){
                            setCookie("userName",userName,7);
                            setCookie("pwd",pwd,7);
                        }else{
                            setCookie("userName",userName,0);
                            setCookie("pwd",pwd,0);
                        }
                    }
                    else{
                        $(".failDiv").show();
                        $(".login_div").hide();
                    }
                },
                error: function (res) {
                    console.log(res);
                }
            });
        });
    });
    $(".logout").click(function (){
        $.ajax({
            method:"get",
            url:"../../xmbk/php/destorySession.php",
            success:function(res){
                console.log(res);
            }
        });
    });
    //发表博客页面进行登录验证
    $(".btn_login").click(function () {
        var userName = $(".userName").val();
        var pwd = $(".pwd").val();
        var isRemember=$(".rememberCheck").attr("checked");
        $.ajax({
            method: "post",
            data: {
                userName: userName,
                pwd: pwd
            },
            url: "../../xmbk/php/selectUser.php",
            success: function (res) {
                console.log(res);
                if(res==1){
                    $(".successDiv").show();
                    $(".login_div").hide();
                    if( isRemember){
                        setCookie("userName",userName,7);
                        setCookie("pwd",pwd,7);
                    }else{
                        setCookie("userName",userName,0);
                        setCookie("pwd",pwd,0);
                    }
                }
                else{
                    $(".failDiv").show();
                    $(".login_div").hide();
                }
            },
            error: function (res) {
                console.log(res);
            }
        });
    });

    //登录成功后点击确定弹出框消失
    $(".login_fail").click(function () {
        $(".failDiv").hide();
    });
    ////登录失败后点击确定弹出框消失
    $(".success").click(function () {
        $(".successDiv").hide();
    });
});
