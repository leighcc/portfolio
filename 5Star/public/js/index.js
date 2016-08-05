// 给当前页面添加page-active类名
(function () {
    var slip = Slip(document.getElementById('container'), 'y').webapp(),
        Pages = document.getElementsByClassName('page');

    slip.end(function () {
        for (var i = 0; i < Pages.length; i++) {
            removeClass(Pages[i], 'page-active');
        }
        addClass(Pages[this.page], 'page-active');
    });
})();

// 第一页的top完成第一次动画后删除bounceIn类
(function () {
    var top = document.getElementsByClassName('page-1')[0].getElementsByClassName('top')[0];

    top.addEventListener('animationend', function () {
        removeClass(top, 'bounceIn');
    });
})();

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