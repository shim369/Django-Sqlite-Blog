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