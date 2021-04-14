document.addEventListener('DOMContentLoaded', function(){

	// Header
	gsap.from(".header", {opacity: 0, y: -100, duration: 0.3});


	const isRTL = $('html').attr('dir') == 'rtl';
	const direction = isRTL ? -1 : 1;
	const isMobile = $(window).width() < 992;

	// Home
	if($('.home-section').length > 0){
		let homePageTL = gsap.timeline({
			scrollTrigger: {
				trigger: ".home-section",
				// scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar,
				// markers: true,
			},
			delay: 0.2
		});

		let selector = '.section-grid, .info-card .card-caption, .info-card p';

		if (isMobile) {
			selector = '.section-grid';
		}

		homePageTL
			.from('.big-caption', { opacity: 0, y: 100, duration: 0.5}, 0.3)
			.from(selector, {
				stagger: 0.1,
				y: 100,
				duration: 0.5,
				opacity: 0
			}, "-=0.3")
			.from('.footer-block', {
				stagger: 0.2,
				y: 100,
				duration: 0.5,
				opacity: 0
			}, "-=0.5");
	}

	// Values
	if($('.values-section').length > 0 && $(window).width() >= 576){
		let valuesTL = gsap.timeline({
			scrollTrigger: {
				trigger: ".values-section",
				// scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar,
				// markers: true,
			}
		});

		valuesTL
			.from('.section-content', { opacity: 0, x: -100 * direction, duration: 0.5}, 0.3)
			.from('.value-card', {
				stagger: 0.1,
				y: 100,
				duration: 0.5,
				opacity: 0
			}, "-=0.5");

		$(".value-card").hover(
			function() {
				let scale = 1.51;

				if ($(window).width() < 1200) {
					scale = 1.2;
				}

				gsap.to($(this).find('.card-text'), 0.3, {
					scale: scale,
					y: $(this).is(':nth-child(even)') ? '4.7222vw' : 0
				});

				let shiftX = 3;

				gsap.to($(this).find('.card-icon'), 0.3, {
					opacity: 1,
					y: $(this).is(':nth-child(odd)') ? '-9vw' : '0vw',
					x: isRTL ? `3vw` : `-3vw`
				});

				$(this).addClass('hover');
				$(this).siblings().addClass('faded');

				if ($(this).is(':nth-child(even)')) {
					$(this).prev().addClass('small');
				} else{
					$(this).next().addClass('small');
				}
			},
			function() {
				gsap.to($(this).find('.card-text'), 0.3, {
					scale: 1,
					y: 0
				});

				gsap.to($(this).find('.card-icon'), 0.3, {
					opacity: 0,
					y: 0,
					x: 0
				});

				$(".value-card").removeClass('hover faded small');
			}
		);
	}

	// How we work
	if($('.how-we-work-section').length > 0){
		let howWorkTL = gsap.timeline({
			scrollTrigger: {
				trigger: ".how-we-work-section",
				// scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar,
				// markers: true,
			}
		});

		howWorkTL
			.from('.how-we-work-section .section-caption, .how-we-work-section .section-text, .how-we-work-section .section-footer', { opacity: 0, x: -100 * direction, duration: 0.8, stagger: 0.2}, '+=0.1');


		// Path section
		let pathTL = gsap.timeline({
			scrollTrigger: {
				trigger: ".path-section",
				// scrub: 1, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar,
				// markers: true,
			}
		});

		pathTL
			.from('.path-section .section-caption', { opacity: 0, x: -100 * direction, duration: 0.5, stagger: 0.1}, 0.3);

		$('.step-card').each(function(){
			gsap.from(this, {
				scrollTrigger: {
					trigger: this,
					start: 'top 80%'
				},
				x: -100 * direction,
				opacity: 0,
				duration: 0.5
			});
		});


		// get-started-section
		gsap.from('.no-coin', {
			scrollTrigger: {
				trigger: '.no-coin',
				start: 'top 80%',
			},
			x: -100,
			opacity: 0,
			duration: 1
		});

		gsap.from('.with-coin', {
			scrollTrigger: {
				trigger: '.with-coin',
				start: 'top 50%',
			},
			x: 100,
			opacity: 0,
			duration: 1
		});
	}

	// Sectors
	if ($('.sectors-section').length > 0) {
		gsap.from('.section-caption', { opacity: 0, x: -100 * direction, duration: 0.5}, '+=0.2');
		gsap.from('.sector-card', { opacity: 0, y: 100, duration: 0.8, stagger: 0.2}, '+=0.3');
	}

	// Sectors
	if ($('.about-section').length > 0) {
		gsap.from('.section-caption, .section-text', { opacity: 0, x: -100 * direction, duration: 0.5, stagger: 0.2}, '+=0.2');
		gsap.from('.section-image', { opacity: 0, x: 100 * direction, duration: 0.5}, '+=0.3');
	}


	// add animations and labels to the timeline
	// homePageTL.addLabel("start")
	// 	.from(".box p", {scale: 0.3, rotation:45, autoAlpha: 0})
	// 	.addLabel("color")
	// 	.from(".box", {backgroundColor: "#28a92b"})
	// 	.addLabel("spin")
	// 	.to(".box", {rotation: 360})
	// 	.addLabel("end");
});