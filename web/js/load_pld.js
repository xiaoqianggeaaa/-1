$(function(){

    $('.second').on('click','li',function(e){
        var target = e.target;
        if(target.innerHTML == '产品列表'){
            $('#content_right').html('');
            $('#content_right').load('../html/products.html');
        }
        if(target.innerHTML == '库存管理'){
            $('#content_right').html('');
            $('#content_right').load('../html/repertory.html');
        }
        if(target.innerHTML == '上架管理'){
            $('#content_right').html('');
            $('#content_right').load('../html/putaway.html');
        }
    })
    $('#tuihuo').click(function(){
        $('#content_right').html('');
        $('#content_right').load('../html/salesreturn.html');
    })
})