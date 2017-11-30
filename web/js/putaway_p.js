(function($){
    //获取页面元素
    var $tbody = $('tbody');
    var Tr = $tbody[0].children;

    //分页
    var $paging = $('#paging');
    var dataqty = 12;
    var currentpage = 0; 
    allproducts(dataqty,currentpage);
    var par;
    var obj;
    //加载页面获取所有商品数据
    function allproducts(dataqty,currentpage,obj){
        par = {readqty: dataqty, page:currentpage};
        par = Object.assign({},par,obj);
        $.post(global.apiBaseUrl+'products', par, function(_data){
            $tbody.html('');
            //显示当前页的数据
            var res = _data.data;
            $tbody.append($.map(res, function(item){
                return `<tr><td>${item.barcode}</td><td>${item.name}</td><td>${item.type}</td><td>${item.price}</td><td>${item.vipprice}</td><td>${item.repertory}</td><td><i>-</i><span>${item.putaway}</span><i>+</i></td><td>${item.status}</td><td><button>上架</button> <button>下架</button></td></tr>`
            }));
            //遍历tbody实现隔行换色分页
            for(var i=0;i<Tr.length;i++){
                if(i%2!=0){
                    Tr[i].classList.add('active');
                }
            }
        })
    }
    //分页
    page();
    function page(curpage,zsl){
        $.post(global.apiBaseUrl+'getproduct', zsl, function(_data){
            
            //显示页码
            var all = _data.data.length;
            var page_gs = Math.ceil(all/dataqty);
            $paging.html('');
            for(var i=0;i<page_gs;i++){
                var $span = $('<span/>').html(i+1);
                $span.appendTo($paging);
            }
            $paging.children('span').eq(0).addClass('gaol');
            $paging.css({width:page_gs*30});
            if(curpage){
                $paging.children('span').removeClass('gaol');
                $paging.children('span').eq(curpage).addClass('gaol');
            }
        })

    }
    //点击左右按钮
    var $pagebtn = $('.pagebtn');
    var idx = 0;
    $pagebtn.on('click','i',function(){
        var allidx = Math.ceil($paging.outerWidth()/120);
        if($(this).html() == '&gt;'){
            idx ++;
            if(idx>=allidx){
                idx = allidx-1;
            }
            $paging.css({left:-120*idx})
        }
        if($(this).html() == '&lt;'){
            idx --;
            if(idx<0){
                idx = 0;
            }
            $paging.css({left:-120*idx}) 
        }
    })
    
    //查询单个数据
    $('#refer').click(function(){
        var zhi = $('#tiaojian').val();
        var _name = $('#txt').val();
        if(_name == ''){
            return;
        }
        $tbody.html('');
        $paging.html('');
        obj = {};
        if(zhi == 'name'){
            obj = {name:_name};
        }else if(zhi == 'type'){
            obj = {type:_name};
        }else if(zhi == 'supplier'){
            obj = {supplier:_name};
        }else if(zhi == 'barcode'){
            obj = {barcode:_name};
        }else if(zhi == 'stocktime'){
            obj = {stocktime:_name};
        }
        
        currentpage = 0;
        $paging.css({left:0})
        allproducts(dataqty,currentpage,obj);
        page(currentpage,obj);
        qiehuan(dataqty,currentpage,obj);
    })

    //查询所有数据
    $('#allproducts').click(function(){
        obj = {};
        $tbody.html('');
        currentpage = 0;
        allproducts(dataqty,currentpage,obj);
        page(currentpage);
        $paging.css({left:0})
        $pagebtn.removeClass('pagenone');
        qiehuan(dataqty,currentpage,obj);
    })
    //查询所有上架数据
    $('#allputaway').click(function(){
        currentpage = 0;
        obj = {status:'上架'};
        allproducts(dataqty,currentpage,obj);
        page(currentpage,obj);
        $paging.css({left:0})
        $pagebtn.removeClass('pagenone');
        qiehuan(dataqty,currentpage,obj);
    })
    //查询所有未上架数据
    $('#noputaway').click(function(){
        currentpage = 0;
        obj = {status:''};
        allproducts(dataqty,currentpage,obj);
        page(currentpage,obj);
        $paging.css({left:0})
        $pagebtn.removeClass('pagenone');
        qiehuan(dataqty,currentpage,obj);
    })
    //上架、下架
    $tbody.on('click',function(e){
        var target = e.target;
        var currentTr = target.parentNode.parentNode;
        var repertorynum = currentTr.children[5].innerHTML;
        if(target.tagName.toLowerCase() == 'i'){
            if(target.innerHTML == '+'){
                var num = target.previousElementSibling.innerHTML;
                num++;
                repertorynum --;
                target.previousElementSibling.innerHTML = num;
                currentTr.children[5].innerHTML = repertorynum;
            }
            if(target.innerHTML == '-'){
                var num = target.nextElementSibling.innerHTML;
                num--;
                repertorynum ++;
                if(num <=0){
                   num = 0; 
                }
                target.nextElementSibling.innerHTML = num;
                currentTr.children[5].innerHTML = repertorynum;
            }
        }
        
        var nowNum = currentTr.children[6].children[1].innerHTML;
        //上架
        if(target.innerHTML == '上架'){
            var _barcode = currentTr.children[0].innerHTML;
            currentTr.children[7].innerHTML = '上架';
            var _updata = {barcode:_barcode,repertory:repertorynum,putaway:nowNum,status:'上架'}
            console.log(_updata);
            $.post(global.apiBaseUrl+'updateproduct', _updata, function(_data){
                console.log(_data);
            })
        }
        //下架
        if(target.innerHTML == '下架'){
            var _barcode = currentTr.children[0].innerHTML;
            //上架数量、库存数量
            currentTr.children[6].children[1].innerHTML = 0 ;
            currentTr.children[5].innerHTML = repertorynum*1+nowNum*1;
            currentTr.children[7].innerHTML = '';
            var _updata = {barcode:_barcode,repertory:repertorynum*1+nowNum*1,putaway:0,status:''}
            console.log(_updata);
            $.post(global.apiBaseUrl+'updateproduct', _updata, function(_data){
                console.log(_data);
            })
        }
    })
    //点击页码切换数据
    qiehuan(dataqty,currentpage,obj);
    function qiehuan(dataqty,currentpage,obj){
        $paging.on('click','span',function(){
            $paging.children('span').removeClass('gaol');
            currentpage = $(this).html()-1;
            $paging.children('span').eq(currentpage).addClass('gaol');
            allproducts(dataqty,currentpage,obj);
        })
    }
})(jQuery)