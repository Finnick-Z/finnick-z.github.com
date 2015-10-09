//电商网站js
$(function () {
		
		//搜索切换
		(function(){

			var aLi = $('#menu li');
			var oText = $('.form').find('.text');
			var arrText = [
				'例如：荷棠鱼坊烤鱼 或日本料理',
				'例如:昌平区育新路2号路609室',
				'例如：万达影院双人卷',
				'例如：东莞出事了',
				'例如：北京初春降雪，天气变换莫测'
				]
			var iNow = 0;
			oText.val(arrText[iNow]);

			aLi.each(function(index){
				$(this).click(function(){
					aLi.attr('class','gradient');
					$(this).attr('class','active');
					iNow = index;
					oText.val(arrText[iNow]);
				});
			});	

			oText.focus(function(){

				if ($(this).val()==arrText[iNow]) {
					$(this).val('');
				};
			oText.blur(function(){

				if ($(this).val()=='') {
					$(this).val(arrText[iNow]);
				};
			})
				
			})
		})();

		//update滚动
		(function(){
			var oDiv = $('.update');
			var oUl = oDiv.find('ul');
			var str = '';
			var iH = 0;
			var iNow = 0;
			var arrData = [
				{ 'name':'萱萱', 'time':4, 'title':'那些灿烂华美的瞬间' },
				{ 'name':'畅畅', 'time':5, 'title':'广东3天抓获涉黄疑犯' },
				{ 'name':'萱萱', 'time':6, 'title':'国台办回应王郁琦' },
				{ 'name':'畅畅', 'time':7, 'title':'那些灿烂华美的瞬间' },
				{ 'name':'萱萱', 'time':8, 'title':'那些灿烂华美的瞬间', },
				{ 'name':'畅畅', 'time':9, 'title':'广东3天抓获涉黄疑犯' },
				{ 'name':'萱萱', 'time':10, 'title':'国台办回应王郁琦' },
				{ 'name':'畅畅', 'time':11, 'title':'那些灿烂华美的瞬间' }
			];
			var timer = null;
			var oBtnUp = $('#updateUp');
			var oBtnDown = $('#updateDown');
			
			for (var i = 0; i < arrData.length; i++) {
				str += '<li><a href="#"><strong>'+arrData[i].name+'</strong> <span>'+arrData[i].time+'分钟前</span> 写了一篇新文章：'+arrData[i].title+'</a></li>'
				};
			
			oUl.html(str);
			iH = oUl.find('li').height();
			
			oBtnUp.click(function(){
				doMove(-1);
			})
			oBtnDown.click(function(){
				doMove(1);
			})
			function autoPlay(){
				timer = setInterval(function(){
					doMove(1);	
				},3000)
			}
			autoPlay();
			oDiv.hover(function(){
				clearInterval(timer);
			},autoPlay)

			function doMove(num){
				iNow += num;
				if (iNow > arrData.length-1) {
					iNow = 0;
				}else if(iNow < 0){
					iNow = arrData.length-1;
				}
				oUl.stop().animate({'top':iH*-iNow},1800,'elasticOut');
			}
		})();

		//options选项卡切换
		(function(){

			fnTab($('.tabNav1'),$('.tabCon1'),'click');
			fnTab($('.tabNav2'),$('.tabCon2'),'click');
			fnTab($('.tabSmaNav1'),$('.tabSmaCon1'),'mouseover');
			fnTab($('.tabSmaNav2'),$('.tabSmaCon2'),'mouseover');
			function fnTab(oNav,aCon,ev){

				var aElem = oNav.children();
				aCon.hide().eq(0).show();
				aElem.each(function(index){
					$(this).on(ev,function(){
						aElem.removeClass('active').addClass('gradient');
						$(this).removeClass('gradient').addClass('active');
						aElem.find('a').attr('class','triangle_gray');
						$(this).find('a').attr('class','triangle_down');

						aCon.hide().eq(index).show();
					})
				})
			}
		})();

		//自动播放的焦点图
		(function(){
			var oDiv = $('#fade');
			var aUlLi = oDiv.find('ul li');
			var aOlLi = oDiv.find('ol li');
			var oP = oDiv.find('p');
			var arr = ['爸爸去哪啦~','人像摄影中的光影感','娇柔妩媚，美艳大方'];
			var iNow = 0;
			var timer = null;
			fnFade();
			
			function fnFade(){
				aUlLi.each(function(i){
					if (i!=iNow) {
						aUlLi.eq(i).fadeOut().css('zIndex',1);
						aOlLi.eq(i).removeClass('active');
					}else {
						aUlLi.eq(i).fadeIn().css('zIndex',2);
						aOlLi.eq(i).addClass('active');
					};
					oP.text(arr[iNow]);	
				})
			}
			oDiv.hover(function(){
					clearInterval(timer);
				},function(){
					autoPlay();
				})

			aOlLi.click(function(){
				iNow = $(this).index();
				fnFade();
			});
			function autoPlay(){
				timer = setInterval(function(){
					iNow++;
					iNow%=arr.length;
					fnFade();
				},1000);	
			}
			autoPlay();	
		})();

		//calendar
		(function(){
			var aSpan = $('.calendar h3 span');
			var aImg = $('.calendar .img ');
			var oPrompt = $('.box');
			var oImg = $('.calendar .img img');
			var oTitle = $('.calendar .text strong');
			var oText = $('.calendar .text').find('p');
			aImg.hover(function(){
				var iTop = $(this).parent().position().top - 35;
				var iLeft = $(this).parent().position().left + 55;
				var index = $(this).parent().index()%aSpan.size();

				oPrompt.css({'top':iTop,'left':iLeft});
				oText.text($(this).attr('info'));
				oImg.attr('src',$(this).attr('src'));
				oTitle.text(aSpan.eq(index).text());
				oPrompt.show();

			},function(){
				oPrompt.hide();
			})
		})();

		//BBS划过显示
		(function(){

			$('.BBS ol li').hover(function(){
				$('.BBS ol li').removeClass('active').eq($(this).index()).addClass('active');
			})
		})();
		
		//红人烧客
		(function(){
			var arr = [
				'',
				'用户1<br />人气1',
				'用户名：性感宝贝<br />区域：朝阳CBD<br />人气：124987',
				'用户3<br />人气3',
				'用户4<br />人气4',
				'用户5<br />人气5',
				'用户6<br />人气6',
				'用户7<br />人气7',
				'用户8<br />人气8',
				'用户9<br />人气9',
				'用户10<br />人气10'
			];
			$('.hot_area li').mouseover(function(){
				if ($(this).index()==0) {return};
				$('.hot_area li p').remove();
				$(this).append('<p style="width:'+($(this).width()-24)+'px;height:'+($(this).height()-18)+'px;">'+arr[$(this).index()]+'</p>')
			})
		})()



	})
