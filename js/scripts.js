document.addEventListener('DOMContentLoaded', function(){

	const isRTL = $('html').attr('dir') == 'rtl';
	const isMobile = $(window).width() < 992;

	if (isRTL) {
		$('.wpcf7').attr('dir','rtl');
	} else{
		$('.wpcf7').attr('dir','ltr');
	}

	function is_touch_device() {
		try {
			document.createEvent("TouchEvent");
			return true;
		} catch (e) {
			return false;
		}
	}

	if(is_touch_device()){
		$('body').addClass('touch');
	} else{
		$('body').addClass('no-touch');
	}

	// Home page autoplay
	if ($(window).width() >= 768) {
		$('.home-section .section-grid').each(function(i, cmp){
			let currentItem = 0;
			let items = $(cmp).find('.info-card');
			let duration = 5000;
			let step = 100;
			let currentTime = 0;

			items.append('<div class="bar"></div>').find('.bar').css({
				'opacity': 0
			});

			function calcWidth(current, total){
				return (current * 100 / total) + "%";
			}

			function addBar(item){
				item.find('.bar').css({
					'opacity': 1
				});

				item.addClass('current').siblings().removeClass('current');
			}

			function removeBar(item){
				item.blur();
				item.find('.bar').css({
					'opacity': 0
				});

				setTimeout(function(){
					item.find('.bar').css({
						'width': 0
					});
				}, 100);
			}

			function goToNextItem(){
				removeBar(items.eq(currentItem));

				currentItem++;

				if (currentItem >= items.length) {
					currentItem = 0;
				}

				let videoId = items.eq(currentItem).data('video-bg');
				$(videoId).addClass('visible').siblings().removeClass('visible');

				addBar(items.eq(currentItem));
			}

			let timer;
			function startTimer(){
				addBar(items.eq(currentItem));
				currentTime = 0;

				timer = setInterval(function(){
					currentTime += step;

					items.eq(currentItem).find('.bar').width(calcWidth(currentTime, duration));

					if (currentTime > duration) {
						currentTime = 0;
						goToNextItem();
					}
				}, step);
			}

			items.hover(function(){
				clearInterval(timer);
				currentTime = 0;
				removeBar(items.eq(currentItem));
				currentItem = +$(this).data('id');
				addBar(items.eq(currentItem));
			}, function(){
				startTimer();
			});

			setTimeout(function(){
				startTimer();
			}, 300);
		});
	}

	// Select Field
	jcf.setOptions('Select', {
		wrapNative: false,
		wrapNativeOnMobile: true,
		fakeDropInBody: true
	});

	jcf.replace( $('.select-field select') );

	// Values
	if ($(window).width() < 576) {
		let valuesList = $('.values-section .value-card');

		// $('.values-section .section-grid').slick({
		// 	vertical: true,
		// 	verticalSwiping: true,
		// 	centerMode: true,
		// 	centerPadding: '50%',
		// 	// swipe: false,
		// 	focusOnSelect: true,
		// 	infinite: false,
		// 	initialSlide: 1,
		// 	slidesToShow: 1,
		// 	swipeToSlide: true,
		// 	slidesToScroll: 1,
		// 	rtl: isRTL
		// });

		let lastId;

		// Bind to scroll
		$(window).scroll(function() {
			let fromTop = $(this).scrollTop() + $(window).height() * 0.5 + $(this).scrollTop() * 0.1;

			let cur = valuesList.map(function() {
				if ($(this).offset().top < fromTop){
					// if ($(this).offset().top + $(this).outerHeight() > $(window).scrollTop() + $(window).height()) {
						return this;
					// }
				}
			});

			cur = cur[cur.length - 1];

			// if (lastId !== id) {
				// lastId = id;
				// valuesList.removeClass("active");
				// $(cur).addClass("active");
			// }
		});

		$('.value-card').eq(0).addClass('active');


		$('.value-card').click(function(){
			$('html, body').animate({
				scrollTop: $(this).offset().top + 60 - ($(window).height() - 60) / 2 - $(this).outerHeight() / 2
			}, 500);

			$(this).addClass("active").siblings().removeClass('active');
		});

	}

	// Cookies
	// console.log(localStorage.getItem('cookies'));
	if (localStorage.getItem('cookies') == null) {
		// 0 - declined
		// 1 - accepted
		// null - first visit; not clicked

		let cookiesBlock = $('.cookies-info-block');

		cookiesBlock.addClass('visible');

		cookiesBlock.find('.js-decline').click(function(e){
			e.preventDefault();

			cookiesBlock.removeClass('visible');
			localStorage.setItem('cookies', '0');
		});

		cookiesBlock.find('.js-accept').click(function(e){
			e.preventDefault();

			cookiesBlock.removeClass('visible');
			localStorage.setItem('cookies', '1');
		});
	}

	// Contacts Page
	$('.js-show-map').click(function(e){
		e.preventDefault();

		$(this).closest('.contact-us-section').addClass('map-opened');
	});

	$('.js-map-close').click(function(e){
		e.preventDefault();

		$(this).closest('.contact-us-section').removeClass('map-opened');
	});

	// Home section bg
	$('.home-section').each(function(i, cmp){
		// let changeInterval = setInterval(function(){
		// 	$(cmp).find('video.visible');
		// }, 5000);

		$(cmp).find('[data-video-bg]').on('mouseenter focus', function(e){
			let videoId = $(this).data('video-bg');

			$(videoId).addClass('visible').siblings().removeClass('visible');
		});

		$(cmp).find('[data-video-bg]').eq(0).trigger('mouseenter');
	});

	// Main Nav
	$('.main-nav .big-menu-link').on('mouseenter focus', function(e){
		$(this).find('video')[0].play();
	});

	$('.main-nav .big-menu-link').on('mouseleave blur', function(e){
		$(this).find('video')[0].pause();
	});

	function getMaxOfArray(numArray) {
		return Math.max.apply(null, numArray);
	}

	// Fields
	$('.input-wrapper input').on('change keyup', function(e){
		if ($(this).val() !== '') {
			$(this).addClass('not-empty');
		} else{
			$(this).removeClass('not-empty');
		}
	});

	$('.select-field select').on('change', function(e){
		$(this).addClass('selected');
	});

	$('.file-input').each(function(e){
		$(this).find('.selected-file').click(function(e){
			e.preventDefault();
			e.stopPropagation();
		});

		$(this).find('input[type="file"]').on('change', function(e){
			e.preventDefault();
			
			if (!!e.target.files[0]) {
				$(this).parent().addClass('selected');

				let names = [];

				$(e.target.files).each((i, item) => {
					names.push(item.name);
				});

				$(this).siblings('.selected-file').find('.file-name').text(names.join(', ') );
			} else{
				$(this).parent().removeClass('selected');
				$(this).siblings('.selected-file').find('.file-name').text(btnText);
			}
		});

		$(this).find('.reset-field').click(function(e){
			e.preventDefault();

			$(this).closest('.file-input').removeClass('selected').find('input[type="file"]').val(null);
		});
	});

	// Forms
	$('form').on('submit', function(e){
		e.preventDefault();
		let thankYou = $(this).closest('.section-form').find('.form-thank-you');
		thankYou.addClass('visible');

		setTimeout(function(){
			thankYou.removeClass('visible');
		}, 4000);
	});

	// Input mask
	$('.phone-mask').mask("+999999999999", {autoclear: false});

	// Sliders
	function equalSlideHeight(slider){
		$(slider).on('setPosition', function () {
			$(this).find('.slick-slide').height('auto');
			var slickTrack = $(this).find('.slick-track');
			var slickTrackHeight = $(slickTrack).height();
			$(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
		});
	}

	let arrowsButtons = {
		prevArrow: '<button type="button" class="slick-prev" aria-label="Предыдущий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 17"><path d="M10 2L8 0 0 8.2l8 8.2 2-2-6.2-6.2L10 2z"/></svg></button>',
		nextArrow: '<button type="button" class="slick-next" aria-label="Следующий"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 17"><path d="M0 2l2-2 8 8.2-8 8.2-2-2 6.2-6.2L0 2z"/></svg></button>'
	}

	if ($(window).width() < 768) {
		$('.home-section .section-grid').on('beforeChange', function(event, slick, currentSlide, nextSlide){
			$('.home-section [data-slick-index='+nextSlide+']').trigger('mouseenter').trigger('mouseleave');
		});

		$('.home-section .section-grid').slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			dots: false,
			infinite: true,
			speed: 600,
			centerMode: true,
			centerPadding: 0,
			autoplay: true,
			autoplaySpeed: 5000,
			rtl: isRTL
		});

		equalSlideHeight('.home-section .section-grid');
	}

	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		if ($.attr(this, 'href') === '#') {
			return false;
		}

		let offset = 72;

		if ($(window).width() < 992) {
			offset = 56;
		}

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - offset
		}, 500);
	});

	// Menu opener
	$('.menu-opener').click(function(e){
		e.preventDefault();

		$('.menu-opener').toggleClass('active');
		$('.main-nav').toggleClass('nav-opened');
		$('.header').toggleClass('nav-opened');
	});

	// Sticky Header
	function stickyHeader(){
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 0
				? header.classList.add('sticky')
				: header.classList.remove('sticky');
		};
	}


	window.addEventListener('scroll', stickyHeader);
	setTimeout(stickyHeader, 100);
});

function showCookiesBlock(){
	$('.cookies-info-block').addClass('visible');
}

// Enquiry form
$(document).ready(function(){
	let currentStep = 1;

	function goToStep(step, context){
		$(context).attr('data-current-step', step);

		$(context).find('.js-step-description').text( $('#step-' + step).data('step-description') );
		$(context).find('.js-current-step').text( step );

		$('#step-' + step).addClass('current');

		$(context).find('.steps-list').height( $('#step-' + step).outerHeight() );
	}

	$('.js-enquiry-scope').each(function(i, cmp){
		goToStep(currentStep, cmp);

		$(cmp).find('.js-next').click(function(e){
			e.preventDefault();

			if (currentStep == 3) {
				return;
			}

			goToStep(++currentStep, cmp);
		});

		$(cmp).find('.js-back').click(function(e){
			e.preventDefault();

			if (currentStep == 1) {
				return;
			}

			goToStep(--currentStep, cmp);
		});

		$(cmp).find('.js-send').click(function(e){
			$(cmp).find('.enquiry-form').submit();
		});
	});
});