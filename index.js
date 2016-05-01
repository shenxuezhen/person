/**
 * Created by shxz on 2016/4/30.
 */
(function () {
    var person=document.getElementById("person");
    var oLis=document.querySelectorAll("#person>ul>li");
    var oDiv=document.getElementsByClassName("pBox");
//设计稿的宽和高
    var desW=640;
    var desH=960;
//设备的宽和高
    var winW=document.documentElement.clientWidth||document.body.clientWidth;
    var winH=document.documentElement.clientHeight||document.body.clientHeight;

   /* oDiv.style.width=winW-200+"px";
    oDiv.style.height=winH-200+"px";*/
    //计算缩放比例
    if(winW/winH<desW/desH){
        person.style.webkitTransform="scale("+winH/desH+")";
    }else {
        person.style.webkitTransform="scale("+winW/desW+")";
    }
    //给每个li绑定触发事件(touchsart,touchmove,touchend)
    [].forEach.call(oLis,function () {
        var oLi=arguments[0];
        oLi.index=arguments[1];
        oLi.addEventListener("touchstart",start,false);
        oLi.addEventListener("touchmove",move,false);
        oLi.addEventListener("touchend",end,false);
    })

    function start(e) {

        this.flag=true;
        //此处只需要获得触摸点即可
        this.startX=e.touches[0].pageX;
        this.startY=e.touches[0].pageY;
    }
    function move(e) {
        if(!this.flag)return
        //首先考虑的是默认滚动的行为
        e.preventDefault();
        //记录移动的目标
        var moveX=e.touches[0].pageX;
        var moveY=e.touches[0].pageY;
        var movePos=moveY-this.startY;
        //判断是移动还是点击
        if(Math.abs(moveX-this.startX)>Math.abs(movePos)){
            this.flag=false;
            return;
        }
        var index=this.index;
        var lastItem=oLis.length-1;
        //判断所有的元素,把除了自己的其它元素全部隐藏
        [].forEach.call(oLis,function () {
            if(index != arguments[1]){
                arguments[0].style.display = "none";
            }
            arguments[0].className = "";
            //arguments[0].firstElementChild.id = "";
        })
        //判断运动的方向
         var duration=null;

        if(movePos<0){//上滑
            this.prevsIndex=index==lastItem?0:index+1;
             duration=(480+movePos);
        }else if(movePos>0){//下滑
            this.prevsIndex=index==0?lastItem:index-1;
             duration=(-480+movePos);
        }
        oLis[this.prevsIndex].className ="zIndex";
        oLis[this.prevsIndex].style.display = "block";
        oLis[this.prevsIndex].style.webkitTransform = "translate(0,"+duration+"px)";
    }
    function end(e) {
        if (this.flag) {
            this.flag = false;
            //此时是滑动的,让上一张或者是下一张回到0,0的位置
            oLis[this.prevsIndex].style.webkitTransform = "translate(0,0)";
           /* this.style.display="none";*/
            oLis[this.prevsIndex].style.webkitTransition = "0.5s";
            oLis[this.prevsIndex].addEventListener("webkitTransitionEnd", function () {
                this.style.webkitTransition = "";
                this.style.webkitTransform="";
                this.flag=true;
                //增加执行动画的id名
                //this.firstElementChild.id = "a" + this.index
            }, false)

        }
    }
    document.addEventListener("touchmove",function () {},false)
})()
