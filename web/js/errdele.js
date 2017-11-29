function errdele(){
            var cookies=document.cookie;
            cookies=cookies.split("=")[1];
            cookies=JSON.parse(cookies);

        $('.theuser').each(function(){
                if(cookies[0]==$(this).html()){
                    $('#li_popup').fadeToggle();
                    $('#li_continue').on('click',function(){
                       var date=new Date();
                        date.setDate(date.getDate()-7);
                        document.cookie="user="+cookies[0]+";expires="+date.toString()+";path=/";
                        location.href="http://localhost:88/html/login.html";
                        val=true;
                    })
                    $('#li_stop').on('click',function(){
                      $('#li_popup').fadeToggle();
                      
                      val=false;
                    })
                }
        })
      
}