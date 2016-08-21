/**
 * Created by Administrator on 2016/7/18.
 */
//headList:页面顶部鼠标移入移出效果；
/*
 需求：鼠标移上去的时候，dl显示，且dd字体变红；
 */
headList();
function headList(){
    var oDiv=document.getElementById('header');
    var aLi=oDiv.getElementsByTagName('li');
    for(var j=0;j<aLi.length;j++){
        aLi[j].index=j;
        if(aLi[j].className==='list'){
            aLi[j].onmouseover=function(){
                var dl=utils.getChildren(aLi[this.index],'dl')[0];
                    dl.style.display='block';

            };
            aLi[j].onmouseout=function(){
                var dl=utils.getChildren(aLi[this.index],'dl')[0];
                dl.style.display='none';
            }
        }
    }
}
//searchList：搜索栏下拉列表；
searchList();
function searchList(){
    var oInp=document.getElementById('text');
    var oKey=document.getElementById('hotkey');
    var oDiv=document.getElementById('list');
    var aLi=oDiv.getElementsByTagName('li');
    oInp.onkeyup=oInp.onmousedown=function(){
        oDiv.style.display='block';
        oInp.setAttribute('placeholder','');
        for(var i=0;i<aLi.length;i++){
            aLi[i].index=i;
            aLi[i].onmouseover=function(){
                this.className='show';
            };
            aLi[i].onmouseout=function(){
                this.className='';
            };
        }
        oKey.style.display='none';
    };
    document.body.onclick=function(e){
        e=e||window.event;
        var tar= e.target|| e.srcElement;
        if(tar.id==='text'){
            return;
        }
        if(tar.tagName.toLocaleLowerCase()==='span'&&tar.parentNode.parentNode.id==='list'){
            oInp.value=tar.innerHTML;
        }
        oDiv.style.display='none';
        oInp.setAttribute('placeholder','乐2');
        oKey.style.display='block';
    }
}

hover();
function hover(){
    var oDiv=document.getElementById('hover');
    var oUl=document.getElementById('ul');
    var aLi=utils.getByClass('li',oUl);

    /*console.log(aDiv);*/


    for(var i=0;i<aLi.length;i++){
 /*       aLi[i].index=i;
        aLi[i].onmouseover=function(){
            aDiv[0].style.display='block';
    };
        aLi[i].onmouseout=function(){
            aDiv[0].style.display='none';
        }*/
        (function(index){
            aLi[index].onmouseover=function(){
                var aDiv=utils.getByClass('same',aLi[index]);
                aDiv[0].style.display='block';
                console.log(index)
                console.log(aDiv[0])
            };
            aLi[index].onmouseout=function(){
                var aDiv=utils.getByClass('same',aLi[index]);
                aDiv[0].style.display='none';
            }
        })(i)
    }

}//???

lunbotu();
function lunbotu(){
    var oBox = document.getElementById('box');
    var oBoxInner = oBox.getElementsByTagName('div')[0];
    var aDiv = oBoxInner.getElementsByTagName('div');
    var aImg = oBoxInner.getElementsByTagName('img');
    var oUl = oBox.getElementsByTagName('ul')[0];
    var aLi = oBox.getElementsByTagName('li');
    var oBtnLeft = oBox.getElementsByTagName('a')[0];
    var oBtnRight = oBox.getElementsByTagName('a')[1];
    zhufengAnimate(aDiv[0], {opacity: 1}, 1000);
    var step = 0;
    var autoTimer = null;
    var interval = 2000;
    clearInterval(autoTimer);
    autoTimer = setInterval(autoMove, interval);
    function autoMove() {
        if (step >= aDiv.length - 1) {
            step = -1;
        }
        step++;
        setBanner();
    }

    function setBanner() {
        for (var i = 0; i < aDiv.length; i++) {
            var curEle = aDiv[i];
            if (i === step) {
                utils.css(curEle, 'zIndex', 1);
                zhufengAnimate(curEle, {opacity: 1}, 1000, function () {
                    var siblings = utils.siblings(this);
                    for (var k = 0; k < siblings.length; k++) {
                        utils.css(siblings[k], 'opacity', 0)
                    }
                });
                continue;
            }
            utils.css(curEle, 'zIndex', 0);
        }
        bannerTip();

    }
    function bannerTip() {
        for (var i = 0; i < aLi.length; i++) {
            var curEle = aLi[i];
            curEle.className = i === step ? 'bg' : '';
        }
    }
    oBox.onmouseover = function () {
        clearInterval(autoTimer);
        oBtnLeft.style.display = oBtnRight.style.display = 'block';
    };
    oBox.onmouseout = function () {
        autoTimer = setInterval(autoMove, interval);
        oBtnLeft.style.display = oBtnRight.style.display = 'none';
    };
    handleChange();
    function handleChange() {
        for (var i = 0; i < aLi.length; i++) {
            (function (index) {
                aLi[index].onclick = function () {
                    step = index;
                    setBanner();
                }
            })(i);
        }
    }
    oBtnLeft.onclick = function () {
        if (step <= 0) {
            step = aDiv.length;
        }
        step--;
        setBanner();
    };
    oBtnRight.onclick = autoMove;
}




