function hasClass(e,a){var s=e.className;if(!s)return!1;s=s.split(/\s+/);for(var n=0,t=s.length;n<t;n++)if(s[n]===a)return!0;return!1}function addClass(e,a){hasClass(e,a)||(e.className=e.className?[e.className,a].join(" "):a)}function removeClass(e,a){if(a&&hasClass(e,a)){for(var s=e.className.split(/\s+/),n=0,t=s.length;n<t;n++)if(s[n]===a){s.splice(n,1);break}e.className=s.join(" ")}}!function(){var e=Slip(document.getElementById("container"),"y").webapp(),a=document.getElementsByClassName("page");e.end(function(){for(var e=0;e<a.length;e++)removeClass(a[e],"page-active");addClass(a[this.page],"page-active")})}(),function(){var e=document.getElementsByClassName("page-1")[0].getElementsByClassName("top")[0];e.addEventListener("animationend",function(){removeClass(e,"bounceIn")})}(),function(){var e=document.getElementsByClassName("page-4")[0].getElementsByClassName("btn"),a=document.getElementsByClassName("page-4")[0].getElementsByClassName("mask")[0];e[0].onclick=function(){a.style.display="block"},e[2].onclick=function(){a.style.display="none"}}();