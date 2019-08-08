//60s重新发送   
    var countdown=60; 
    var setI;
    function settime() {        
        if (countdown == 0) {           
            $("#sms_text span").html('<a href="javascript:void(0);" onclick="get_sms_captcha(\'1\')" ><i class="icon-mobile-phone"></i>发送短信验证</a>');        
            $('.nc-login-form .tiptext a').css('background-color','#21b384');
            countdown = 60; 
            clearInterval(setI);
        } else {        
            $("#sms_text span").html('<a href="javascript:void(0);" ><i class="icon-mobile-phone"></i>重新发送短信('+countdown+' 秒)</a>');
            $('.nc-login-form .tiptext a').css('background-color','#bfd0ca');
            countdown--; 
        } 
    }
/* 手机注册JS
*/
	function get_sms_captcha(type){
        if(type==1){
            $('._code_eorr').html('');
            var image_captcha=$("#image_captcha").val();    
            var phone=$("#phone").val();
            if(phone==""||phone=="请输入手机号码"){            
                $('._code_eorr').html('<i class="icon-warning-sign"></i>请输入手机号码');
                $("#phone").focus();
                return;
            }
            if(image_captcha==""||image_captcha=="输入验证码"){          
                $('._code_eorr').html('<i class="icon-warning-sign"></i>请输入验证码');
                $("#image_captcha").focus();
                return;
            }
        }   
        if($("#phone").val().length == 11 && $("#image_captcha").val().length == 4){
			var nchash=$('#sms_codeimage').attr('data-nc');
            var ajaxurl = 'index.php?act=connect_sms&op=get_captcha&nchash='+nchash+'&type='+type;
            ajaxurl += '&captcha='+$('#image_captcha').val()+'&phone='+$('#phone').val();
			$.ajax({
				type: "GET",
				url: ajaxurl,
				async: false,
				success: function(rs){
                    if(rs == 'true') {
                    	//$("#sms_text").html('短信动态码已发出');
                        setI=setInterval ("settime()", 1000);
                    } else {
                        //alert(111);
                        document.getElementById('sms_codeimage').src='index.php?act=seccode&op=makecode&type=50,120&nchash='+nchash+'&t=' + Math.random();

                        showError(rs);
                    }
			    }
			});
    	}
	}
	function check_captcha(){
        if($("#phone").val().length == 11 && $("#sms_captcha").val().length == 6){
            var ajaxurl = 'index.php?act=connect_sms&op=check_captcha';
            ajaxurl += '&sms_captcha='+$('#sms_captcha').val()+'&phone='+$('#phone').val();
			$.ajax({
				type: "GET",
				url: ajaxurl,
				async: false,
				success: function(rs){
            	    if(rs == 'true') {
            	        $.getScript('index.php?act=connect_sms&op=register'+'&phone='+$('#phone').val());
            	        $("#register_sms_form").show();
            	        $("#post_form").hide();
            	    } else {
            	        showError(rs);
            	    }
			    }
			});
    	}
	}