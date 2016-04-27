// 轮播头图
(function () {
	var container = document.getElementById("banner"), //大容器
        imgContain = container.getElementsByClassName("list")[0], //图片的容器
        buttons = container.getElementsByTagName("span"), //按钮组
        index = 1, //当前显示是第几张图片
        animated = false, //是否进行动画
        timer; //自动播放定时器
        
        function animate (offset) {
            animated = true;
            var newLeft = parseInt(imgContain.style.marginLeft) + offset;

            imgContain.style.marginLeft = newLeft +'%';
            if (newLeft > 0) {
                imgContain.style.marginLeft = -200 + '%';
            } 
            if (newLeft < -200) {
                imgContain.style.marginLeft = 0 + '%';
            }
            showButton();
            fadeIn();
        }

        function play () {
            timer = setInterval(function () {
                next();
            },5000);
        }

        function stop () {
            clearInterval(timer);
        }

        function showButton () {
            for (var i = buttons.length - 1; i >= 0; i--) {
                if (buttons[i].className == "cur") {
                    buttons[i].className = "";
                    break;
                }
            };
            buttons[index - 1].className = "cur";
        }

        function next () {
            if (index == 3) {
                index = 1;
            } else{
                index += 1;
            }
            if (!animated) {
                animate(-100);
            }
            
        }

        // function pre () {
        //     if (index == 1) {
        //         index = 3;
        //     } else{
        //         index -= 1;
        //     }
        //     animate(100);
        // }

        function fadeIn () {
            var opc = 1,
                time = 500, //渐变的总时间
                interval = 25, //渐变间隔时间
                speed = 100/(time/interval); //每次渐变量

            setOpacity(imgContain,0);

            (function func () {
                if (opc <= (time/interval)) {
                    setOpacity(imgContain,speed * opc);
                    opc += 1;
                    setTimeout(func,interval);
                }
                else {
                    animated = false;
                }
            })();
        }

        function setOpacity (elem, level) {
            elem.style.opacity = level/100;
        }

        for (var i = buttons.length - 1; i >= 0; i--) {
            buttons[i].addEventListener("click",function () {
                var myIndex = parseInt(this.getAttribute('index')),
                    offset = -100 * (myIndex - index);

                index = myIndex;
                if (!animated) {
                    animate(offset);
                }
            });
        }

        container.addEventListener("mouseover",stop);
        container.addEventListener("mouseout",play);

        play();
})();

/* never display again */
(function() { 
	var tips = document.getElementById('m-message')
	close = tips.getElementsByClassName('wrap')[0].getElementsByTagName('div')[0];
	cookie = getCookie();

		if (!cookie.noTips) {tips.style.display = 'block';};

		addClickEvent(close, function (event) {
			setCookie('noTips', 1, new Date(9999,9));
			tips.style.display = 'none';
		});
})();

/* 视频播放 */
(function () {
	var v_img = document.getElementById('video');
	var v_win = document.getElementsByClassName('m-video')[0];
	var close = v_win.getElementsByClassName('u-btn')[0];

	addClickEvent(v_img, function () {
		v_win.style.display = 'block';
	});

	addClickEvent(close, function () {
		v_win.style.display = 'none';
	});

})();

/* 关注 */
(function () {
	var followBtn = document.getElementsByClassName('head-follow')[0].getElementsByClassName('u-btn')[0];
	var followedBtn = document.getElementsByClassName('head-follow')[0].getElementsByClassName('followed')[0];
	var loginMod = document.getElementsByClassName('m-login')[0]; //获取整个登录模块

	setFolbtn();
	addClickEvent(followBtn, function () {
		var cookie = getCookie();
		if (!cookie.loginSuc) {
			loginMod.style.display = 'block';
		}
		else {
			followAPI();
		}
		event.preventDefault();
	});

	function followAPI () {
		var url = "http://study.163.com/webDev/ attention.htm";
		makeRequest(url, null, handler);

		function handler (response) {
			if (response == 1) {
				setCookie('followSuc',1,new Date(9999,9));
				setFolbtn();
			}
			else {
				alert("关注失败");
			}
		}
	}

	function setFolbtn () {
		var cookie = getCookie();

		if (cookie.followSuc == 1) {
			followBtn.style.display = 'none';
			followedBtn.style.display = 'inline-block';
		}
		else {
			followBtn.style.display = 'inline-block';
			followedBtn.style.display = 'none';
		}

	} //选择关注按钮

	/* 表单登录 */
	(function () {
		var loginForm = document.forms.login;
		var account = document.getElementById('account');
		var password = document.getElementById('password');
		var closeBtn = loginMod.getElementsByTagName('span')[0];

		addClickEvent(closeBtn, function () {
			loginMod.style.display = 'none';
		});

		addEvent(loginForm, 'submit', function (event) {
			var account_txt = md5(account.value);
			var password_txt = md5(password.value);
			var data = {userName:account_txt, password:password_txt};
			var url = "http://study.163.com/webDev/login.htm";

			if (account_txt === '' || password_txt === '') {
				disableSubmit(true);
				return;
			}//表单验证

			event.preventDefault();
			makeRequest(url, data, handler);
			disableSubmit(true);
		});

		function disableSubmit (disabled) {
			loginForm.loginBtn.disabled = !!disabled;
		} //禁用提交按钮

		function handler (response) {
			if (response == 1) {
				loginMod.style.display = 'none';
				setCookie('loginSuc',1,new Date(9999,9));
				followAPI();
			}
			else {
				alert("用户名或密码错误");
			}
		}
	})();
})();

/* 热门推荐 */
(function () {
	var url = 'http://study.163.com/webDev/hotcouresByCategory.htm';
	var ul = document.getElementsByClassName('right')[0].getElementsByClassName('list')[0]; //获取这个ul
	var li = ul.getElementsByTagName('li'); //获取Li列表

	makeRequest(url, null, setList);

	function setList (response) {
		var data = JSON.parse(response);
		var proto = document.getElementsByClassName('right')[0].getElementsByClassName('proto')[0];
		for (var i = 0; i < data.length; i++) {
			var clone = proto.cloneNode(true);
			removeClass(clone, 'proto');
			var img = clone.getElementsByTagName('img')[0];
			var h3 = clone.getElementsByTagName('h3')[0];
			var num = clone.getElementsByTagName('span')[0];

			img.src = data[i].smallPhotoUrl;
			img.alt = data[i].name;
			h3.innerText = data[i].name;
			num.innerText = data[i].learnerCount;
			proto.parentNode.appendChild(clone);
		}
		setInterval(scroll, 5000);

		function scroll () {
			var cloneLi = li[20].cloneNode(true); //克隆最后一个li
			ul.insertBefore(cloneLi, li[1]); //将克隆的最后一个节点插到第一个li前
			roll(ul, {bottom: -990}, function () {
				ul.removeChild(li[21]);
				ul.style.bottom = '-900px';
			});
		}

	}
})();

/* 滚动 */
var roll = (function(){
    return function(obj,json,times,fx,fn){
    
        if( typeof times == 'undefined' ){
            times = 400;
            fx = 'linear';
        }
        
        if( typeof times == 'string' ){
            if(typeof fx == 'function'){
                fn = fx;
            }
            fx = times;
            times = 400;
        }
        else if(typeof times == 'function'){
            fn = times;
            times = 400;
            fx = 'linear';
        }
        else if(typeof times == 'number'){
            if(typeof fx == 'function'){
                fn = fx;
                fx = 'linear';
            }
            else if(typeof fx == 'undefined'){
                fx = 'linear';
            }
        }
        
        var iCur = {};
        
        for(var attr in json){
            iCur[attr] = 0;
            
            if( attr == 'opacity' ){
                iCur[attr] = Math.round(getStyle(obj,attr)*100);
            }
            else{
                iCur[attr] = parseInt(getStyle(obj,attr));
            }
            
        }
        
        var startTime = now();
        
        clearInterval(obj.timer);
        
        obj.timer = setInterval(function(){
            
            var changeTime = now();
            
            var t = times - Math.max(0,startTime - changeTime + times);  //0到2000
            
            for(var attr in json){
                
                var value = Tween[fx](t,iCur[attr],json[attr]-iCur[attr],times);
                
                if(attr == 'opacity'){
                    obj.style.opacity = value/100;
                    obj.style.filter = 'alpha(opacity='+value+')';
                }
                else{
                    obj.style[attr] = value + 'px';
                }
                
            }
            
            if(t == times){
                clearInterval(obj.timer);
                if(fn){
                    fn.call(obj);
                }
            }
            
        },13);
        
        function getStyle(obj,attr){
            if(obj.currentStyle){
                return obj.currentStyle[attr];
            }
            else{
                return getComputedStyle(obj,false)[attr];
            }
        }
        
        function now(){
            return (new Date()).getTime();
        }

        var Tween = {
            linear: function (t, b, c, d){  //匀速
                return c*t/d + b;
            }
        }
        
    }
})();

/* 获取课程列表 */
(function(){

    var url = "http://study.163.com/webDev/couresByCategory.htm";
    var pageSize = 20;
    var pageType = 10;

    var mnav = document.getElementsByClassName('left')[0].getElementsByClassName('tab')[0];
    var mnavTag = mnav.getElementsByTagName('li'); //选择模块的两个按钮
    var mpager = document.getElementsByClassName('page-pre')[0]; //翻页器的整个div

    // 选择 pageType
    delegateEvent(mnav,'ul','click',
        function(target,event){
            if(pageType != target.getAttribute('data')){
                for(i=0;i<mnavTag.length;i++){
                    removeClass(mnavTag[i],'active'); //删除两个按钮的选中状态      
                }
                addClass(target,'active'); //将target设为选中
                pageType = target.getAttribute('data');
                mpager.innerHTML = '';
                getPageNum(1);
            }
            event.preventDefault();
        }
    );

    //请求指定页码的课程数据及生成分页器
    function getPageNum(now){    
        var options = {pageNo:now,psize:pageSize,type:pageType};
        makeRequest(url,options,function(response){
                initPager(response,now);
            }
        );    
    }
    //初始化分页和课程列表
    function initPager(response,now){
        var res = JSON.parse(response);
        // childLength 为翻页器最多显示的页数
        var option = {id:mpager,nowNum:now,allNum:res.totalPage,childLength:8,callback:getCourse};
        //初始化课程列表
        drawCourse(response);
        //初始化分页
        mpager.innerHTML = '';
        page(option);
    }

    //获取课程列表
    function getCourse(now,all){
        console.log('分页器：'+now);
        
        var options = {pageNo:now,psize:pageSize,type:pageType};
        makeRequest(url,options,drawCourse);
    }

    //生成课程列表
    function drawCourse(response){
        var data = JSON.parse(response);
        console.log(data);
        console.log('获取的页码：'+ data.pagination.pageIndex);
        
        var boo = document.querySelectorAll('.course-item');
        // 删除除第一个以外的其他多余元素
        for(var i=boo.length-1;i>0;i--){
            boo[i].parentNode.removeChild(boo[i]);
        }
        
        var templete = document.getElementsByClassName('left')[0].getElementsByClassName('proto')[0];
            
        for(var i=0,list=data.list;i<list.length;i++){ 
            // 克隆第一个 course-item 节点，包括子节点
            var cloned = templete.cloneNode(true);
            removeClass(cloned,'proto');
            var imgpic = cloned.getElementsByTagName('img')[0];
            var title = cloned.getElementsByTagName('p')[0];
            var orgname = cloned.getElementsByClassName('provider')[0];
            var hot = cloned.getElementsByClassName('u-btn')[0];
            var pri = cloned.getElementsByTagName('em')[0];
            var kindname = cloned.getElementsByClassName('kindname')[0];
            var detail = cloned.getElementsByClassName('detail')[0];
            
            imgpic.src = list[i].middlePhotoUrl;
            imgpic.alt = list[i].name;
            title.innerText = list[i].name;
            orgname.innerText = list[i].provider;
            hot.innerText = list[i].learnerCount;
            pri.innerText = '￥' + list[i].price + '.00'; 
            kindname.innerText = list[i].categoryName;
            detail.innerText = list[i].description;   
            templete.parentNode.appendChild(cloned);
            var sp=document.createTextNode(" ");
            templete.parentNode.appendChild(sp); //添加空格为了让text-align:justify起作用
        }
    }

    /* 分页 */   
    function page(opt){// option = {id:翻页器,nowNum:当前页码,allNum:总页数,childLength:8,callback:getCourse};
        if(!opt.id){
            return false;
        };
        var obj = opt.id;
        var nowNum = opt.nowNum || 1;
        var childLength = opt.childLength;
        var allNum = opt.allNum || childLength;
        var callback = opt.callback || function(){};
        // 可显示页数二分之一+1的位置
        var point = Math.floor(childLength/2) + 1;

        // 返回一个a元素，内容为自己代表的页数
        var pageInit = function(i){
            var oA = document.createElement('a');
            oA.setAttribute('index',i);
            oA.className = 'page-item';
            oA.innerText = i;
            if(nowNum == i){
                addClass(oA,'active');
            }
            return oA;
        }
        
        var oA = document.createElement('a');
        // 上一页
        oA.setAttribute('index',nowNum - 1);
        oA.className = 'u-btn';
        obj.appendChild(oA);
        
        //生成具体页数，总页数小于等于可显示页数的情况
        if(allNum <= childLength){
            for(var i=1; i <= allNum; i++){ 
                var oA = pageInit(i);
                obj.appendChild(oA);
            }
        }
        //生成具体页数，总页数大于可显示页数的情况
        else{
            for(var i=1; i <= childLength; i++){
                //当前页小于一半+1的可显示页数
                if(nowNum < point){
                    var oA = pageInit(i);
                }
                //当前页是倒数第1到倒数第6页，则显示剩余的8个页码
                else if(allNum - nowNum <= point){
                    var oA = pageInit(allNum - childLength +i);
                }
                //当前页码一直排列在第 point 个
                else{
                    var oA = pageInit(nowNum - point + i);
                }            
                obj.appendChild(oA);
            }
        }
        
        var oA = document.createElement('a'); 
        // 下一页
        oA.setAttribute('index',nowNum + 1);
        oA.className = 'u-btn';
        obj.appendChild(oA);
        
        //用addevent会重复注册
        var aA = obj.getElementsByTagName('a');
        for(var i=0;i<aA.length;i++){
            aA[i].onclick=function(){
                if(nowNum != parseInt(this.getAttribute('index'))){
                    var nowNum = parseInt(this.getAttribute('index'));
                    obj.innerHTML = '';
                    page({
                        id:opt.id,
                        nowNum:nowNum,
                        allNum:allNum,
                        childLength:childLength,
                        callback:callback
                    });
                    callback(nowNum,allNum);
                }            
                return false;
            }
        }    
    }

    getPageNum(1);    

})();



function makeRequest (url, data, handler) {
	var http_request = false;
	// 创建一个XMLHTTP对象
	if (window.XMLHttpRequest) { // Mozilla, Safari,...
	    http_request = new XMLHttpRequest();
	    if (http_request.overrideMimeType) { //如果服务器响应的header不是text/xml,修改该header
	        http_request.overrideMimeType('text/xml');
	    }
	} else if (window.ActiveXObject) { // IE
	    try {
	        http_request = new ActiveXObject("Msxml2.XMLHTTP");
	    } catch (e) {
	        try {
	            http_request = new ActiveXObject("Microsoft.XMLHTTP");
	        } catch (e) {}
	    }
	}

	if (!http_request) {
	    alert('Giving up :( Cannot create an XMLHTTP instance');
	    return false;
	}
	http_request.onreadystatechange = function () {
		if (http_request.readyState == 4) { //检查请求的状态，如果为4，意味着响应收到了
		    if (http_request.status == 200 || http_request.status == 0) { //检查HTTP服务器响应的状态值，对于非服务器端（本地或非法链接），status为0
		        handler(http_request.responseText); //收到服务器响应后的处理
			}
			else {
			    alert('There was a problem with the request.');
			}
		}
	} 
	if (!!data) {
		var url = url + "?" + serialize(data);
	}
	http_request.open('GET', url, true); //发送请求，GET为HTTP请求方式，url为请求页面的URL
	http_request.send(null);

	function serialize (data) {
		var pairs = [];
		for (var name in data) {
		    if (!data.hasOwnProperty(name)) {
		        continue;
		    };
		    if (typeof data[name] === "function") {
		        continue;
		    };
		    var value = data[name].toString();
		    name = encodeURIComponent(name);
		    value = encodeURIComponent(value);
		    pairs.push(name + '=' + value);
		};
		return pairs.join("&");
	}
} //Ajax

function isParent(element,parentName,stopElem){
	for (var node = element; node !== stopElem; node = node.parentNode) {
        if (node.nodeName.toLowerCase() === parentName) {
            return node;
        }
    }
    return false;
}

function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function(event){
    	var event = event || window.event;
    	var target = event.target || event.srcElement;
        listener(target, event);
     //    var parent = isParent(target,tag,element);
    	// if (!!parent) {
    	// 	listener(parent,event);
    	// };
    })
}

function getCookie() {
    var cookie = {};
    var all = document.cookie;
    if (all === '') return cookie;
    var list = all.split('; ');
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        var p = item.indexOf('=');
        var name = item.substring(0, p);
        name = decodeURIComponent(name);
        var value = item.substring(p + 1);
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    return cookie;
} //返回一个cookie对象

function addClickEvent(element, listener) {
	addEvent(element,"click",listener);
} //点击事件

function addEvent(element, event, listener) {
	if (element.addEventListener){
		element.addEventListener(event,listener,!1);
	}else{
		element.attachEvent('on'+event,listener);
	}
} //注册事件

function setCookie(name, value, expires, path, domain, secure) {
    var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires)
        cookie += '; expires=' + expires.toGMTString();
    if (path)
        cookie += '; path=' + path;
    if (domain)
        cookie += '; domain=' + domain;
    if (secure)
        cookie += '; secure=' + secure;
    document.cookie = cookie;
} //设置cookie

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
