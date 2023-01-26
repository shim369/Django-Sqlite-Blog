$(function(){
	let nav = $('.l-header__list');
	nav.clone().appendTo('.l-header__menu');
	let iconNav = $('.l-header__icons');
	iconNav.clone().appendTo('.l-header__menu');
});

$(function(){
	let $body = $('body');
	$('.l-header__menu-btn').on('click', ()=>{
		$body.toggleClass('side-open');
	});
	$('.l-header__menu').on('click', ()=>{
		$body.removeClass('side-open');
	});
});

function PageTopAnime() {
	let scroll = $(window).scrollTop();
	if (scroll >= 200){
		$('#page-top').removeClass('right-move');
		$('#page-top').addClass('left-move');
	} else {
		if($('#page-top').hasClass('left-move')){
			$('#page-top').removeClass('left-move');
			$('#page-top').addClass('right-move');
		}
	}
}

$(window).scroll(()=>{
	PageTopAnime();
});

$('#page-top').click(()=>{
	$('body,html').animate({
		scrollTop: 0
	}, 500);
	return false;
});

$(function(){
	$(".p-hero__slideshow li").css({"position":"relative","overflow":"hidden"});
	$(".p-hero__slideshow li").hide().css({"position":"absolute","top":0,"left":0});
	$(".p-hero__slideshow li:first").addClass("fade").show();
	setInterval(function(){
	  let $active = $(".p-hero__slideshow li.fade");
	  let $next = $active.next("li").length?$active.next("li"):$(".p-hero__slideshow li:first");
	  $active.fadeOut(3000).removeClass("fade");
	  $next.fadeIn(3000).addClass("fade");
	},4000);
  });