/*main.js*/

/*btn设置*/
window.onload = function(){
	
	(function(){
	
		var oLink = document.getElementById("link");
		var oBtn = document.getElementById("btn")
		var onoff = 1;
		
		oLink.onclick = function(ev){
			
			var ev = ev || window.event;
			ev.preventDefault();
			if(onoff){
				oBtn.style.backgroundImage = "url(img/btn_bg2.png)";
				onoff = 0;
			}else{
				oBtn.style.backgroundImage = "url(img/btn_bg1.png)";
				onoff = 1;
			}
			

		}

	})()
	
	
	
}

