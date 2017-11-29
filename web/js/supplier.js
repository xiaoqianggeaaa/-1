jQuery(function($){
			
		$(".supplier").on("click",function(){
			console.log(66);
			
			$('#content_right').html("").load('html/supplier.html #container',function(){
				
			
//				console.log($("#btnSearch"));

			var global = global || {};
			global.apiBaseUrl = "http://localhost:88/";
			//查询
			$("#btnSearch").on("click",function(){
				
				$.post(global.apiBaseUrl+"selectSupplier",
				{supplierName:$("#searchSupplier").val()},function(res){
					var data = res.data;
					var content = document.querySelector(".content");
					content.innerHTML = data.map(function(item){
						return `<table border="1px solid #cccccc">
									<tr>
										<td>ID</td>
										<td>供应商名称</td>
										<td>商品名称</td>
										<td>联系人</td>
										<td>联系电话</td>
										<td>地址</td>
										<td>开户银行</td>
										<td>商品类型</td>
										<td>操作</td>
									</tr>
									<tr>
										<td>${item.ID}</td>
										<td>${item.supplierName}</td>
										<td>${item.productName}</td>
										<td>${item.person}</td>
										<td>${item.phone}</td>
										<td>${item.address}</td>
										<td>${item.bankAccount}</td>
										<td>${item.productType}</td>
										<td><input type="button" value="确定修改" id="edit"/></td>
									</tr>
								</table>`
					}).join("");
					
					//点击单元格可修改内容
					$(".content")[0].onclick =function(e){
						e = e || window.event;
						var target = e.target || e.srcElement;
						if(target.tagName.toLowerCase() == "td"){
							var input = document.createElement("input");
							input.type = "text";
							input.value = target.innerText;
							
							target.innerHTML = "";
							target.appendChild(input);
							
							input.focus();
							//input失去焦点保存当前内容
							input.onblur = function(){
								target.innerHTML = input.value;
							}
							//点击确定按钮将当前信息发送到数据库
							
							$("#edit").on("click",function(){
								$contentTr = $("table").find("tr").eq(1);
								$content = $contentTr.find("td");
								$.post(global.apiBaseUrl + "updateSupplier",
								{
									ID:$content[0].innerText*1,
									supplierName:$content[1].innerText,
									productName:$content[2].innerText,
									person:$content[3].innerText,
									phone:$content[4].innerText,
									address:$content[5].innerText,
									bankAccount:$content[6].innerText,
									productType:$content[7].innerText
								}
								,function(res){
									console.log(res);
								})
							})
							
						}
					}
					
				})
			});
			//添加
			$("#btnAdd").on("click",function(){
				$.post(global.apiBaseUrl+"addSupplier",
				{
					supplierName:$("#addSupName").val(),
					productName:$("#addSupPro").val(),
					person:$("#addSupPerson").val(),
					phone:$("#addSupPhone").val(),
					address:$("#addSupAddress").val(),
					bankAccount:$("#addSupBank").val(),
					productType:$("#addSupType").val()
				},function(res){
					if(res.status == true){
						var alert = document.getElementById("alert");
						alert.innerText = "更新成功！";
					}
				});
			});
			//删除
			$("#btnDelete").on("click",function(){
				$.post(global.apiBaseUrl + "deleteSupplier",
				{supplierName:$("#delSup").val()},function(res){
					console.log(res); 
					if(res.status == true){
						var delAlert = document.getElementById("delAlert");
						delAlert.innerText = "删除成功！"
					}
				})
			});
			
			});
		});
		});