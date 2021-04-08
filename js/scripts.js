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



	// Values
	if ($(window).width() < 576) {
		let valuesList = $('.values-section .value-card');

		let lastId;

		// Bind to scroll
		$(window).scroll(function() {
			let fromTop = $(this).scrollTop() + $(window).height() * 0.5 + $(this).scrollTop() * 0.3;

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
				valuesList.removeClass("active");
				$(cur).addClass("active");
			// }
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
				$(this).siblings('.selected-file').find('.file-name').text(e.target.files[0].name);
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
	$('input[type="tel"]').mask("+99 999 999 99 99", {autoclear: false});

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