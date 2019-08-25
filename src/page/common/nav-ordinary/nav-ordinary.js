$(document).ready(function(){
	// 点开设置
	$("#js-nav-set").bind("touchend", function(){
		MenuButClose()
		$("#js-nav-two").css("display", "flex");
		$("body").css("overflow", "hidden");
	});
	
	// 关闭设置
	$("#js-nav-two").bind("touchend", function(){
		SetButClose();
	});
	
	// 关闭设置函数
	function SetButClose(){
		$("#js-nav-two").hide();
		$("body").css("overflow", "");
		$("#js-nav-two").find(".option-bok").removeClass("select-f-but");
		$("#js-nav-two").children(".option-bok").children(".select-bok").hide();
	}
	
	
	$("#js-nav-two").children(".option-bok").bind("touchend", function(e){
		e.stopPropagation();
		$("#js-nav-two").children(".option-bok").children(".select-bok").hide();
		$(this).children(".select-bok").show();
		$("#js-nav-two").find(".option-bok").removeClass("select-f-but");
		$(this).addClass("select-f-but");
	});
	
	// 点开菜单
	$("#js-nav-menu").bind("touchend", function(){
		SetButClose()
		$("#js-nav-three").show();
	})
	
	// 点开二级菜单
	$("#js-three-menu").children("li").bind("touchend", function(){
		$("body").css("overflow", "hidden");
		$("#js-three-menu").find(".menu").hide();
		if($(this).children(".menu").is(":visible")){
			$(this).children(".menu").hide();
			$(this).children("a").removeClass("select-f-down");
		}else{
			$(this).children(".menu").show();
			$("#js-three-menu").find("a").removeClass("select-f-down");
			$(this).children("a").addClass("select-f-down");
		}
	});
	
	// 关闭菜单
	$("#js-three-close").bind("touchend", function(){
		MenuButClose();
	})
	
	// 关闭菜单函数
	function MenuButClose(){
		$("#js-nav-three").hide();
		$("body").css("overflow", "");
		$("#js-three-menu").find("a").removeClass("select-f-down");
		$("#js-three-menu").find(".menu").hide();
	}
})
