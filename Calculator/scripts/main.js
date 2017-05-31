/**
 * 调整样式，包括 rem 的值和特殊键的尺寸
 */
(function() {
	var fullWindowWidth;
	var originWidth;

	originWidth = 320;
	resize();

	$(window).on('resize', resize);

	function resize() {

		// document.documentElement.clientWidth 只能获取根元素的宽度，CSS 中的媒体查询计算的是 viewport的值，因此需要算上 scrollbar 的宽度
		fullWindowWidth = window.innerWidth;

		// window.innerWidth 兼容 IE8，bootstrap 3 中的方法
		if (!fullWindowWidth) {
			var documentElementRect = document.documentElement.getBoundingClientRect()
			fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
		}

		if (fullWindowWidth > 480) fullWindowWidth = 320;

		$("html").css("font-size", function() {
			return (( 100 * fullWindowWidth ) / originWidth).toFixed(2) + "px";
		});

		setZero();
		setEqual();

		// 设置按键 0 的宽度
		function setZero() {
			$width = $(".btn-longlocate").position().left + $(".btn-longlocate").innerWidth();
			$(".btn-long").css("width", $width);
		}

		// 设置按键 = 的高度
		function setEqual() {
			$height = $(".btn-talllocate").position().top - $(".row").position().top + $(".btn-longlocate").innerHeight();
			$(".btn-tall").css("height", $height);
		}
	}
})();

/**
 * 计算功能
 */
(function() {
	// 获得显示屏的值
	var output = $(".output-num");
	var inputStr = "";

	// 存储值默认为零
	var memory = "0";

	// 防止重复输入小数点或百分号
	var decimalAdded = false;
	var percentAdded = false;

	// 设计稿中屏幕最多容纳 16 个数字
	var MAX_LEN = 16;

	// 达到屏幕容量数字的上限时，下面这些字符不能被输入
	var OPERAND_REGEX = /[\d\.%\(\)±]/;

	// 显示屏默认显示零
	output.text("0");

	/**
	 * 给所有按键绑定点击事件
	 */
	$(".screen-keyboard").on("click", "button", function() {

		// 获得按键的值，输入字符串的长度
		var btnVal = $(this).text();
		var inputLen = inputStr.length;

		// 判断按键的值，选择将按键值加到 inputStr 或者其他
		switch (btnVal) {

			case "mc":
				memory = "0";
				console.log(memory);
				break;

			case "m+":
				memory = accAdd(memory, output.text());

				// 按下 m+ 后，开始重新输入
				inputStr = "";
				decimalAdded = false;
				percentAdded = false;
				console.log(memory);
				break;

			case "m-":
				memory = accSub(memory, output.text());

				// 按下 m- 后，开始重新输入
				inputStr = "";
				decimalAdded = false;
				percentAdded = false;
				console.log(memory);
				break;

			case "mr":
				// 按下 mr 后，开始重新输入
				inputStr = "";

				// 如果存储值位数超过上限，则用数学计数法表示
				memoryDisplay = String(memory).length > MAX_LEN ? memory.toExponential(5) : memory;
				output.text(memoryDisplay);
				console.log(memory);
				break;

			case "back":
				inputStr = inputStr.slice(0, -1);
				// 按下退格键字符串被删光了或者只剩一个负号的时候，显示零
				if (inputStr.length === 0 || inputStr[inputStr.length - 1] === "-") {
					inputStr = "0";
				}
				output.text(inputStr); 
				break;

			case "%":
				// 输入字符串非空并且未输入过百分号时可以输入百分号
				if (inputStr && !percentAdded) {
					inputStr = accDiv(inputStr, 100) + "";
					output.text(inputStr);
					percentAdded = true;
				}
				break;

			case "C":
				// 清空输入字符串，显示屏清零
				inputStr = "";
				output.text("0");
				decimalAdded = false;
				percentAdded = false;
				break;

			case "±":
				// 输入长度达到上限，或者未输入任何值，或者输入 0
				if (inputLen === MAX_LEN || !inputLen || inputStr === "0" ) {
					break;
				}
				inputStr = inputStr[0] === "-" ? inputStr.substring(1) : "-" + inputStr;
				output.text(inputStr);
				break;

			case ".":
				// 达到输入长度上限
				if (inputLen === MAX_LEN) {
					break;
				}
				if (!decimalAdded) {
					// 如果直接输入小数点，在前面补零
					if (!inputStr) {
						inputStr = "0."
					} else {
						inputStr += ".";
					}
					output.text(inputStr);
					decimalAdded = true;
				}
				break;

			case "0":
				// 达到输入长度上限
				if (inputLen === MAX_LEN) {
					break;
				}
				if (inputStr !== "0") {
					inputStr += "0";
					output.text(inputStr);
				}
				break;

			default:
				if (OPERAND_REGEX.test(btnVal)) {
					// 达到输入长度上限
					if (inputLen === MAX_LEN) {
						break;
					} else if (inputStr === "0") {
						// 输入不能以 0 开头
						inputStr = btnVal;
					} else {
						inputStr += btnVal;
					}
					output.text(inputStr);
				}
		}

	});

	console.log(accDiv(0.3, 0.1));
	console.log(accAdd(0.1, 0.2));

	/**
	 ** 加法函数，用来得到精确的加法结果
	 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
	 ** 调用：accAdd(arg1,arg2)
	 ** 返回值：arg1加上arg2的精确结果
	 **/
	function accAdd(arg1, arg2) {
	    var r1, r2, m, c;
	    try {
	        r1 = arg1.toString().split(".")[1].length;
	    }
	    catch (e) {
	        r1 = 0;
	    }
	    try {
	        r2 = arg2.toString().split(".")[1].length;
	    }
	    catch (e) {
	        r2 = 0;
	    }
	    c = Math.abs(r1 - r2);
	    m = Math.pow(10, Math.max(r1, r2));
	    if (c > 0) {
	        var cm = Math.pow(10, c);
	        if (r1 > r2) {
	            arg1 = Number(arg1.toString().replace(".", ""));
	            arg2 = Number(arg2.toString().replace(".", "")) * cm;
	        } else {
	            arg1 = Number(arg1.toString().replace(".", "")) * cm;
	            arg2 = Number(arg2.toString().replace(".", ""));
	        }
	    } else {
	        arg1 = Number(arg1.toString().replace(".", ""));
	        arg2 = Number(arg2.toString().replace(".", ""));
	    }
	    return (arg1 + arg2) / m;
	}

	/**
	 ** 减法函数，用来得到精确的减法结果
	 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
	 ** 调用：accSub(arg1,arg2)
	 ** 返回值：arg1减去arg2的精确结果
	 **/
	 function accSub(arg1, arg2) {
	    var r1, r2, m, n;
	    try {
	        r1 = arg1.toString().split(".")[1].length;
	    }
	    catch (e) {
	        r1 = 0;
	    }
	    try {
	        r2 = arg2.toString().split(".")[1].length;
	    }
	    catch (e) {
	        r2 = 0;
	    }
	    m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
	    n = (r1 >= r2) ? r1 : r2;
	    return ((arg1 * m - arg2 * m) / m).toFixed(n);
	}

	/**
	 ** 乘法函数，用来得到精确的乘法结果
	 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
	 ** 调用：accMul(arg1,arg2)
	 ** 返回值：arg1乘以 arg2的精确结果
	 **/
	 function accMul(arg1, arg2) {
	    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
	    try {
	        m += s1.split(".")[1].length;
	    }
	    catch (e) {
	    }
	    try {
	        m += s2.split(".")[1].length;
	    }
	    catch (e) {
	    }
	    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	}

	/** 
	 ** 除法函数，用来得到精确的除法结果
	 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
	 ** 调用：accDiv(arg1,arg2)
	 ** 返回值：arg1除以arg2的精确结果
	 **/
	function accDiv(arg1, arg2) {
	    var t1 = 0, t2 = 0, r1, r2;
	    try {
	        t1 = arg1.toString().split(".")[1].length;
	    }
	    catch (e) {
	    }
	    try {
	        t2 = arg2.toString().split(".")[1].length;
	    }
	    catch (e) {
	    }
	    with (Math) {
	        r1 = Number(arg1.toString().replace(".", ""));
	        r2 = Number(arg2.toString().replace(".", ""));
	        return (r1 / r2) * pow(10, t2 - t1);
	    }
	}
})();