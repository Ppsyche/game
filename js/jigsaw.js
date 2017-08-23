window.onload = function () {
    (function () {
        var oImgBox = document.getElementById('img-box');
        var aImg = oImgBox.getElementsByTagName('img');

        function random() {  //随机图片
           var aImage = [1, 2, 3, 4, 5, 6, 7, 8, 9];
           aImage.sort(function () {
               return Math.random() - 0.5;
           });
           for (var i = 0; i < aImg.length; i++) {
               aImg[i].src = 'img/jigsaw/img' + aImage[i] + '.jpg';
           }
       }

       random();

        for (var i = aImg.length - 1; i >= 0; i--) {//改成定位
            aImg[i].style.left = aImg[i].offsetLeft + 'px';
            aImg[i].style.top = aImg[i].offsetTop + 'px';
            aImg[i].style.position = 'absolute';
            aImg[i].pos = {
                left: aImg[i].offsetLeft,
                top: aImg[i].offsetTop
            };
            drag(aImg[i]);
        }

        function drag(elem) {//绑拖拽

            elem.onmousedown = function (e) {
                e = e || event;
                var iDisX = e.clientX - elem.offsetLeft;
                var iDisY = e.clientY - elem.offsetTop;

                document.onmousemove = function (e) {
                    e = e || event;
                    var iLeft = e.clientX - iDisX;
                    var iTop = e.clientY - iDisY;
                    elem.style.top = iTop + 'px';
                    elem.style.left = iLeft + 'px';
                    collide = [];
                    for (var i = 0; i < aImg.length; i++) {
                        if (aImg[i] == elem) {
                            continue;
                        }
                        var isCol = checkCollide(elem, aImg[i]);
                        if (isCol) {
                            collide.push(aImg[i]);
                        }
                    }
                    if (collide) {
                        nearElem = nearest(elem);
                    } else {
                        nearElem = null;
                    }
                    return false;
                };

                document.onmouseup = function () {
                    document.onmousemove = null;
                    if (nearElem) {
                        animate(elem, nearElem.pos);
                        animate(nearElem, elem.pos);
                        var tmpPos = elem.pos;
                        elem.pos = nearElem.pos;
                        nearElem.pos = tmpPos;
                        nearElem = null;
                    } else {
                        animate(elem, elem.pos);
                    }

                };
            }
        }

        function checkCollide(elem, target) {
            var elemR = elem.offsetLeft + elem.offsetWidth,
                elemB = elem.offsetTop + elem.offsetHeight,
                elemT = elem.offsetTop,
                elemL = elem.offsetLeft;
            var targetR = target.offsetLeft + target.offsetWidth,
                targetB = target.offsetTop + target.offsetHeight,
                targetT = target.offsetTop,
                targetL = target.offsetLeft;
            return !(elemR < targetL || elemB < targetT || elemL > targetR || elemT > targetB);
        }


        function nearest(elem) {
            var minDis = 9999;
            var index = -1;
            for (var i = 0; i < collide.length; i++) {
                var x = collide[i].offsetTop - elem.offsetTop;
                var y = collide[i].offsetLeft - elem.offsetLeft;
                var iDis = Math.sqrt(x * x + y * y);
                if (iDis < minDis) {
                    minDis = iDis;
                    index = i;
                }
            }
            return collide[index];
        }

        function animate(elem, attr, callback){//动画
            clearInterval(elem.timer);
            elem.timer = setInterval(function(){
                var bStop = true;//一个标识位，true代表可以停止定时器，false代表不可不停止
                for(var prop in attr){//1:width
                    var curr = parseInt(getStyle(elem, prop));
                    if(prop == 'opacity'){
                        curr = parseInt(getStyle(elem, prop)*100);
                    }
                    var speed = (attr[prop] -  curr) / 8;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                    if(curr != attr[prop]){
                        bStop = false;
                    }
                    
                    if(prop == 'opacity'){
                        elem.style.opacity = (curr + speed) / 100;
                        elem.style.filter = 'alpha(opacity='+(curr + speed)+')';
                    }else{
                        elem.style[prop] = curr + speed + 'px';
                    }
                }
                if(bStop){
                    clearInterval(elem.timer);
                    callback && callback();
                }
            }, 30);
        }

        function getStyle(elem, attr){
            if(elem.currentStyle){//IE
                return elem.currentStyle[attr];
            }else{
                return getComputedStyle(elem, false)[attr];
            }
        }
    })();
};