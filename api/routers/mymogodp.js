

      //连接表
      module.exports=function collection(db,attr,data,fn){
        //连接数据库
        db.open(function(err,db){
       
                    if(err){
                        console.log(err);
                       }

              
        db.collection('user_regist',{safe:true},function(err,collection){
            console.log(66);
            if(err){
                console.log(err);
            }else{
         
                    
                var obj={  
                    //增
                    insert: function(data){
                        collection.insert(data,{safe:true},function(err,result){

                              db.close();
                                 var aa=fn;
                              if(String(typeof fn) == 'function'){
                                  aa(result);
                            }
                               
                             
                        })
                    },
                    //删
                    dele:function(data){
                        collection.remove(data,{safe:true},function(err,result){
                               db.close();
                                  var aa=fn;
                              if(String(typeof fn) == 'function'){
                                  aa(result);
                            }
                           
                                
                        })
                    },
                    //查
                    find:function(data){
                        var res;
                      collection.find(data).toArray(function(err,result){
                           
                               db.close();
                                  var aa=fn;
                              if(String(typeof fn) == 'function'){
                                  aa(result);
                            }
                             
                              
                         });
                      
                    },
                    //改
                    update:function(data){
                        collection.update(data[0],{$set:data[1]},function(err,result){
                          db.close();
                             var aa=fn;
                              if(String(typeof fn) == 'function'){
                                  aa(result);
                            }
                              
                          
                        })
                    }
                }


                obj[attr](data);
                
            }
        })
    })
  
}