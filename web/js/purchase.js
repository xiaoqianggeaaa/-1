// require.config({
// 	// baseUrl:'js'
// 	paths:{
// 		jquery:'jquery-3.2.1',
// 		global:'../lib/global',
// 	},
// 	shim:{
// 		load_ep:['jquery'],
// 		global:['jquery']
// 	}
// }); 

// require(['jquery','load_ep'],function($){
	$(function(){
		//生成结构
		var $table = $('<table/>');
		var $thead = $('<thead/>');	
		var  $tbody = $('<tbody/>');	
		$thead.html(`
			<tr>
				<th class="w1">进货单号</th>
				<th class="w2">供应商名称</th>
				<th class="w3">供应商编号</th>
				<th class="w4">商品类型</th>
				<th class="w5">商品名称</th>
				<th class="w6">付款方式</th>
				<th class="w7">进货价</th>
				<th class="w8">数量</th>
				<th class="w9">进货日期</th>
				<th class="set-ep">操作</th>
			</tr>
		`).appendTo($table);

		for(var i=1;i<=5;i++){
			var $tr = $('<tr/>').addClass('currTr');
			for(var j=1;j<=10;j++){
				var $td = $('<td/>').addClass('item').appendTo($tr);

				if(j===10){
					$td.text('');
					$td.append($('<button/>').addClass('del-ep').text('删除'));
				}else if(j===9){
					var date = new Date();
					date = date.toLocaleDateString();

					$td.text(date);
				}
			}
			$tr.appendTo($tbody);
		}
		$tbody.appendTo($table);
		$('.context').append($table);



		//供应商名称
		var supplierName =[];
		var goodsType = [];//进货类型
		var goodsName = [];//名称
		$.get('http://localhost:88/supplierList',{cz:"get"},function(res){
			for(var i=0;i<res.length;i++){
				supplierName.push(res[i].supplierName);
				goodsName.push(res[i].productName);
				if(goodsType.indexOf(res[i].productType)<0){
					goodsType.push(res[i].productType);
				}
			}
		})

		//进货单号
		var odd = [
			"6743213",
			"3513422",
			"0313453",
			"6321950",
			"2531343",
			"6782341",
			"1095832",
			"3943214",
			"3242342",
			"8241234",
			"0093124",
		];
		//支付方式
		var paymentType = ["支付宝付款","微信支付","银行转账","信用卡","现金支付"];

		//数量
		var qty = [50,100,150,200,250,300,350,400,450,500,550,600,650,700];

		//事件绑定
		$('tbody').on('click','td',function(i){
			var $idx= $(this).index();
			let _this = this;
			if($idx!==9){
				let $input = $('<input/>').addClass('ipt-ep');
				if($(this).text()!==""){
					$input.val($(this).text());
					$input.attr("data-val",$(this).text())
				}else{
					$input.val($input.attr("data-val"))
				}
				
				$(this).text('');
				if($idx==6||$idx==7){
					$input.appendTo(this).attr('type','number').focus();
				}else{
					$input.appendTo(this).attr('type','text').focus();
				}

				function createList(arr){
					var $div = $('<div/>').addClass('list-ep');
					arr.forEach(function(i){
						$('<P/>').appendTo($div).text(i);
					})
					$div.appendTo(_this);

					$('div p').addClass('acitve')
					return $div;
				}

				// 供应商名称
				if($idx===1){
					var $div = createList(supplierName);
				}else if($idx===0){
					var $div = createList(odd);
				}else if($idx===3){
					var $div = createList(goodsType);
				}else if($idx===5){
					var $div = createList(paymentType);
				}else if($idx===7){
					var $div = createList(qty);
				}else if($idx===4){
					var $div = createList(goodsName);
				}


				//高亮
				$('.list-ep').on('mouseover','p',function(){
					$(this).addClass('active').siblings().removeClass('active');
					let $txt = $(this).text();
					$input.val($(this).text());
				})	

				// 失去焦点，保存信息
				$input.on('blur',function(){
					$(_this).text($(this).val());
					if($div){
						$div.parent().remove($div);
					}
				});

				$('body').on('keydown',function(e){
					if(e.keyCode===13){
						$input.blur();
					}
				})


			}
		})

		//订单数据
		function getMess(){
			//获取内容
			var arr = [];
			var arrs = [];//用于接收全部订单信息
			var ide  =0;
			$('tr').each(function(i){
				if(i>0){
					$(this).find('td').each(function(j){
						if(j<9){
							arr.push($(this).text());//获取td中text
							if($(this).text()==""){
								ide++;
							}
						}

					})

					//用对象接收
					if(ide===0){
						var opt = {
						barcode:arr[0],
						supplierName:arr[1],
						supplierId:arr[2],
						goodsType:arr[3],
						goodsName:arr[4],
						paymentType:arr[5],
						getMoney:arr[6],
						qty:arr[7],
						data:arr[8],
						status:"待收货",
						};
						arrs.push(opt);
						//写入后清空
					}
					arr =[];
					ide=0;
				}
			})
			return arrs;
		}
		
		//删除
		$('tbody').on('click','.del-ep',function(){
			var $currTr = $(this).parent().parent();
			$currTr.remove();
		})

		$('.submit').on('click',function(){
			var a = getMess();
			if(a.length<=0){
				alert("信息有误！不可提交");
			}else{
				a = JSON.stringify(a);
				alert('提交成功！！！')
				$.get(`http://localhost:88/purchase`,{data:a},function(res){
					console.log(res);
				})
			}
			
		})

		//插入行
		$('.addTr').click(function(){
			var $tr = $('<tr/>');
			for(var j=1;j<=10;j++){
				var $td = $('<td/>').addClass('item').appendTo($tr);
				if(j===10){
					$td.text('');
					$td.append($('<button/>').addClass('del-ep').text('删除'));
				}else if(j===9){
					$td.text(new Date().toLocaleDateString());
				}
			}
			$tr.appendTo($tbody);
		})

		var $Mask = $('.Mask');
		var $register = $('.register');

		//供应商列表
		$('.supplierList-ep').on('click',function(){
			$.get('http://localhost:88/supplierList',{cz:'get'},function(res){
				Masked();
				centShow();
				$Mask.show();
				$register.fadeIn();
				$('.regis_main').html(res.map(function(item){
					return `<span class="enser">
						${item.supplierName}
					</span>`
				}));

				$('.enser').click(function(e){
					var val = $(this).text().trim();
					val = val+'';
					var data ={supplierName:val};
					data = JSON.stringify(data);

					$.get('http://localhost:88/supplierList',{data:data,cz:'get'},function(res){
						addTable(res);
					})
				})
			})
		})

		$('.secBtn').on('click',function(){
			var myVal = $('.search input').val();
			if(myVal===""){
				alert('内容不能为空')
			}else{
				var data ={supplierName:myVal};
				data = JSON.stringify(data);
				$.get('http://localhost:88/supplierList',{data:data,cz:'get'},function(res){
					console.log(res);
					if(res.length<=0){
						alert('您搜索不成功！');
						$('.search input').val('');
						$('.search input').focus();
					}else{
						Masked();
						centShow();
						$Mask.show();
						$register.fadeIn();
						addTable(res);
						$('.search input').val('');
						$('.search input').focus();
					}
				})
			}
		})


		/*----------------------------------------------*/
		//将单个商家写入表格
		function addTable(res){
			for(var i=0;i<res.length;i++){
				$('.regis_main').html('');
				for(var attr in res[i]){
					var $div = $('<div/>');
					if(attr!=='_id'){
						if(attr=='ID'){
							var label = '供应商编号 ：';
						}else if(attr=='supplierName'){
							var label = '供应商名称 ：'
						}else if(attr=='productName'){
							var label = '商品名称 ：'
						}else if(attr=='person'){
							var label = '联系人 ：';
						}else if(attr=='phone'){
							var label = '联系方式 ：';
						}else if(attr=='address'){
							var label = '地址 ：';
						}else if(attr=='bankAccount'){
							var label = '开户银行 ：';
						}else if (attr=='productType') {
							var label = '商品类型 ：';
						}

						$div.addClass('oitem').html(`
							<h4 class="fl fl1">
								${label}
							</h4>
							<p class="fl fl2">
								${res[i][attr]}
							</p>
						`)
					}
					
					$div.appendTo('.regis_main');
				}
			}

			var $btn = $('<button/>').addClass('add-td').appendTo('.regis_main').text('将信息写入表格');

			$btn.on('click',function(){
				var idx = -1;
				var arrm = [];

				$('.fl2').each(function(){
					arrm.push($(this).text().trim());
				})
				console.log(arrm);
				var allTr = $('tbody').find('tr');
				allTr.each(function(i){
					var currTd = $(this).find('td');

					currTd.each(function(j){
						if(j!==8 && j!==9){
							if($(this).text()!=""){
								idx = i;
								return;
							}
						}
					})
				})

			//将商家信息写入表格中
			allTr.eq(idx+1).find('td').eq(1).text(arrm[1]);
			allTr.eq(idx+1).find('td').eq(2).text(arrm[0]);
			allTr.eq(idx+1).find('td').eq(3).text(arrm[7]);
			allTr.eq(idx+1).find('td').eq(4).text(arrm[2]);

			
			// console.log(idx)

			$Mask.hide();
			$register.fadeOut();
			})
		}
		//遮罩
		function Masked(){
			$Mask.css({"height":window.innerHeight,"width":window.innerWidth});
		}

		//居中弹窗
		function centShow(){
			var width = $register.css("width");
			// width = width.slice(0,-2)*1;
			var top = window.innerHeight/2 - 468/2;
			var left = window.innerWidth/2 - width/2;

			$register.css('top',top);
			$register.css('left',left);
		}
		$('.regis_head').mousedown(function(e){
			var ox = e.offsetX;
			var oy = e.offsetY;

			document.onmousemove = function(event){
				var zleft = event.clientX - ox;
				var ztop = event.clientY - oy;

				$register.css("left",zleft)
				$register.css("top",ztop)
			}

			e.preventDefault();
		})
		//阻止传播
		$('.regis_dl').mousedown(function(e){
			e.stopPropagation();
		});
		
		document.onmouseup = function(){//鼠标松开
			document.onmousemove = null;
		}

		$('.regis_dl').click(function(){
			$Mask.hide();
			$register.fadeOut();
		}) 

		window.onresize = function(){
			Masked();
			centShow();
		}
	}); 
// })
