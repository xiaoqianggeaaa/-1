$(function(){
    $('#li_btn').on('click',function(){

        $.post('http://localhost:88/login',{
            'user' : $('#li_inp1').val(),
            'password' :  $('#li_inp2').val()
        },function(data){
            if(data==="ok"){
                console.log(66);
                var date =new Date();
                date.setDate(date.getDate()+7);
                document.cookie="user="+$('#li_inp1').val()+";expires="+date.toLocaleDateString();
            }
        })
    })
})