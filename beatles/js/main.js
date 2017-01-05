AOS.init({
  duration: 500,
});

// smooth scroll
$('a[href*="#"]:not([href="#"])').on("click", function() {
	if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		if (target.length) {
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 500);
		}
	}
});

// var controller = new ScrollMagic.Controller(),
// 	triggerPosition = window.innerHeight / 2 - 41;

// // toggle navToggle button background color
// new ScrollMagic.Scene({
// 	triggerElement: "#gallery",
// 	offset: triggerPosition
// })
// 	.setClassToggle("#navToggle-icon", "navToggle-icon-reverse") // add class toggle
// 	.addTo(controller);