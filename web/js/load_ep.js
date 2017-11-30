$(function(){
	$('.second').on('click','li',function(e){
		var target = e.target;
		if(target.innerHTML == '采购管理'){
			$('#content_right').html('');
			$('#content_right').load('../html/purchase.html',);
		}else if(target.innerHTML === '收货管理'){
			$('#content_right').html('');
			$('#content_right').load('../html/receiving.html',);
		}
	})
})