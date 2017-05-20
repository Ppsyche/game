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
