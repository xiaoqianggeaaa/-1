$(function(){


		$.get('http://localhost:88/purchase',{cz:"get"},function(res){
			if(res.length<=0){
				createHTML(null,1);
			}else{
				createHTML(res);
			}
			
			$('tbody').on('click','td',function(i){
				
				var $idx= $(this).index();

				let _this = this;
				if($idx!==8){
					let $input = $('<input/>').addClass('ipt-ep');
					if($(this).text()!==""){
						$input.val($(this).text());
						$input.attr("data-val",$(this).text())
					}else{
						$input.val($input.attr("data-val"))
					}
					
					$(this).text('');
					if($idx==5){
						$input.appendTo(this).attr('type','number').focus();
					}else{
						$input.appendTo(this).attr('type','text').focus();
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
						getTotal();
					});

					$('body').on('keydown',function(e){
						if(e.keyCode===13){
							$input.blur();
						}
					})
				}
			})

			//计算商品总数
			getTotal();
			function getTotal(){

				var total = 0;
				$('.qty').each(function(item){
					var s = $(this).text();
					total+=s*1;
				})
				$('.allQty').html(total);
			}
			//获取仓库数据
			
			$.get('http://localhost:88/receiving',{cz:'get'},function(res){
				var temp;
				var a = getMess().data;
				for(var k=0;k<a.length;k++){
					var is = true;
					for(var t=0;t<res.length;t++){
						if(a[k].barcode === res[t].barcode){
							res[t].repertory = (a[k].repertory)*1+ (res[t].repertory)*1;
							is = false;
							break;
						}
					}
					if(is){
						a[k].price = '0';
						res.push(a[k]);
					}
				}
				temp = res;
				//收货
				$('.submit').on('click',function(){
					var isNo = getMess().status;
					if(!isNo){
						window.alert("输入内容不能为空")
					}else{
						if(confirm('信息核对无误后点击确定')){
							temp = JSON.stringify(temp);
							$.get('http://localhost:88/purchase',{cz:"del"},function(res){
								console.log(res)
							})

							$('.context').html("");
							createHTML(null,1);
							$('.allQty').html(0);
							
			
							$.get('http://localhost:88/receiving',{cz:'del'},function(res){
								console.log(res);
							})

							$.get('http://localhost:88/receiving',{data:temp,cz:'add'},function(res){
								console.log(res);
							})
						}
					}
				})
			})
		})
	

		




		function createHTML(res,row){
			if(res){
				var len = res.length;
			}else{
				row = row ? row:2;
				var len = row;
			}

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
					<th class="w6">单价</th>
					<th class="w7">数量</th>
					<th class="w7">收获日期</th>
					<th class="set-ep">状态</th>
				</tr>
			`).appendTo($table);

			for(var i=0;i<len;i++){
				var j=0;
				var $tr = $('<tr/>').addClass('currTr');

				if(res){
					for(var attr in res[i]){
						if(attr==="_id" ||attr==="paymentType"){
							continue;
						}
							j++;
							var $td = $('<td/>').addClass('item').appendTo($tr).text(res[i][attr]);
							if(j==9){
								$td.addClass('red');
							}else if(j===7){
								$td.addClass('qty');
							}
					}	
				}else{
					for(var k=1;k<=9;k++){
						var $td = $('<td/>').addClass('item').appendTo($tr);
						if(j===6){
							$td.addClass('qty');
						}
					}
				}

					
				$tr.appendTo($tbody);
			}
				
			$tbody.appendTo($table);
			$('.context').append($table);
		}

		function getMess(){
			//获取内容
			var isNo = true;
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
								isNo=false;
								console.log('a')
							}
						}
					})

					//用对象接收
					if(ide===0){
						var opt = {
						barcode:arr[0],
						supplier:arr[1],
						type:arr[3],
						name:arr[4],
						repertory:arr[6],
						stockprice:arr[5],
						stocktime:arr[7]
						};
						arrs.push(opt);
						//写入后清空
					}
					arr =[];
					ide=0;
				}
			})
			return {data:arrs,status:isNo};
		}
}); 
