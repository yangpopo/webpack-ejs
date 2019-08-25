import '../common/nav-ordinary/nav-ordinary.js';
import './index.scss';

$(function(){
  	var mySwiper = new Swiper ('.swiper-container', {
		autoplay:{
			delay:3000
		},
  		wrapperClass : 'my-wrapper',
	    pagination: {
	      el: '.swiper-pagination',
	      clickable: true,
	    },
 	});
 	
 	$("#js-more-but").bind("touchstart", function(){
 		$("#js-essay-bok").css("height","auto");
 		$(this).hide()
 	})
});