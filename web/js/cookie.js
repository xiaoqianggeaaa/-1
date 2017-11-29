$(function(){
        var cookies=document.cookie;
        if(cookies!=""){
            cookies=cookies.split("=")[1];
            cookies=JSON.parse(cookies);

           
            $('.users li').eq(2).html(cookies[0]+",你好");
             var date=new Date();
            $('.users li').eq(1).html(date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDay()+"日 "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds());

            setInterval(function(){
                var date=new Date();
                var min=date.getMinutes();
                var hour=date.getHours();
                var seconds=date.getSeconds();
                if(date.getMinutes()<10){
                     min="0"+date.getMinutes();
                }
                if(date.getSeconds()<10){
                     seconds="0"+date.getSeconds();
                }
                if(date.getHours()<10){
                    hour=date.getHours();
                }
             $('.users li').eq(1).html(date.getFullYear()+"年"+(date.getMonth()+1)+"月"+date.getDay()+"日 "+hour+":"+min+":"+seconds);

            }, 1000)
   

                //退出登录
                $('.isout').on('click',function(){
                        var date=new Date();
                        date.setDate(date.getDate()-7);
                        document.cookie="user="+cookies[0]+";expires="+date.toString()+";path=/";
                        location.href="http://localhost:88/html/login.html";
                })

        }

        $('#li_clear').on('click',function(){
            $('.li_tr').remove();
        })
})