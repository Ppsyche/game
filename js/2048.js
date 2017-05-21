var score = 0;//得分
var gridNum = new Array();//每个小格的数值
var gridBol = new Array();//每个小格的值在本次移动中是否被改变过
newGame();
$("#newGmBtn").on("click",function(){
	newGame();
})
function newGame(){
	for (var i = 0; i < 4; i++) {
		gridNum[i] = new Array();
		gridBol[i] = new Array();
		for (var j = 0; j < 4; j++) {
			$("#grid"+i+j).css({"top": i*120+20,"left": j*120+20});
			gridNum[i][j] = "";
		}
	}
	$(".grid-num").removeClass("grid-num")
		.text("")
		.css("background","#ccc0b3");
	score = 0;
	$("#score").text(score);
	getANum();
	getANum();
	$("body").on("keydown",function(e){
		var id = e.keyCode;
		for (var i = 0; i < 4; i++)
			for (var j = 0; j < 4; j++) 
				gridBol[i][j] = true;
		switch(id){
			case 37: 
				if(left()){getANum();}
				break;
			case 38: 
				if(up()){getANum();}
				break;
			case 39: 
				if(right()){getANum();}
				break;
			case 40:
				if(down()){getANum();}
				break;
		}
		
	});
}
function getANum(){//找到一个空白位置，添加数字2，如果找不到，返回false
	var a = randomIntNum(0,3,4);
	var b = randomIntNum(0,3,4);
	for (var i = 0; i < a.length; i++) {
		for (var j = 0; j < b.length; j++) {
			if(gridNum[a[i]][b[j]] == ""){
				gridNum[a[i]][b[j]] = 2;
				$(".grid").eq(a[i]*4+b[j]).addClass("grid-num")
					.text(gridNum[a[i]][b[j]])
					.css("background",getNumBgColor(gridNum[a[i]][b[j]]));
				return true;
			}
		}
	}
	return false;
}
function getNumBgColor(number){//数字对应的颜色
    var color="black";
    switch(number){
    	case "":
            color='#ccc0b3';
            break;
        case 2:
            color='#eee4da';
            break;
        case 4:
            color="#ede0c8";
            break;
        case 8:
            color='#f2b179';
            break;
        case 16:
            color="#f59563";
            break;
        case 32:
            color='#f67c5f';
            break;
        case 64:
            color="#f65e3b";
            break;
        case 128:
            color='#edcf72';
            break;
        case 256:
            color="#edcc61";
            break;
        case 512:
            color='#9c0';
            break;
        case 1024:
            color="#33b5e5";
            break;
        case 2048:
            color='#09c';
            break;
        case 4096:
            color='#5f9ea0';
            break;
        case 8192:
            color='#e9967a';
            break;
    }
    return color;
}
function left(){
	var bol = true;//是否还有能移动的方块
	var move = false;//是否有方块移动过
	while(bol){
		bol = false;
		for (var i = 0; i < 4; i++) {
			for (var j = 0; j < 4; j++) {
				if(j != 0 && gridNum[i][j] != ""){
					if(gridNum[i][j-1] == ""){
						bol = true;
						gridNum[i][j-1] = gridNum[i][j];
						gridNum[i][j] = "";
						leftChangeClass(i,j)
					}
					else if(gridNum[i][j] == gridNum[i][j-1] && gridBol[i][j] && gridBol[i][j-1]){
						bol = true;
						gridNum[i][j-1] += gridNum[i][j];
						gridNum[i][j] = "";
						leftChangeClass(i,j);
						gridBol[i][j-1] = false;
						$("#score").text(score+=gridNum[i][j-1]);
					}	
				}
			}
		}
		if( bol || move){move = true;}
	}
	return move;
}
function leftChangeClass(i,j){
	$(".grid").eq(i*4+j-1).addClass("grid-num")
		.text(gridNum[i][j-1])
		.css("background",getNumBgColor(gridNum[i][j-1]));
	$(".grid").eq(i*4+j).removeClass("grid-num")
		.text(gridNum[i][j])
		.css("background",getNumBgColor(gridNum[i][j]));
}
function up(){
	var bol = true;
	var move = false;
	while(bol){
		bol = false;
		for (var j = 0; j < 4; j++) {
			for (var i = 0; i < 4; i++) {
				if(i != 0 && gridNum[i][j] != ""){
					if(gridNum[i-1][j] == ""){
						bol = true;
						gridNum[i-1][j] = gridNum[i][j];
						gridNum[i][j] = "";
						upChangeClass(i,j)
					}
					else if(gridNum[i][j] == gridNum[i-1][j] && gridBol[i][j] && gridBol[i-1][j]){
						bol = true;
						gridNum[i-1][j] += gridNum[i][j];
						gridNum[i][j] = "";
						upChangeClass(i,j);
						gridBol[i-1][j] = false;
						$("#score").text(score+=gridNum[i-1][j]);
					}		
				}
			}
		}
		if( bol || move){move = true;}
	}
	return move;
}
function upChangeClass(i,j){
	$(".grid").eq((i-1)*4+j).addClass("grid-num")
		.text(gridNum[i-1][j])
		.css("background",getNumBgColor(gridNum[i-1][j]));
	$(".grid").eq(i*4+j).removeClass("grid-num")
		.text(gridNum[i][j])
		.css("background",getNumBgColor(gridNum[i][j]));
}
function right(){
	var bol = true;
	var move = false;
	while(bol){
		bol = false;
		for (var i = 0; i < 4; i++) {
			for (var j = 3; j >= 0; j--) {
				if(j != 3 && gridNum[i][j] != ""){
					if(gridNum[i][j+1] == ""){
						bol = true;
						gridNum[i][j+1] = gridNum[i][j];
						gridNum[i][j] = "";
						rightChangeClass(i,j)
					}
					else if(gridNum[i][j] == gridNum[i][j+1] && gridBol[i][j] && gridBol[i][j+1]){
						bol = true;
						gridNum[i][j+1] += gridNum[i][j];
						gridNum[i][j] = "";
						rightChangeClass(i,j);
						gridBol[i][j+1] = false;
						$("#score").text(score+=gridNum[i][j+1]);
					}		
				}
			}
		}
		if( bol || move){move = true;}
	}
	return move;
}
function rightChangeClass(i,j){
	$(".grid").eq(i*4+j+1).addClass("grid-num")
		.text(gridNum[i][j+1])
		.css("background",getNumBgColor(gridNum[i][j+1]));
	$(".grid").eq(i*4+j).removeClass("grid-num")
		.text(gridNum[i][j])
		.css("background",getNumBgColor(gridNum[i][j]));
}
function down(){
	var bol = true;
	var move = false;
	while(bol){
		bol = false;
		for (var j = 0; j < 4; j++) {
			for (var i = 3; i >= 0; i--) {
				if(i != 3 && gridNum[i][j] != ""){
					if(gridNum[i+1][j] == ""){
						bol = true;
						gridNum[i+1][j] = gridNum[i][j];
						gridNum[i][j] = "";
						downChangeClass(i,j)
					}
					else if(gridNum[i][j] == gridNum[i+1][j] && gridBol[i][j] && gridBol[i+1][j]){
						bol = true;
						gridNum[i+1][j] += gridNum[i][j];
						gridNum[i][j] = "";
						downChangeClass(i,j);
						gridBol[i+1][j] = false;
						$("#score").text(score+=gridNum[i+1][j]);
					}		
				}
			}
		}
		if( bol || move){move = true;}
	}
	return move;
}
function downChangeClass(i,j){
	$(".grid").eq((i+1)*4+j).addClass("grid-num")
		.text(gridNum[i+1][j])
		.css("background",getNumBgColor(gridNum[i+1][j]));
	$(".grid").eq(i*4+j).removeClass("grid-num")
		.text(gridNum[i][j])
		.css("background",getNumBgColor(gridNum[i][j]));
}