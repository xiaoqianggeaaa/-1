         $(function(){

                       //添加管理员，会员
        var cookies=document.cookie;
        if(cookies!=""){//权限管理
                    cookies=cookies.split("=")[1];
                    cookies=JSON.parse(cookies);

            //查询管理员，会员
              $('#li_btn').on('click',function(){
                  
                    
                     $.post('http://localhost:8800/find',{
                            'user': $('#li_inp1').val(),
                            'date' : $('#li_inp2').val()

                                
                            },function(data){
                                var thecout=data;
                                $('.couts').html("共"+data.length+"条");
                                data.forEach(function(item){
                                    var tr =$('<tr/>').addClass('li_tr');
                                    $('<td/>').append($('<input/>').attr({
                                        'type':'checkbox',
                                        'checked':'checked'
                                    })).appendTo(tr);
                                    $('<td/>').html(item._id).appendTo(tr);
                                    $('<td/>').html(item.username).addClass('theuser').appendTo(tr);
                                    $('<td/>').html(item.sex).appendTo(tr);
                                    $('<td/>').html(item.phone).appendTo(tr);
                                    $('<td/>').html(item.email).appendTo(tr);
                                    $('<td/>').html(item.remark).appendTo(tr);
                                    $('<td/>').html(item.date).appendTo(tr);
                                    $('<td/>').html(1).appendTo(tr);
                                    $('<td/>').html('ok').appendTo(tr);
                                    $('<td/>').append($('<button/>').html('删除').addClass('isdeleit')).appendTo(tr);



                                        tr.appendTo($('#li_table'));
                                    })

                                $('.isdeleit').on('click',function(){

                                  if(cookies[1]=="超级管理员"){
                                        
                                        $(this).parent().parent().remove();
                                        $('.couts').html("共"+(thecout--)+"条");
                                       $.post('http://localhost:8800/dele',{
                                                'idx' : $(this).parent().parent().children()[1].innerHTML
                                       },function(data){
                                          
                                       })
                                   }else{
                                        alert("你没有此权限");
                                   }
                                })


                            });              


                })


 



                $('#li_isadd').on('click',function(){
                     console.log(66);
       
                    $('.isadd').html('');



                //判断输入格式
                if(!/^[a-z][\w]+$/ig.test($('#li_admin').val())){
                    $('.isadd').html('用户名输入格式有误');
                }else if($('#li_pas').val().search(/\s/ig)!=-1){
               
                     $('.isadd').html('密码不能存在空格');

                }else if($('#li_pas').val()!==$('#li_word').val()){
                     $('.isadd').html('两次输入的密码不一致');

                }else if(!/^[135874][\d]{10}$/.test($('#li_phone').val())){
                     $('.isadd').html('手机输入格式有误');

                }else if(!/^[a-z1-9][\w]+@[\w]+\.[\w]+$/ig.test($('#li_email').val())){
                     $('.isadd').html('邮箱输入格式有误');

                }
              
                
                setTimeout(function(){
                    if($('.isadd').html()==''){
                      var date= new Date();
                    
                     $.post('http://localhost:8800/save',{
                                'user':$('#li_admin').val(),
                                'password':$('#li_pas').val(),
                                'id': date.getTime(),
                                'sex' : '男',
                                'phone':$('#li_phone').val(),
                                'email' : $('#li_email').val(),
                                'role' : $('#li_role').val(),
                                'remark':$('#area').val()

                                
                            },function(data){
                                    if(data=='ok'){
                                        $('.isadd').html('添加成功！');
                                        $('#luru input').val('');
                                        $('#area').val('');
                                    }
                            });     
                        }   
                },500)

            
                });
                $('#isclose').on('click',function(){

                    $('#luru').fadeToggle();
                })
                $('#li_add').on('click',function(){
                     if(cookies[1]=="超级管理员"){
                            

                        $('#luru').fadeToggle(); }else{
                            alert("你没有此权限");
                        }
                })

            //批量删除与全选
        $('#all').on('click',function(){
       
            $('#li_table input[type="checkbox"]').each(function(idx,item){
                    item.checked=$('#all')[0].checked;
            })
        })
        $('#li_dele').on('click',function(){
          
            
         
            if(cookies[1]=="超级管理员"){
                    var arr=[];


                        $('.theuser').each(function(){
                                if(cookies[0]==$(this).html()){
                                    $('#li_popup').fadeToggle();
                                    $('#li_continue').on('click',function(){
                                       var date=new Date();
                                        date.setDate(date.getDate()-7);
                                        document.cookie="user="+cookies[0]+";expires="+date.toString()+";path=/";

                         $('#li_table input[checked="checked"]').each(function(idx,item){
                                    if(String(Number($(this).parent().next().html()))!='NaN'){
                                        arr.push($(this).parent().next().html());
                                        $(this).parent().parent().remove();
                                    }
                                })
                                    $('.couts').html("共"+0+"条");
                                var obj={};
                                obj.arr=arr;
                                console.log(obj);
                                $.post('http://localhost:8800/dele',{
                                    'isarr':arr
                                },function(data){
                          
                                     })

                                        location.href="http://localhost:8080/html/login.html";
                                        return;
                                        
                                    })
                                    $('#li_stop').on('click',function(){
                                      $('#li_popup').fadeToggle();
                                        return;
                                    })
                                }else{



                                        $('#li_table input[checked="checked"]').each(function(idx,item){
                                            if(String(Number($(this).parent().next().html()))!='NaN'){
                                                arr.push($(this).parent().next().html());
                                                $(this).parent().parent().remove();
                                            }
                                        })
                                            $('.couts').html("共"+0+"条");
                                        var obj={};
                                        obj.arr=arr;
                                        console.log(obj);
                                        $.post('http://localhost:8800/dele',{
                                            'isarr':arr
                                        },function(data){
                                  
                                             })
                                            return;
                                }
                        })

             }else{
                 alert("你没有此权限");
             }
        })

    }
 })  


