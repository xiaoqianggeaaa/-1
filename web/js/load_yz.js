$(function(){
    $('.Cashier').on('click',function(e){
        var tar = e.target.nodeName.toLowerCase();
        // console.log(tar)
        if(tar == 'i' || tar == 'p' || tar == 'span' ){
            $('#content_right').text('');
            $('#content_right').load('payment.html')
            // $('#content_right').load('payment.html #payment')
        }
    })
})