var score = 0;//得分
var gridNum = new Array();//每个小格的数值
newGame();
function newGame(){
	for (var i = 0; i < 4; i++) {
		gridNum[i] = new Array();
		for (var j = 0; j < 4; j++) {
			$("#grid"+i+j).css({"top": i*120+20,"left": j*120+20});
			gridNum[i][j] = 0;
		}
	}
	score = 0;
	$("#score").text(score);
	getANum();
	getANum();
	$("body").on("keydown",function(e){
		var id = e.keyCode;
		switch(id){
			case 37: 
				
				break;
			case 38: break;
			case 39: 
				for (var i = 0; i < 4; i++) {
					for (var j = 3; j >= 0; j--) {
						if(j != 3){
							gridNum[i][j+1] = gridNum[i][j];
							gridNum[i][j] = 0;
							$(".grid").eq(i*4+j+1).addClass("grid-num")
								.text(gridNum[i][j+1])
								.css("background",getNumBgColor(gridNum[i][j+1]));
							$(".grid").eq(i*4+j).removeClass("grid-num")
								.text(gridNum[i][j])
								.css("background",getNumBgColor(gridNum[i][j]));
						}
					}
				}
				break;
			case 40: break;
		}
	});
}
function getANum(){//找到一个空白位置，添加数字2，如果找不到，返回false
	var a = randomIntNum(0,3,4);
	var b = randomIntNum(0,3,4);
	for (var i = 0; i < a.length; i++) {
		for (var j = 0; j < b.length; j++) {
			if(gridNum[a[i]][b[j]] == 0){
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
    	case 0:
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
    }
    return color;
}


