
var iScale = 1;
iScale = iScale/window.devicePixelRatio;
document.write('<meta name="viewport" content="width=device-width, initial-scale='+ iScale +',minimum-scale='+ iScale +',maximum-scale='+ iScale +',user-scalable=0"/>');
var iWidth = document.documentElement.clientWidth;
var iHeight = document.documentElement.clientHeight;
document.getElementsByTagName("html")[0].style.fontSize = iWidth/16 + "px";

