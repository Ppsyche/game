 function randomIntNum(min,max,num){//获取num个min~max之间的数字,min与max正负均可
	if(isNaN(min))
		min = 0;
	if(isNaN(max))
		max = 1;
	if(isNaN(num))
		num = 1;
	var result = [];
	var t = 0;
	while(t != num) {
		var p = Math.ceil(Math.random()*(max-min+1))+min-1;
		for (var i = 0; i < t; i++) {
			if(p == result[i])
				break;
		}
		if(i >= t){
			result.push(p);
			t++;
		}
	}
	return result;
}
 function crosswise(locat,num){//判断横排是否存在相同值
	var t = Math.floor(locat/9)*9;
	for (var i = 0; i < 9; i++) {
		if(aTh[t+i].innerHTML == num && t+i != locat)
			return false;
	}
	return true;
}
function vertical(locat,num){//判断竖排是否存在相同值
	var t = locat % 9;
	for (var i = 0; i < 9; i++) {
		if(aTh[i*9+t].innerHTML == num && i*9+t != locat)
			return false;
	}
	return true;
}
function module(locat,num){//判断宫内是否存在相同值
	var t1 = Math.floor(Math.floor(locat/9)/3);
	var t2 = Math.floor(locat%9/3);
	for (var i = 0; i < 3; i++) {
		for(var j = 0; j<3; j++){
			if(aTh[t1*27+t2*3+i*9+j].innerHTML == num && t1*27+t2*3+i*9+j != locat)
				return false;
		}
	}
	return true;
}
function produce(n){//产生一个合法的数字（递归产生一个合法的九宫格）
	if(n > 80)
		return true;
	var num = randomIntNum(1,9,9);
	for (var i = 0; i < 9; i++) {
		aTh[n].innerHTML = num[i];
		if(crosswise(n,num[i])&&vertical(n,num[i])&&module(n,num[i])){
			if(produce(n+1)){
				return true;
			}
		}
	}
	return false;
}
function mistake(){	//判断纵横宫内是否有相同的数字
	for (var i = 0; i < aTh.length; i++) {
		aTh[i].style.color = "black";
		for(var j = Math.floor(i/9)*9; j < (Math.floor(i/9)+1)*9; j++){
			if(aTh[i].innerHTML == aTh[j].innerHTML && i!=j){
				aTh[i].style.color = "red";
				break;
			}
		}
		for(var j = 0; j < 9; j++){
			if(aTh[i].innerHTML == aTh[j*9+i%9].innerHTML && i!=j*9+i%9){
				aTh[i].style.color = "red";
				break;
			}
		}
		var t1 = Math.floor(Math.floor(i/9)/3);
		var t2 = Math.floor(i%9/3);
		for(var j = 0; j < 3; j++){
			for(var k = 0; k < 3; k++){
				if(aTh[i].innerHTML == aTh[t1*27+t2*3+j*9+k].innerHTML && i!=t1*27+t2*3+j*9+k){
					aTh[i].style.color = "red";
					break;
				}
			}

		}
	}
}
function getClass(clsName,context){//在context下获取class为clsName的元素数组
	var result = [];
	context = context || document;
	var arr = context.getElementsByTagName('*');
	var reg = new RegExp('\\b'+clsName+'\\b');
	for(var i=0; i<arr.length; i++){
		// if(arr[i].className.indexOf(clsName) != -1){
		if(reg.test(arr[i].className)){
			result.push(arr[i]);
		}
	}
	return result;
}
function clear(){//清除表格内的内容
	for (var i = 0; i < aTh.length; i++) {
		aTh[i].innerHTML = "";
		aTh[i].style.backgroundColor = "#fff";
		aTh[i].index = 0;
		aTh[i].style.color = "black";
		aTh[i].onmousedown = function(){}
	}
}
function Refresh(locat){	
	while(!produce(0)){//生成一个合法的九宫格
		for (var i = 0; i < aTh.length; i++) {
			aTh[i].innerHTML = "";
		}
	}
	for (var i = 0; i < locat.length; i++) {//将被选中位置的背景改为灰色并改变index值
		aTh[locat[i]].style.backgroundColor = "#D3D3D3";
		aTh[locat[i]].index = aTh[i].innerHTML;	
	}
	for (var i = 0; i < aTh.length; i++) {//给未被选中的位置绑点击事件
		if(!aTh[i].index){
			aTh[i].innerHTML = "";
			aTh[i].onmousedown = function(e){	
				var btnNum = e.button;
				switch(btnNum){
					case 0:
						if(this.innerHTML=='' || this.innerHTML=='9')
							this.innerHTML = 1;
						else
							this.innerHTML++;
						break;
					case 2:
						if(this.innerHTML=='' || this.innerHTML=='1')
							this.innerHTML = 9;
						else
							this.innerHTML--;
						break;
					default:
						this.innerHTML = 5;
						break;
				}
				mistake();
				win();
			}
		}
	}
}
function win(){//判断是否胜利
	var a=true;
	for (var i = 0; i < aTh.length; i++) {
		if(aTh[i].style.color=="red"||aTh[i].innerHTML==""){
			a=false;
		}
	}
	if(a){
		oText.innerHTML = "恭喜你获得胜利，是否开始新的一局";
		popup(n);
	}
}
function popup(m){//弹层的点击事件
	oPopup.style.display = "block";
	aPopBtn[0].onclick = function(){
		oPopup.style.display = "none";
	}
	aPopBtn[1].onclick = function(){
		oPopup.style.display = "none";
		locat = randomIntNum(0,80,m);
		n=m;
		clear();
		Refresh(locat);
	}
	aPopBtn[2].onclick = function(){
		oPopup.style.display = "none";
	}
}
var oTable = document.getElementsByTagName('table')[0];
aTh = document.getElementsByTagName('th');
var oBtnBox = document.getElementById('btn-box')[0],
aBtn = getClass('btn',oBtnBox);
oPopup = document.getElementById('popup-box');
// var oBtnBx = getClass('bt-box',oPopup)[0];
aPopBtn = oPopup.getElementsByTagName('span');
oText = getClass('text',oPopup)[0];
n = 50;
for (var i = 0; i < aTh.length; i++) {//将网格分为9大块（黑线）
	if((i+1) % 3 == 0)
		aTh[i].style.borderRight = "4px solid black";
	if(((i/9)+1) % 3 < 1)
		aTh[i].style.borderBottom = "4px solid black";
	if(i < 9)
		aTh[i].style.borderTop = "4px solid black";
	if(i%9 == 0)
		aTh[i].style.borderLeft = "4px solid black";
}

window.onload = function(){//取消鼠标原有的事件
	oTable.oncontextmenu = function(e){
		e.preventDefault();
	}
	oTable.onmousedown = function(e){
		e.preventDefault();
	}
	oPopup.oncontextmenu = function(e){
		e.preventDefault();
	}
	oPopup.onmousedown = function(e){
		e.preventDefault();
	}
}
var locat = randomIntNum(0,80,n);
Refresh(locat);
for (var j = 0; j < aBtn.length; j++) {
	aBtn[j].index = j;
	aBtn[j].onclick = function(){
		oText.innerHTML = "是否放弃本局,放弃后将不能撤回";
		switch(this.index){
			case 0:popup(50);break;
			case 1:popup(35);break;
			case 2:popup(20);break;
		}
	}
}