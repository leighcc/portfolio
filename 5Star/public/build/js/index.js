function hasClass(e,s){var a=e.className;if(!a)return!1;a=a.split(/\s+/);for(var l=0,n=a.length;l<n;l++)if(a[l]===s)return!0;return!1}function addClass(e,s){hasClass(e,s)||(e.className=e.className?[e.className,s].join(" "):s)}function removeClass(e,s){if(s&&hasClass(e,s)){for(var a=e.className.split(/\s+/),l=0,n=a.length;l<n;l++)if(a[l]===s){a.splice(l,1);break}e.className=a.join(" ")}}var slip=Slip(document.getElementById("container"),"y").webapp(),Pages=document.getElementsByClassName("page");slip.end(function(){for(var e=0;e<Pages.length;e++)removeClass(Pages[e],"page-active");addClass(Pages[this.page],"page-active")}),function(){var e=document.getElementsByClassName("page-4")[0].getElementsByClassName("btn"),s=document.getElementsByClassName("page-4")[0].getElementsByClassName("mask")[0];e[0].onclick=function(){s.style.display="block"},e[2].onclick=function(){s.style.display="none"}}();