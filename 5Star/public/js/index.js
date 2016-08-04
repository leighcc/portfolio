var slip = Slip(document.getElementById('container'), 'y').webapp(),
	Pages = document.getElementsByClassName('page');

slip.end(function () {
	for (var i = 0; i < Pages.length; i++) {
		removeClass(Pages[i], 'page-active');
	}
	addClass(Pages[this.page], 'page-active');
});

// 显示评价详情
(function () {
	var Buttons = document.getElementsByClassName('page-4')[0].getElementsByClassName('btn'),
		Mask = document.getElementsByClassName('page-4')[0].getElementsByClassName('mask')[0];

	Buttons[0].onclick = function () {
		Mask.style.display = 'block';
	}

	Buttons[2].onclick = function () {
		Mask.style.display = 'none';
	}
})();

function hasClass(element, className) {
    var classNames = element.className;
    if (!classNames) {
        return false;
    }
    classNames = classNames.split(/\s+/);
    for (var i = 0, len = classNames.length; i < len; i++) {
        if (classNames[i] === className) {
            return true;
        }
    }
    return false;
}

function addClass(element, className) {
    if (!hasClass(element, className)) {
        element.className = element.className ?[element.className, className].join(' ') : className;
    }
}

function removeClass(element, className) {
    if (className && hasClass(element, className)) {
        var classNames = element.className.split(/\s+/);
        for (var i = 0, len = classNames.length; i < len; i++) {
            if (classNames[i] === className) {
                classNames.splice(i, 1);
                break;
            }
        }
    element.className = classNames.join(' ');
    }
}