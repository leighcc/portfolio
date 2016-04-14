(function ($) {
	$.fn.extend({
		rippleBtn: function () {
			return this.each(function () {
				var me = $(this);

				me.on("click",function (e) {
					var x = e.pageX - me.offset().left,
						y = e.pageY - me.offset().top,
						ripple = $("<span class='ripple'></span>");

					ripple.css({
						left: x - 2,
						top: y -2
					});

					me.append(ripple);

					ripple.on("animationend",function () {
						ripple.remove();
					});
				});
			});
		}
	});
})(jQuery);

$(".btn").rippleBtn();