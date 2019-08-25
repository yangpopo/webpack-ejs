$(document).ready(function(){
	// 点开设置
	$("#js-nav-set").bind("touchstart", function(){
		$("#js-nav-two").css("display", "flex");
		$("body").css("overflow", "hidden");
	});
	
	// 关闭设置
	$("#js-nav-two").bind("touchstart", function(){
		$(this).hide();
		$("body").css("overflow", "");
		$("#js-nav-two").find(".option-bok").removeClass("select-f-but");
		$("#js-nav-two").children(".option-bok").children(".select-bok").hide();
	});
	
	$("#js-nav-two").children(".option-bok").bind("touchstart", function(e){
		e.stopPropagation();
		$("#js-nav-two").children(".option-bok").children(".select-bok").hide();
		$(this).children(".select-bok").show();
		$("#js-nav-two").find(".option-bok").removeClass("select-f-but");
		$(this).addClass("select-f-but");
	});
	
	$("#js-nav-menu").bind("touchstart", function(){
		$("#js-nav-three").show();
	})
	
	// 点开菜单
	$("#js-three-menu").children("li").bind("touchstart", function(){
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
	$("#js-three-close").bind("touchstart", function(){
		$("#js-nav-three").hide();
		$("body").css("overflow", "");
		$("#js-three-menu").find("a").removeClass("select-f-down");
		$("#js-three-menu").find(".menu").hide();
	})
})
