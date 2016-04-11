;(function ($) {
	$.fn.slideShow = function (opt) {
		var defaults = {
			"autoPlay": true,
			"autoPlayTime": 2000,
			"eType": "click"
		};

		$.extend(defaults,opt);

		return this.each(function () {
			var me = $(this),
				ul = me.find("ul"),
				nav = me.find(".nav span"),
				oneWidth = ul.find("li").eq(0).width(),
				timer = null,
				iNow = 0;

			if (defaults.autoPlay) {
				autoPlay();

				ul.hover(function () {
					clearInterval(timer);
				},autoPlay);
			}

			nav.on(defaults.eType,function () {
				var me = $(this),
					index = me.index();

				iNow = index;

				ul.animate({
					"left": -oneWidth * iNow
				});

				nav.removeClass("active");
				me.addClass("active");
			});

			function autoPlay () {
				timer = setInterval(function () {
					iNow++;
					if (iNow > nav.length - 1) {
						iNow = 0;
					}
					nav.eq(iNow).trigger(defaults.eType);
				},defaults.autoPlayTime);
			}
		});
	};
})(jQuery);