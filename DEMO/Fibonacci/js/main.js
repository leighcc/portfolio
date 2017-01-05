var canvas = document.getElementById('drawing'),
	coor = {
	  x: 300,
	  y: 240,
	}, //中点
	angle = {
		start: 0.5*Math.PI,
		end: 0,
	}, // 起始角度和终止角度
	data = [],
	ctx = canvas.getContext('2d');

// 数列前三项对应的圆弧（第一项没有圆弧，因为值为0）
ctx.beginPath();
ctx.arc(coor.x, coor.y, 1 * 5, -0.5*Math.PI, 0.5*Math.PI, true);

function draw (n,r,prevR) { //数组序号，数组的值即半径，前两个半径
	
	switch (i%4) {
		case 0:
		coor.x = coor.x - prevR * 5;
		angle.start = 0;
		angle.end = 1.5*Math.PI;
		break;

		case 1:
		coor.y = coor.y + prevR * 5;
		angle.start = 1.5*Math.PI;
		angle.end = Math.PI;
		break;

		case 2:
		coor.x = coor.x + prevR * 5;
		angle.start = Math.PI;
		angle.end = 0.5*Math.PI;
		break;

		case 3:
		coor.y = coor.y - prevR * 5;
		angle.start = 0.5*Math.PI;
		angle.end = 0;
		break;
	}

	ctx.arc(coor.x, coor.y, r*5, angle.start, angle.end, true);

}

function getFibonacci (n) {
	var arr = [];

	arr[0] = 0;
	arr[1] = 1;

	for (var i = 2; i < n; i++) {
		arr[i] = arr[i-1] + arr[i-2];
	}
	return arr;
}

data = getFibonacci(10);

for (var i = 3; i < data.length; i++) {
	draw(i,data[i],data[i-2]);
}

ctx.strokeStyle = "#fff";
ctx.stroke();