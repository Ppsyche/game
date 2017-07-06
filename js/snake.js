var snake = [];
var l = 0;
var t = 0;
var keyPrev = 0;
var timer = null;
var score = 0;
var btn = true;
fountTable();
$('.btn').on('click',function(){
	if(btn){
		start();
		keyDown();
		btn = false;
	}
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
	$('td').removeClass('snake');
	for (var i = 0; i < snake.length; i++) {
		$('tr').eq(snake[i][0]).find('td').eq(snake[i][1]).addClass('snake');
	}
}
function start(){
	for(i=5; i<10; i++){
		snake.push([4,i]);
	}
	snakeLocation();
	randFood();
	move(0,1);
}
function ifFoodOnSnake(){
	for(var i=0; i<snake.length-1; i++){
		if(snake[i][0]==t&&snake[i][1]==l){
			return true;
		}
	}
	return false;
}
function randFood(){
	$('tr').eq(t).find('td').eq(l).removeClass('food');
	do{
		l = Math.floor(Math.random()*20);
		t = Math.floor(Math.random()*20);
	}while(ifFoodOnSnake());	
	$('tr').eq(t).find('td').eq(l).addClass('food');
}
function ifOver(){
	for(var i=0; i<snake.length-1; i++){
		if((snake[i][0]==snake[snake.length-1][0]&&snake[i][1]==snake[snake.length-1][1])
			||snake[snake.length-1][0]<0
			||snake[snake.length-1][0]>=20
			||snake[snake.length-1][1]<0
			||snake[snake.length-1][1]>=20){
			clearInterval(timer);
			alert('GAME OVER!');
			document.location.reload();
			return;
		}
	}
}
function move(shu,heng){
	clearInterval(timer);
	timer = setInterval(function(){
		snake.push([(snake[snake.length-1][0] + shu),(snake[snake.length-1][1] + heng)]);
		if((snake[snake.length-1][0]==t&&snake[snake.length-1][1]==l)){
			randFood();
			score+=2;
			$('#your-score').text('得分：'+score);
		}else{
			snake.shift();
		}
		ifOver();
		snakeLocation();
	},300);
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

