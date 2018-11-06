// JavaScript Document
var now = 0,
	aPage = $('.page'),
    ind = $('.page').length,
	h = $(window).height(),
	obj=new Image(),
	musicao = document.getElementsByClassName('musicaudio')[0],
	musicbtn = document.getElementsByClassName('musicbtn')[0],
	ssbtn = true,
	reindex = 0;
	fnScale();

//maodian
if(window.location.hash == ''){
	window.location.hash = '0'	
};
var hashal = window.location.hash.substring(1,window.location.hash.length);

//当改变窗口大小时
window.onresize = function(){
	fnScale();
}

$('.page').each(function(index){
   	$('.page').css('top',h);
	aPage.eq(Number(hashal)).css('top','0px');
	aPage.eq(Number(hashal)).css('display','block');
	
	/*向上滑动*/
	aPage.eq(index).on('swipeup', function()
	{	
		if( now >= aPage.length - 1 ){
			return;
		};
		fnPrev(now);
		now++;
		aPage.eq(now).addClass('active');
		ssbtn=true;
	});
	
	/*向下滑动*/
	aPage.eq(index).on('swipedown', function(){
		if( now <= 0 ) {
			return;
		};
		fnNext(now);
		now--;	
		aPage.eq(now).addClass('active');
		ssbtn=false;
	});
});

//返回键
$('.backClick').on('click' , function(){
	//alert(now)
	if( now <= 0 ) 
	{
		return;
	}
	fnNext(now);
	now--;	
	aPage.eq(now).addClass('active')
})

//返回首页
$('.homeClick').on('click' , function(){
	var nowNum = now;
	for(var i = 0; i < nowNum ; i++){
		if( now <= 0 ) 
		{
			return;
		}
		fnNext(now);
		now--;	
	}
	aPage.eq(now).addClass('active')
})

//背景音乐
$(document).bind('touchend' , function (event){
	musicao.play();
	$('.musicbtn').css({'background-position':'center 0px','-webkit-animation':'scaleBounce 0.6s infinite alternate','animation':'scaleBounce 0.6s infinite alternate'});
	$(document).unbind('touchend');
	event.preventDefault();
});
musicbtn.onclick= function(event){
	if( musicao.paused){
		musicao.play();	
		$('.musicbtn').css({'background-position':'center 0px','-webkit-animation':'scaleBounce 0.6s infinite alternate','animation':'scaleBounce 0.6s infinite alternate'});
	}else{
		musicao.pause();
		$('.musicbtn').css({'background-position':'center -47px','-webkit-animation':'rotateFlipDown 0.6s forwards','animation':'rotateFlipDown 0.6s forwards'});	
	};
};

/*上翻页*/
function fnPrev(now){
	if( now >= aPage.length - 1 ){
		return;
	};
	aPage.eq(now+1).css('top',h);
	aPage.eq(now+1).css('display','block');
	aPage.eq(now+1).stop().transition({top:"0%"},500,'ease-out',function(){
		aPage.eq(now).css('display','none');
		aPage.eq(now).css('top',-h);
		aPage.eq(now).removeClass('active');
			
	});
	window.location.hash = now+1;
};

/*下翻页*/
function  fnNext(now){
	aPage.eq(now-1).css('display','block');
	aPage.eq(now-1).css('top','0%');
	aPage.eq(now).stop().transition({top:h},500,'ease-out',function(){
		aPage.eq(now).removeClass('active');
		aPage.eq(now).css('display','none');
	});
	window.location.hash = now-1;
};

//loading
$(window).load(function(){
	$('.loading').fadeOut(300);
	$('.page').eq(Number(hashal)).addClass('active');
	now =Number(hashal);
	musicao.play();
});