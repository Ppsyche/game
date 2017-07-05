// window.onload = function(){
// 	var oBtn=document.getElementById("btn");
// 	window.onkeydown=attachEvents;
// 	oBtn.onclick=function (e) {
// 		oBtn.blur();
// 		if (statenum==0) {
// 			start();
// 			statenum=1;
// 		} else if(statenum==1) {
// 			clearInterval(snaketimer);
// 			statenum=2;
// 		} else {
// 			snaketimer=setInterval(step,3000/speed);
// 			statenum=1;
// 		}
// 	}
// }
var snake = [];
var l = 0;
var t = 0;
var keyPrev = 0;
var timer = null;
fountTable();
$('.btn').on('click',function(){
	start();
	randFood();
	keyDown();
});







function fountTable(){
	$('<table>').appendTo($('.box'));
	for(var i=0; i<20; i++){
		$('<tr>').appendTo($('table'));
		// for(var j=0; j<20; j++){
		// 	$('<td>').appendTo($('tr').eq(i));
		// }
	}
	for(var i=0; i<20; i++){
		$('<td>').appendTo($('tr'));
	}
}
function snakeLocation(){
	for (var i = 0; i < snake.length; i++) {
		$('tr').eq(snake[i][0]).find('td').eq(snake[i][1]).css({'background':'#ff0'});
	}
	$('tr').eq(snake[snake.length-1][0]).find('td').eq(snake[snake.length-1][1]).css({'background':'#f00'});
}
function start(){
	for(i=5; i<10; i++){
		snake.push([4,i]);
	}
	snakeLocation();
}
function randFood(){
	l = Math.floor(Math.random()*21);
	t = Math.floor(Math.random()*21);
	$('tr').eq(t).find('td').eq(l).css({'background':'#0ff'});
}
function move(shu,heng){
	clearInterval(timer);
	timer = setInterval(function(){
		var st = snake[snake.length-1][0] + shu;
		var sl = snake[snake.length-1][1] + heng;
		for(var i=snake.length-1; i>0; i--){
			snake[i] = snake[i-1];
		}
		snake.push([st,sl]);
		var s = snake.shift();
		$('tr').eq(s[0]).find('td').eq(s[1]).css({'background':'#eee'});
		snakeLocation();
	},1000);
}
function keyDown(){
	$("body").on("keydown",function(e){
		var id = e.keyCode;
		switch(id){
			case 37: 
				if(keyPrev!=39){move(0,-1);}
				break;
			case 38: 
				if(keyPrev!=40){move(-1,0);}
				break;
			case 39: 
				if(keyPrev!=37){move(0,1);}
				break;
			case 40:
				if(keyPrev!=38){move(1,0);}
				break;
		}
		keyPrev=id;
	});
}

