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
                return `<tr><td>${item.barcode}</td><td>${item.name}</td><td>${item.type}</td><td>${item.specification}</td><td>${item.stockprice}</td><td>${item.repertory}</td><td>${item.supplier}</td><td><button>退货</button></td></tr>`
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

    //点击退货
    var vessel = document.getElementById('vessel');
    var zhez = document.getElementById('zhez');
    var redact = document.getElementById('redact');
    var input = redact.querySelectorAll('input');
    var BCbtn = redact.lastElementChild.children[0];

    $('tbody').on('click',function(e){
        var target = e.target;
        var currentTr = target.parentNode.parentNode;
        //修改商品数据
        if(target.innerHTML == '退货'){
            compile();
            //当前行里的信息输入给编辑表格
            for(var i=0;i<input.length;i++){
                input[i].value = currentTr.children[i].innerText;
                if(i==5){
                   input[i].value = 0; 
                }
            }
            var kushuliang = currentTr.children[5].innerText;
            //点击保存写入数据库以及表格
            var BCbtn = redact.lastElementChild.children[0];
            BCbtn.onclick = function(){
                redact.style.display = '';
                zhez.style.display = '';
                for(var i=0;i<input.length;i++){
                    currentTr.children[i].innerText = input[i].value;
                    if(i==5){
                       currentTr.children[i].innerText =  kushuliang - input[i].value;
                    }
                }
                var _updata = writeIn(currentTr);
                $.post(global.apiBaseUrl+'updateproduct', _updata, function(_data){
                    console.log(_data);
                })
            } 
        }
    })
    //遮罩效果
    function compile(){
        //遮罩的效果
        zhez.style.display = 'block';
        zhez.style.width = vessel.offsetWidth + 'px';
        zhez.style.height = vessel.offsetHeight + 'px';
        //编辑表格居中
        redact.style.display = 'block';
        redact.style.left = vessel.offsetWidth/2-redact.offsetWidth/2 + 'px';
        redact.style.top = vessel.offsetHeight/2-redact.offsetHeight/2 + 'px'; 
        for(var i=0;i<input.length;i++){
            input[i].value = '';
        }
    }
    //数据写入数据库
    function writeIn(currentTr){
        var newdata = {};
        newdata.name = currentTr.children[1].innerText;
        newdata.type = currentTr.children[2].innerText;
        newdata.specification = currentTr.children[3].innerText;
        newdata.barcode = currentTr.children[0].innerText;
        newdata.stockprice = currentTr.children[4].innerText;
        newdata.repertory = currentTr.children[5].innerText;
        newdata.supplier = currentTr.children[6].innerText;
        return newdata;
    }
    //隔行变色
    function interleave(){
        for(var j=0;j<Tr.length;j++){
            Tr[j].classList.remove('active');
            if(j%2!=0){
                Tr[j].classList.add('active');
            }
        }
    }
    //点击X退出redact
    var Xbtn = redact.firstElementChild.children[0];
    Xbtn.onclick = function(){
        redact.style.display = '';
        zhez.style.display = '';
    }
})(jQuery)