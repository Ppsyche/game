//玩家
var player = 1;
//玩家落子的位置
var player1 = [];
var player2 = [];
//模式
var mode=1;
//赢的条件
var win = [ [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6] ];


again();
$(".one").on("click",function(){
	mode=1;
	again();
})
$(".two").on("click",function(){
	mode=2;
	again();
})
$(".again").on("click",function(){//重新开始
	again();
});
$(".chessboard div").on("click",function(){
	if($(this).html()==""){
		if(player==1){
			$(this).html("x").css("color","#050504");
			player1.push($(this).index());
			if(iswin(player1)){
				$(".hint").html("游戏结束");
				$(".win").show().html("玩家1获得了胜利");
			}else if(player1.length+player2.length==9){
				$(".hint").html("游戏结束");
				$(".win").show().html("平局");
			}else if(mode==2){
				player = 2;
				$(".hint").html("该玩家2下了");
			}else{
				var c=computer();
				$(".chessboard div").eq(c).html("o").css("color","#f8f8f8");
				player2.push(c);
				if(iswin(player2)){
					$(".hint").html("游戏结束");
					$(".win").show().html("电脑获得了胜利");
				}
			}
		}else if(player==2&&mode==2){
			$(this).html("o").css("color","#f8f8f8");
			player2.push($(this).index());
			if(iswin(player2)){
				$(".hint").html("游戏结束");
				$(".win").show().html("玩家2获得了胜利");
			}else{
				player = 1;
				$(".hint").html("该玩家1下了");
			}
		}
	}else{
		$(".hint").html("请下在空白处");
	}
	
});
function again(){
	player = 1;
	player1 = [];
	player2 = [];
	for(var i=0; i<9; i++){
		$(".chessboard div").eq(i).html("");
	}
	$(".hint").html("该玩家1下了");
	$(".win").hide();
}
function iswin(play){
	var num = 0;
	for (var i = 0; i < win.length; i++) {
		for (var k = 0; k < play.length; k++) {
			if(win[i][0]==play[k]||win[i][1]==play[k]||win[i][2]==play[k]){
				num++;
			}
		}
		if(num==3){
			return true;
		}
		num=0;
	}
	return false;
}
function computer(){
	var playNum1 = 0;//玩家1连成的棋子数
	var playNum2 = 0;//玩家2连成的棋子数
	var play1 = [];//玩家1下一子受益最大的位置
	var play2 = [];//玩家2下一子受益最大的位置
	for (var i = 0; i < 9; i++) {
		if($(".chessboard div").eq(i).html()==""){
			for (var j = 0; j < win.length; j++) {
				//该获胜条件中有没有当前空位
				if(win[j][0]!=i&&win[j][1]!=i&&win[j][2]!=i){
					continue;
				}
				//player1下一子下在哪，所组成的长度最长
				var num=0;
				for(var k = 0; k < player1.length; k++ ){
					if(win[j][0]==player1[k]||win[j][1]==player1[k]||win[j][2]==player1[k]){
						num++;
					}
				}
				if(num>playNum1){
					playNum1=num;
					play1=[i];
				}else if(num==playNum1){
					play1.push(i);
				}
				//player2下一子下在哪，所组成的长度最长
				num=0;
				for(var k = 0; k < player2.length; k++ ){
					if(win[j][0]==player2[k]||win[j][1]==player2[k]||win[j][2]==player2[k]){
						num++;
					}
				}
				if(num>playNum2){
					playNum2=num;
					play2=[i];
				}else if(num==playNum2){
					play2.push(i);
				}
			}
		}
	}
	if(playNum1>playNum2){
		return findIndex(play1.concat(play2));
	}else{
		return findIndex(play2.concat(play1));
	}
}
function findIndex(play){//收益相同的情况下，出现次数最多的位置
	var count;
	var maxCount=0;
	var indx;
	var maxindx=-1;
	while(play.length){
		count=0;
		indx=play[0];
		for (var i = 0; i < play.length; i++) {
			if(indx==play[i]){
				count++;
				play.splice(i,1);
				console.log(play);
				i--;
			}
		}
		if(count>maxCount){
			maxCount=count;
			maxindx=indx;
		}
	}
	return maxindx;
}
