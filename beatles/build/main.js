AOS.init({duration:500});$('a[href*="#"]:not([href="#"])').on("click",function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var t=$(this.hash);t=t.length?t:$("[name="+this.hash.slice(1)+"]");if(t.length){$("html, body").animate({scrollTop:t.offset().top},500)}}});