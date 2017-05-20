var num = randomIntNum(0,17,18);
var b = false;
var eq =  new Array();
for (var i = 0; i < 9; i++) {
	var n = Math.floor(Math.random()*10)+1;
	$(".back").eq(num[i]).css("background","url(img/ffl/img"+n+".jpg) no-repeat -25px -25px");
	$(".back").eq(num[17-i]).css("background","url(img/ffl/img"+n+".jpg) no-repeat -25px -25px");
	eq[num[i]] = n;
	eq[num[17-i]] = n;
}
$("div.front").on("click",function(){
	$(this).css({'z-index': '1',
				'transform': 'rotateY(180deg)'})
			.parent().find(".back")
			.css({'z-index': '2',
				'transform': 'rotateY(0deg)'});
	if(b){
		if(eq[$("div.front").index($(".true"))] != eq[$("div.front").index($(this))]){
			$(this).css({'z-index': '2',
						'transform': 'rotateY(0deg)'})
					.parent().find(".back")
					.css({'z-index': '1',
						'transform': 'rotateY(180deg)'});
			$(".true").css({'z-index': '2',
						'transform': 'rotateY(0deg)'})
					.parent().find(".back")
					.css({'z-index': '1',
						'transform': 'rotateY(180deg)'});
		}
		$(".true").removeClass("true");
		b = false;
	}else{
		b = true;
		$(this).addClass("true");
	}
});