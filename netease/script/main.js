window.onload = function(){
	function ajax(obj) {

	    var xhr = new XMLHttpRequest();
	    /*url加随机参数，防止缓存*/
	    obj.url = obj.url + '?' + Math.random();
	    /*请求参数格式化，encodeURIComponent编码参数可以出现&*/
	    obj.data = (function (data) {
	        var arr = [];

	        for (var i in data) { 
	            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
	        }
	        return arr.join('&');

	    })(obj.data);
	    if (obj.method === 'get') obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&' + obj.data;
	    if (obj.async === true) {

	        xhr.onreadystatechange = function () {

	            if (xhr.readyState == 4) {

	                callback();
	            }
	        };
	    }
	     
	    xhr.open(obj.method, obj.url, obj.async);

	    if (obj.method === 'post') {

	        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	        xhr.send(obj.data);    
	    } else {

	        xhr.send(null);
	    }
	    if (obj.async === false) {
	        callback();
	    }

	    function callback() {

	        if (xhr.status == 200) {

	            obj.success(xhr.responseText);          //回调传递参数
	        } else {
	            alert('获取数据错误！错误代号：' + xhr.status + '，错误信息：' + xhr.statusText);
	        }    
	    }
	}

	//获取cookie值
	function getCookie(c_name)			
	{
		if (document.cookie.length>0){
		  	c_start=document.cookie.indexOf(c_name + "=");

		  	if (c_start!=-1){ 
			    c_start=c_start + c_name.length+1 
			    c_end=document.cookie.indexOf(";",c_start)

			    if (c_end==-1) c_end=document.cookie.length
		    	return unescape(document.cookie.substring(c_start,c_end))
		    } 
		  }
		return "";
	}
	//设置或修改cookie值
	function setCookie (name, value, expires, path, domain, secure)
		{
			exdate=new Date();
			exdate.setDate(exdate.getDate()+expires);
			var cookie = encodeURIComponent(name)+'='+encodeURIComponent(value);

			if (expires)
				cookie += ';expires=' + exdate.toGMTString();
						 //设置动态cookie值
			if (path) 
				cookie +=';path=' + path;

			if (domain)
				cookie +=';domain=' + domain;

			if (secure)
				cookie +=';secure=' + secure;

			document.cookie = cookie;
		}

	//顶部通知栏
	(function () 
		{
		
			var prompt = document.getElementById('prompt');
			var noRemind = prompt.getElementsByTagName('span')[0];

			var cookie = getCookie("prompt");
			if (cookie==1) {
				prompt.style.display = "none";
			}else{
				prompt.style.display = "block";
			}
			noRemind.onclick = function(){

				prompt.style.display = "none";
				setCookie("prompt",1,3);
			}


		})();

	//关注、登录框
	(function()
		{

			var follow = document.getElementById("follow");
			var login = document.getElementById("login");
			var mask = document.getElementById("mask");
			var loginClose = document.getElementById("login_close");
			var fans = document.getElementById("fans");
			var logged = document.getElementById("logged");
			var cancel = document.getElementById("cancel");
			var username = document.getElementById("username");
			var password = document.getElementById("password");
			var oSubmit = document.getElementById("submit");


			
			function oFollow(){

				var loginSuc = getCookie('loginSuc');
					if (loginSuc!=1) {

						mask.style.display = "block";
						login.style.display = "block";	

					}else{

						follow.style.display = "none";
						fans.style.display = "none";
						logged.style.display = "block";

					}
				
				}
			follow.onclick = oFollow;
			
			cancel.onclick = function()
				{
					setCookie("followSun",0,0);
					follow.style.display = "block";
					fans.style.display = "block";
					logged.style.display = "none";
				}

			loginClose.onclick =close;
			function close()
				{
					username.value = "帐号";
					username.style.color = "#cccccc";
					username.style.background = "#fafafa";
					password.value = "密码";
					password.type = "text";
					password.style.color = "#cccccc";
					mask.style.display = "none";
					login.style.display = "none";
				}

			username.onfocus = function() {
				
				this.value = "";
				this.style.color = "#333333";

			}
			username.onblur = function() {
				if (this.value=="") {
					this.value = "帐号";
					this.style.color = "#cccccc";
				};
			}
			password.onfocus = function() {
				
				this.value = "";
				this.type = "password";
				this.style.color = "#333333";

			}
			password.onblur = function() {
				if (this.value == "") {

					this.value = "密码";
					this.type = "text";
					this.style.color = "#cccccc";
				}
			}

		function submit(event){								//ajax 处理

		  	var xhrSubmit = new XMLHttpRequest();				
			xhrSubmit.onreadystatechange = function() {//处理返回数据

		    if (xhrSubmit.readyState == 4) {
		        if ((xhrSubmit.status >= 200 && xhrSubmit.status<300) || xhrSubmit.status == 304) {

		          	if (xhrSubmit.responseText==1) {

		          		close();
		  				setCookie('loginSuc',1,2);
		  				setCookie('followSuc',1,2);

		          		}else{
			          		event.preventDefault();				//密码输入不正确，阻止提交事件
			         		alert('你输入的帐号或密码有误');
			         		return;
		       			}
		    		}
		    	}
			}

		  	var oUserName=hex_md5(username.value);			//用户名进行md5加密
		  	var oPassword=hex_md5(password.value);			//用户密码进行md5加密

			xhrSubmit.open('get','http://study.163.com/webDev/login.htm?userName='+oUserName+'&password='+oPassword,false);
			xhrSubmit.send(null);
		}
		oSubmit.onclick = submit;

		})();

		/*淡入模块函数*/
		var iBase = {
        	Id: function(name){
            	return document.getElementById(name);
        	},
        	//设置元素透明度,透明度值按IE规则计,即0~100
        	SetOpacity: function(ev, v){
            	ev.filters ? ev.style.filter = 'alpha(opacity=' + v + ')' : ev.style.opacity = v / 100;
        	}
    	}
		//淡入效果(含淡入到指定透明度)
    function fadeIn(elem, speed, opacity){
        /*
         * 参数说明
         * elem==>需要淡入的元素
         * speed==>淡入速度,正整数(可选)
         * opacity==>淡入到指定的透明度,0~100(可选)
         */
        speed = speed || 20;
        opacity = opacity || 100;
        elem.style.display = 'block'; 		//显示元素,并将元素值为0透明度(不可见)
        iBase.SetOpacity(elem, 0);			
        var val = 0;						//初始化透明度变化值为0

        (function(){						//循环将透明值以5递增,即淡入效果
            iBase.SetOpacity(elem, val);
            val += 5;
            if (val <= opacity) {

                setTimeout(arguments.callee, speed)
            }
        })();
    }

	//banner淡入淡出
	(function()
		{

			var banner = document.getElementById("banner");
			var banners = banner.getElementsByTagName("img");
			var tab = banner.parentNode;
			var btns = document.getElementById("btns").getElementsByTagName("li");
			var iNow = 0;
			var timer = null;
			function fade(){
					for (var i = 0; i < banners.length; i++) {
						banners[i].index = i;
						
						if (banners[i].index!=iNow) {
							banners[i].style.zIndex = 1;
							banners[i].style.filter = 'alpha(opacity='+0+')';
							banners[i].style.opacity = 0;
							btns[i].className = "";
						}else{
							banners[iNow].style.zIndex = 2;
							btns[iNow].className = "active";
							fadeIn(banners[iNow]);
						}
					};
				}

			function autoPlay(){
				fade();
				timer = setInterval(function(){
						iNow++;
						iNow%=banners.length;
						fade();
					},3000);
			}
			autoPlay();
			tab.onmouseenter = function(){
				clearInterval(timer);
			}
			tab.onmouseleave = function(){
				setTimeout(function(){
					iNow++;
					iNow%=banners.length;
					autoPlay();
				},3000)
				
			}
			for (var i = 0; i < btns.length; i++) {
				btns[i].index = i;
				btns[i].onclick = function(){
					for (var i = 0; i < btns.length; i++) {
						btns[i].className = ""
					};
					iNow = this.index;
					btns[this.index].className = "active";
					fade();
					
				}
			};

		})();

	//video
	(function()
		{

			var videoPic = document.getElementById("video");
			var videoPlay = document.getElementById("videoPlay");
			var video = videoPlay.getElementsByTagName("video")[0];
			var videoClose = document.getElementById("video_close");
			var mask = document.getElementById("mask");
			videoPic.onclick = function(){

				video.load();
				mask.style.display = "block";
				videoPlay.style.display = "block";

			}

			videoClose.onclick = function(){
				
				video.pause();
				mask.style.display = "none";
				videoPlay.style.display = "none";
				
				

			}


		})();

	//课程内容
	(function(){

		

		var _design = document.getElementById('design');	//产品设计tab		
		var _program = document.getElementById('program');	//编程语言tab
		

		function courseRef(){								//课程刷新函数
			var con = document.getElementById("con");
			con.innerHTML="";
			ajax({
			    method : 'get',
			    url : 'http://study.163.com/webDev/couresByCategory.htm',
			    data : {
			        'pageNo':pageNo,
			        'psize':psize,
			        'type':type
			    },
			    success : function (data) {
			        
			        var _data = JSON.parse(data);
			        var con = document.getElementById("con");
			        var lists = con.getElementsByTagName('li');
			 		var str = "";
			        for(i=0;i<_data.list.length;i++){
			            
			            str += '<li><img src="'+_data.list[i].middlePhotoUrl+'"><p class="co_p">'+_data.list[i].description+'</p><span class="co_span">'+_data.list[i].provider +'</span><em class="co_em">'+_data.list[i].learnerCount+'</em><strong class="co_strong">￥'+_data.list[i].price+'</strong><h4 class="name">'+_data.list[i].name+'</h4><span class="learnCount">'+_data.list[i].learnerCount+'人在学</span><span class="provider">发布者：'+_data.list[i].provider+'</span><span class="categoryName">分类:'+_data.list[i].categoryName+'</span><p class="description">'+_data.list[i].description+'</p></li>';
			            
			        }

			        con.innerHTML = str;

			        for (var i = 0; i < lists.length; i++) {

			        	lists[i].onmouseover=function(){
			        		for (var i = 0; i < lists.length; i++) {
								lists[i].style.top = lists[i].offsetTop + 'px';
								lists[i].style.left = lists[i].offsetLeft + 'px';
							};

							for (var i = 0; i < lists.length; i++) {
								lists[i].style.position = 'absolute';
								lists[i].style.margin = '0';
							};
							
							this.className = "active";
			        	}
			        	lists[i].onmouseout=function(){

							this.className = "";
			        	}

			        };
			    },
			    async : true
			});
		}
		var pageNo = 1;
		var psize = 20;
		var type = 10;

		courseRef();

		_design.onclick = function(){

			pageNo = 1;
			type = 10;

			pagesLists[pageNo].className = "active";
			courseRef();
			_program.className = "";
			this.className = "active";
		}
		_program.onclick = function(){

			pageNo = 1;
			type = 20;

			pagesLists[pageNo].className = "active";
			courseRef();
			_design.className = "";
			this.className = "active";
		}
		//pages
		var pages = document.getElementById("pages");
		var pagesLists = pages.getElementsByTagName("li");
		var next = pagesLists[pagesLists.length-1];
		var prev = pagesLists[0];
		for (var i = 1; i < pagesLists.length; i++) {
		 	pagesLists[i].index = i;
		 	pagesLists[i].onclick = function(){
		 		pageNo = this.index;
		 		for (var i = 1; i < pagesLists.length-1; i++) {
		 			pagesLists[i].className = "";
		 		};
		 		this.className = "active";
		 		courseRef();
		 	}
		};
		
		next.onclick = function(){

			pageNo++;
			if (pageNo==9) {
				pageNo = 8;
			};
			for (var i = 1; i < pagesLists.length-1; i++) {
		 			pagesLists[i].className = "";
		 		};
			pagesLists[pageNo].className = "active";
			courseRef();

		}
		prev.onclick = function(){

			pageNo--;
			if (pageNo==0) {
				pageNo = 1;
			};
			for (var i = 1; i < pagesLists.length-1; i++) {
		 			pagesLists[i].className = "";
		 		};
			pagesLists[pageNo].className = "active";
			courseRef();

		}
	})();

	//hotList
	(function(){
		function reList(){

			var hotList = document.getElementById("hotList");			//刷新前清除以前的内容
			hotList.innerHTML="";

			ajax({
		    method : 'get',
		    url : 'http://study.163.com/webDev/hotcouresByCategory.htm',
		    data :null,
		    success : function (data) {

		        var _data= JSON.parse(data);
		        var hotList = document.getElementById("hotList");
		        var str = "";
		        n = _data.length;
		        
		        for (var i = iNow; i < n+iNow-10; i++) {
		        	hotList.innerHTML += '<li><img src="'+_data[i].smallPhotoUrl+'" alt=""><p>'+_data[i].name+'</p><span>'+_data[i].learnerCount+'</span></li>'
		        	};

		    	},
		    async : true
			});
		}

		var iNow = 0;
		var n = 0;
		reList();

		setInterval(function(){
			reList();
			iNow++;
			if (iNow==(n-10)) {
				iNow = 0;
			};
		},4000);
	})()




}

