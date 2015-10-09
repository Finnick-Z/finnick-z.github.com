window.onload=function() {
	//事件注册与取消，兼容IE
	var addEvent = document.addEventListener?
		function(elem,type,listener,useCapture){
			elem.addEventListener(type,listener,useCapture);
		}:
		function(elem,type,listener,useCapture){
			elem.attachEvent("on"+type,listener);
		};
	var delEvent = document.removeEventListener?
		function(elem,type,listener,useCapture){
			elem.removeEventListener(type,listener,useCapture);
		}:
		function(elem,type,listener,useCapture){
			elem.detachEvent("on"+type,listener);
		};


	//顶部通知栏
	
	//获取cookie值
	function getCookie(c_name)			
	{
	if (document.cookie.length>0){
	  	c_start=document.cookie.indexOf(c_name + "=")

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

	//顶部通知栏设置cookie，刷新不再出现
	var Alert;
	var topInfor=document.getElementById('topInfor');
	var closeAlert=document.getElementById('u-alert');

	if (getCookie('Alert')==1) {
		topInfor.style.display="none";

	}else{
		topInfor.style.display="block";
	}

	closeAlert.onclick=function(){
		topInfor.style.display="none";
		setCookie ("Alert",1,3);							    //设置cookie值的过期时间为每次打开此网站的3天后
	}
	

	//登陆界面
	var filter = document.getElementById("filter");				//蒙板遮罩层
	var follow=document.getElementById('follow');
	var attention=document.getElementById('attention');
	var fansAtten=document.getElementById('fansAtten');         //关注、粉丝
	var loginForm=document.getElementById('loginForm');
	var cancle=document.getElementById('cancle');
	var login=document.getElementById('login');
	var loginClose=document.getElementById('loginClose');		//登录框关闭
	var account=document.getElementById('account');
	var password=document.getElementById('password');

	addEvent(attention,'click',attenverify);

	function attenverify(){	

		if ((getCookie('loginSuc'))==1) {			//判断loginSuc是否设置，若有设置则关注
			fansAtten.style.display="none";
			follow.style.display="block";
			setCookie('followSuc',1,2)

		} else{

			filter.style.display="block";
			login.style.display="block";
			account.value="帐号";
			password.value="密码";
			account.style.color="#cccccc";
			password.style.color="#cccccc";
			password.type="text";
		}
	}

	addEvent(cancle,'click',function(){			//点击取消关注，关注栏出现，已关注栏隐藏

		fansAtten.style.display="block";
		follow.style.display="none";
		setCookie('followSuc',0,0);
	})

	addEvent(loginClose,'click',function() {	//关闭登录框

		filter.style.display="none";
		login.style.display="none";
	})

	addEvent(account,'focus',function(){		//帐号输入框在获得焦点事件下清除默认文本

		if (this.value=="帐号") {
			this.value="";
			this.style.color="#444444";
		}
		this.style.color="#444444";
	})

	addEvent(account,'blur',function(){			//帐号输入框在失去焦点事件下回复默认文本

		if (this.value=="") {
			this.style.color="#cccccc";
		};
		
	})

	addEvent(password,'focus',function(){		//密码输入框在获得焦点事件下清除默认文本，并且改为passwoerd类型

		this.value="";
		this.style.color="#444444";
		this.type="password";
	})
	
	addEvent(password,'blur',function(){

		if (this.value=="") {
			this.type="text";					//密码输入框在失去焦点事件下获得默认文本，并且改为text类型
			this.style.color="#cccccc";
		};
	})

	addEvent(password,'invalid',function(event){			//自定义异常

	    if (password.value=="") {

	    var target = event.target;

	    if (target.validity.valueMissing) {

	    target.setCustomValidity("请输入密码哦")
	      }
	    };
  	});
//```````````````````````````````````````````````````````````````````````````
	function serialize (data){				//  请求参数序列化

	if (!data) return '';
	var pairs = [];

	for (var name in data) {

		if (!data.hasOwnProperty(name)) continue;
		if (typeof data[name] ==='function') continue;

		var value = data[name].toString();
		name = encodeURIComponent(name);
		value = encodeURIComponent(value);
		pairs.push(name+'='+value);
		};

		return pairs.join('&');
	}

	function submit(event){								//ajax 处理

	  	var xhrSubmit = new XMLHttpRequest();				
		xhrSubmit.onreadystatechange = function() {//处理返回数据

	      if (xhrSubmit.readyState == 4) {
	        if ((xhrSubmit.status >= 200 && xhrSubmit.status<300) || xhrSubmit.status == 304) {

	          	if (xhrSubmit.responseText==1) {
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

	  	var oUserName=hex_md5(account.value);			//用户名进行md5加密
	  	var oPassword=hex_md5(password.value);			//用户密码进行md5加密

		xhrSubmit.open('get','http://study.163.com/webDev/login.htm?userName='+oUserName+'&password='+oPassword,false);
		xhrSubmit.send(null);
		}

	addEvent(loginForm,'submit',submit);



//````````````````````````````````````````````````````````````````````````````
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

		//banner轮播模块
		
	var continer = document.getElementById('continer');
	var oImg= continer.getElementsByTagName("img")[0];
	var oA= continer.getElementsByTagName("a")[0];
	var oList = document.getElementById('list');		
	var imgs=['images/banner1.jpg','images/banner2.jpg','images/banner3.jpg'];				//banner图片
	var add=['http://open.163.com/','http://study.163.com/','http://www.icourse163.org/'];  //索引链接地址
	var buttons= oList.getElementsByTagName("li");
	var timer=null;
	var num=1;
	oImg.src=imgs[0];					//初始化banner
	fadeIn(oImg,50,100)					//初始化淡入
	oA.href=add[num];					//初始化banner链接

	function Picauto(){					

		var buttons= oList.getElementsByTagName("li");
		var autoTab=function(){

				oImg.src=imgs[num];
				fadeIn(oImg,50,100);
				oA.href=add[num];

				for (var i = 0; i < buttons.length; i++) {

					if(buttons[i].className=="on"){

						buttons[i].className="";
					}
				};

				buttons[num].className="on";
				oImg.src=imgs[num];
				fadeIn(oImg,50,100);
				oA.href=add[num];
				num++;
				num%=3;
			}
		timer=setInterval(autoTab,5000);
		addEvent(oImg,'mouseover',function(){clearInterval(timer);});    //鼠标移入清除定时器
		addEvent(oImg,'mouseout',function(){							 //移出在此当前位置开始定时

			timer=setInterval(autoTab,5000);
		});

		for (var i = 0; i < buttons.length; i++) {

		buttons[i].index=i;												 //定义index属性

		buttons[i].onclick=function(){

			for (var i = 0; i < buttons.length; i++) {

				buttons[i].index=i;
				if(buttons[i].className=="on"){

					buttons[i].className="";
				}
			};

			this.className="on";
			oImg.src=imgs[this.index];
			fadeIn(oImg,50,100);
			oA.href=add[this.index];
			num=this.index;
			fadeIn(oImg,50,100)
			}
		}
	}

	Picauto();

//````````````````````````````````````````````````````````````````````````````````````````````````````````
/*      课程列表设置    */

		function ajax(obj) {

	    var xhr = (function () {

	        /*创建XMLHttpRequest对象*/
	      if (typeof XMLHttpRequest != 'undefined') {
	            // code for IE7+, Firefox, Chrome, Opera, Safari
	            return new XMLHttpRequest();
	        } else if (typeof ActiveXObject != 'undefined') {
	            // code for IE6, IE5
	            var version = [
	                                        'MSXML2.XMLHttp.6.0',
	                                        'MSXML2.XMLHttp.3.0',
	                                        'MSXML2.XMLHttp'
	            ];
	            for (var i = 0; version.length; i ++) {
	                try {
	                    return new ActiveXObject(version[i]);
	                } catch (e) {
	                    //跳过
	                }    
	            }
	        } else {
	            throw new Error('您的系统或浏览器不支持XHR对象！');
	        }
	    })();
	    /*url加随机参数，防止缓存*/
	    obj.url = obj.url + '?rand=' + Math.random();
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
	//``````````````````````````````````````````````````````


	var _design = document.getElementById('design');	//产品设计tab		
	var _program = document.getElementById('program');	//编程语言tab

	function courseRef(){								//课程刷新函数

		document.getElementById("courseList").innerHTML="";
		ajax({
	    method : 'get',
	    url : 'http://study.163.com/webDev/couresByCategory.htm',
	    data : {
	        'pageNo':pageNo,
	        'psize':psize,
	        'type':type
	    },
	    success : function (data) {
	        console.log(data);
	        var _data = JSON.parse(data);
	        var oDiv = document.getElementById("courseList");
	        var list = oDiv.getElementsByTagName('li');
	 
	        for(i=0;i<_data.list.length;i++){
	            var oLi = document.createElement("li");
	            oLi.num=i;
	            oDiv.appendChild(oLi);
	 //创建节点·······················································
	            var _img = document.createElement("img");				
	            var _name = document.createElement("p");
	            var _provider = document.createElement("p");
	            var _count = document.createElement("p");
	            var _price = document.createElement("p");			
	//赋给节点属性及内容···············································
	            _img.setAttribute("src", _data.list[i].middlePhotoUrl);		
	             _img.setAttribute("class", "img");
	            _name.innerHTML=_data.list[i].name;
	            _provider.innerHTML=_data.list[i].provider;
	            _count.innerHTML=_data.list[i].learnerCount;
	            _price.innerHTML="&yen;"+_data.list[i].price;
	//添加到li列表中···················································
	            oLi.appendChild(_img);
	            oLi.appendChild(_name);
	            oLi.appendChild(_provider);
	            oLi.appendChild(_count);
	            oLi.appendChild(_price);
	//设置属性样式······················································         
	            _name.setAttribute('class','courseName');
	            _provider.setAttribute('class','courseProvider');
	            _count.setAttribute('class','peopleCount');
	            _price.setAttribute('class','coursePrice');
	        }
	        var n = 0;
	        var before;
	        var after;
	        var img;

			for (var i = 0; i < 5; i++) {				//试用固定定位布局课程列表卡片		
				for (var j = 0; j < 4; j++) {
					list[n].style.left=j*245+"px";
					list[n].style.top=i*249+"px";
					n++;
				};
			}

			for (var i = 0,len=list.length; i < len; i++) {

				addEvent(list[i],'mouseenter',mouseOver);		//鼠标移入弹出课程内容卡片
				addEvent(list[i],'mouseout',function(){			//移出恢复相应状态
					this.innerHTML="";

				var _img = document.createElement("img");
	            var _name = document.createElement("p");
	            var _provider = document.createElement("p");
	            var _count = document.createElement("p");
	            var _price = document.createElement("p");

	            _img.setAttribute("src", _data.list[this.num].middlePhotoUrl);
	             _img.setAttribute("class", "img");
	            _name.innerHTML=_data.list[this.num].name;
	            _provider.innerHTML=_data.list[this.num].provider;
	            _count.innerHTML=_data.list[this.num].learnerCount;
	            _price.innerHTML="&yen;"+_data.list[this.num].price;
	 
	            this.appendChild(_img);
	            this.appendChild(_name);
	            this.appendChild(_provider);
	            this.appendChild(_count);
	            this.appendChild(_price);
	           
	            _name.setAttribute('class','courseName');
	            _provider.setAttribute('class','courseProvider');
	            _count.setAttribute('class','peopleCount');
	            _price.setAttribute('class','coursePrice');
					
					})}
			function mouseOver(){							//创建弹出内容卡片函数

					before = this.getElementsByTagName('p');
					for (var i = 0; i < 4; i++) {			//隐藏不需显示的内容
						before[i].style.display="none";						
					};
					var _name = document.createElement("p");
					_name.innerHTML=_data.list[this.num].name;
					_name.setAttribute('id','appendH');
					this.appendChild(_name);

					var _count = document.createElement("p");
					_count.innerHTML=_data.list[this.num].learnerCount + "人在学";
					_count.setAttribute('id','appendC');
					this.appendChild(_count);

					var _provider = document.createElement("p");
					_provider.innerHTML="发布者："+_data.list[this.num].provider;
					_provider.setAttribute('id','appendA');
					this.appendChild(_provider);

					var _class = document.createElement("p");
					_class.innerHTML="分类："+_data.list[this.num].categoryName;
					_class.setAttribute('id','appendCl');
					this.appendChild(_class);

					var _descript = document.createElement("p");
					_descript.innerHTML=_data.list[this.num].description;
					_descript.setAttribute('id','appendP');
					this.appendChild(_descript);

				}

	    },
	    async : true
	});
	}

	var pageNo='1';						//默认设置
	var psize='20';
	var type='10';
	courseRef();

	function tabDesign(){				//tab 切换产品设计
		type="10";		
		_program.className="";
		_design.hold=1;					//hold  为自定义属性
		this.hold=0;
		this.className="selected";
		courseRef();
	}

	function tabProgram(){				//tab 切换编程语言
		type="20";
		_design.className="";
		this.className="selected";
		_program.hold=1;
		this.hold=0;					//hold  为自定义属性
		courseRef();
	}

	addEvent(_design,'click',tabDesign);
	addEvent(_program,'click',tabProgram);
	var pagesList = document.getElementById('pages').getElementsByTagName('li');
	var prev = pagesList[0];
	var next = pagesList[9];
	var nowNum=1;

	function clearPage(){
		for (var i = 1; i < 9; i++) {	//清除之前页数选中项
				pagesList[i].className = "";
			}
	}

	function selectPage(){
		clearPage();
		this.className="checked";		//设置当前页面页数显示
		pageNo = this.on;
		nowNum = pageNo;				//传入当前页面数
		courseRef();
		}

	function goNext(){
		if (++nowNum>=8) {				//超过最大页数时，则为最大页数
			nowNum=8;
		}
		clearPage();
		pageNo = nowNum;
		pagesList[nowNum].className="checked";
		courseRef();
	}

	function goPrev(){
		if (--nowNum<=1) {				//小于最小页数时，则为最小页数
			nowNum=1;
		}
		clearPage();
		pageNo = nowNum;
		pagesList[nowNum].className="checked";
		courseRef();
	}

	for (var i = 1; i < 9; i++) {
		pagesList[i].on = i;			//自定义属性 on  判断选中的页数
		addEvent(pagesList[i],'click',selectPage); 
	}

	addEvent(next,'click',goNext);		//添加向前点击事件
	addEvent(prev,'click',goPrev);		//添加向后点击事件

//``````````````````````````````````````````````````````````````````````````````````

	/*排行榜*/
	var m = 0, n = 10;
	function reList(){

		document.getElementById("hotList").innerHTML="";			//刷新前清除以前的内容
		if (m==10&&n==20) {
			m = 0;
			n = 10;
		};
		ajax({
	    method : 'get',
	    url : 'http://study.163.com/webDev/hotcouresByCategory.htm',
	    data :null,
	    success : function (data) {
	        console.log(data);
	        var _data= JSON.parse(data);
	        var oDiv = document.getElementById("hotList");
	 
	        for(i = m ;i < n ;i++){
	            var oLi = document.createElement("li");
	            oDiv.appendChild(oLi);
	 
	            var _img = document.createElement("img");
	            var _name = document.createElement("p");
	            var _count = document.createElement("span");

	            _img.setAttribute("src", _data[i].smallPhotoUrl);
	            _name.innerHTML=_data[i].name;
	            _count.innerHTML=_data[i].learnerCount;
	 
	            oLi.appendChild(_img);
	            oLi.appendChild(_name);
	            oLi.appendChild(_count);
	        
	            _count.setAttribute('class','pCount');
	        	}
	    	},
	    async : true
		});
		m++;
		n++;
	}
	setInterval(reList,5000);

	/*视频的弹出与关闭*/
/*关闭视频*/
	var videoClose = document.getElementById("videoClose");    //关闭视频节点		
	var videoPlay = document.getElementById("videoPlay");		//视频播放节点
	var video = document.getElementById('video');
	var videoShut=function(){
		filter.style.display = "none";
		videoPlay.style.display = "none";
		video.pause();
	}
	/*点击打开视频*/
	var videoPic = document.getElementById('videoPic');
	var videoOpen = function() {
		filter.style.display = "block";
		videoPlay.style.display = "block";
		video.load();				//视频重新载入，重新开始
		video.volume=0.2;
	}
	
	addEvent(videoPic,'click',videoOpen);		//触发点击事件打开视频
	addEvent(videoClose,'click',videoShut);		//关闭视频
}




