$(function (){
        var Show=function (){};
        var time=1000;
        Show.prototype={
        	constructor:Show,
        	load:function (show){
        		setTimeout(function (){
        			$(".text-content").append("<p class='each-line'>"+show+"</p>");
        		},time);
        		time+=1000;
        	},
        	/*setStyle:function (className,styles,seconds){
        		var seconds=seconds;
        		for(var key in styles){
        			(function (key){
        				time+=seconds;
        				setTimeout(function (){
        					$('.'+className).css(key,styles[key]);
        				},time);
        			})(key);
        		}
        	}*/
        };
        var show = new Show();
        show.load("如果你有抱怨世界的不公平");
        show.load("请先放下你的抱怨");
        show.load("哪里有什么绝对公平");
        show.load("如果真的有 那也只能是时间");
        show.load("与时间做朋友");
        show.load("时间对待每个人是最公平的");
        show.load("它不会给你多一分钟 也不会给我少一秒钟");
        show.load("它不会停下来去等某一个人");
        show.load("所以 掌握好你的每一分每一秒");
        $(document).mouseover(function (){
        	$(".body_ceng").css("display","block");
        });
        setInterval(function(){
            var date=new Date();
            var hour=(date.getHours())<9?"0"+date.getHours():date.getHours();
            var minute=(date.getMinutes())<9?"0"+date.getMinutes():date.getMinutes();
            var second=(date.getSeconds())<9?"0"+date.getSeconds():date.getSeconds();
            $(".hour").text(hour);
            $(".minute").text(minute);
            $(".second").text(second);
		},100);
});