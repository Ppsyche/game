//玩家
var player = 1;
//玩家落子的位置
var player1 = [];
var player2 = [];
//赢的条件
var win = [ [0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6] ];
$(".again").on("click",function(){//重新开始
	player = 1;
	player1 = [];
	player2 = [];
	for(var i=0; i<9; i++){
		$(".chessboard div").eq(i).html("");
	}
	$(".hint").html("该玩家1下了");
	$(".win").hide();
});
$(".chessboard div").on("click",function(){
	if($(this).html()==""){
		if(player==1){
			$(this).html("x").css("color","#050504");
			player1.push($(this).index());
			if(iswin(player1)){
				$(".hint").html("游戏结束");
				$(".win").show().html("玩家1获得了胜利");
			}else{
				player = 2;
				$(".hint").html("该玩家2下了");
			}
		}else{
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
	if(player1.length+player2.length==9){
		$(".hint").html("游戏结束");
		$(".win").show().html("平局");
	}
});
function iswin(play){
	var num = 0;
	for (var i = 0; i < win.length; i++) {
		for (var j = 0; j < 3; j++) {
			for (var k = 0; k < play.length; k++) {
				if(win[i][j]==play[k]){
					num++;
				}
			}
		}
		if(num==3){
			return true;
		}
		num=0;
	}
	return false;
}
