require('../css/common.css');

$(function() {
	var num = $("#count-down span b").text();
	var timer;
	$(".jump").click(function() {
		login();
	})
	//判断倒计时
	//定时器
	timer = setInterval(function(){
        if(num >1){
            num--;
            $("#count-down span b").text(num)
        }else {
        	clearInterval(timer);
        	login();
        }  
    },1000);  

	//logo页面
	function login() {
		$("#count-down").fadeOut(800);
		
	};
	//登录
	$(".login-content .login").click(function() {
		var _mobile = $.trim($(".mobile").val()),
            _psd = $.trim($(".password").val());
        var data ={
            mobile:_mobile,
            psd:_psd
        };
        if(!_mobile|| !_psd|| $(".error-tip").is(":visible")) {
        	if($(".msg-tip").css("right")>='0') return;
			$(".msg-tip").animate({'right':'0'},300);
        }else {
        	window.location.href='index.html';
            // $.ajax({
            //     type: "POST", //请求方式
            //     url: "http://localhost:3000/form_info", //请求路径
            //     async: true, //异步
            //     data: data,  //传参
            //     dataType: 'json', //返回值类型
            //     success: function (msg) {
            //         if(msg.code =='200'){
            //             window.location.href='index.html';
            //         }
            //     },
            //     error: function () {
            //     }
            // });
        }   
	});
	//失去焦点
	$(".login-content .mobile").blur(function(){
        var cur = $(this);
        var value = cur.val();
        var filter  = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;  //正则
        /*if(value ==''){
            $(this).siblings(".error-tip").slideDown().text("手机号码不能为空");
        }else if(!filter.test(value)){   //正则匹配
             $(this).siblings(".error-tip").slideDown().text("手机号码输入错误");
        }else {
            $(this).siblings(".error-tip").slideUp();
        };*/
        checkTip(cur,value,filter,'手机号码不能为空','手机号码输入错误');
    });
    $(".login-content .password").blur(function(){
        var cur = $(this);
        var value = cur.val();
        var filter  = /^[a-zA-Z]\w{5,17}$/;  //正则
       /* if(value ==''){
            $(this).siblings(".error-tip").slideDown().text("密码不能为空");
        }else if(!filter.test(value)){   //正则匹配
             $(this).siblings(".error-tip").slideDown().text("密码输入错误");
        }else {
            $(this).siblings(".error-tip").slideUp();
        };*/
        checkTip(cur,value,filter,'密码不能为空','密码输入错误');
    });
    //公共方法
    function checkTip (cur,value,filter,text1,text2) {
    	if(value ==''){
            cur.siblings(".error-tip").slideDown().text(text1);
        }else if(!filter.test(value)){   //正则匹配
             cur.siblings(".error-tip").slideDown().text(text2);
        }else {
            cur.siblings(".error-tip").slideUp();
        };
    }
    //1、成为焦点  
    $(".login-content .panel input").on('focus',function(){
        $(this).siblings(".error-tip").slideUp();  //find()   next()   siblings()
        $(".msg-tip").animate({'right':'-50%'},300);
    });


    //轮播
 	var index = 0,len =$(".banner img").length;
 	$(".banner img").eq(0).show().siblings("img").hide();
 	var circle = $(".banner-circle").width();
 	$(".banner-circle").css('margin-left',-(circle*0.5)+'px');
 	//setInterval(函数名，时间);
 	setInterval(banner,3000);
 	function banner(){
 		index ++;   //01234...
 		if(index == len){   //=赋值 ==判断 ===判断（全等）类型判断    4==‘4’（true)   4==='4'(false)
 			index=0;
 		}
 		$(".banner img").eq(index).show().siblings("img").hide();
 		$(".banner-circle ul li").removeClass().eq(index).addClass("selected");
 	};

})