function randomNumber(min,max){
	return parseInt(Math.random()*(max-min+1)) + min;
}

//验证码
function VerificationCode(qty){
	qty = qty ? qty : 4;
	var reg='';
	var str = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
	str = str.split('');
	for(var i=0;i<qty;i++){
		var num = parseInt(Math.random()*str.length); 
		reg += str[num];
	}
	return reg;
}


//cookie操作
//增，删，查，改
var Cookie = {
	/**
	 * [添加/修改cookie]
	 * @param {String} name    [cookie名]
	 * @param {String} val     [cookie值]
	 * @param {[Date]} expires [cookie有效期]
	 * @param {[String]} path    [cookie保存路径]
	 */
	set:function(name,val,expires,path){
		var str = name + '=' + val;

		// 有效期
		if(expires){
			str += ';expires=' + expires.toUTCString();
		}

		// 保存路径
		if(path){
			str += ';path=' + path;
		}

		// 写入cookie
		document.cookie = str;
	},

	/**
	 * [删除cookie]
	 * @param  {String} name [要删除的cookie名]
	 * @param  {[String]} path [指定路径]
	 */
	remove:function(name,path){
		var now = new Date();
		now.setDate(now.getDate()-7);

		// document.cookie = name + '=null;expires=' + now.toUTCString();
		// 利用添加方法达到删除效果
		this.set(name,'null',now,path);
	},

	/**
	 * [获取cookie]
	 * @param  {String} name [cookie]
	 * @return {String}      [description]
	 */
	get:function(name){
		var res = '';

		// 获取能访问的所有cookie
		var cookies = document.cookie;

		// 判断是否存在cookie
		if(!cookies.length){
			return res;
		}

		// cookie字符串拆成数组
		cookies = cookies.split('; ');

		// 遍历数组，找出name对应cookie值
		for(var i=0;i<cookies.length;i++){
			// 拆分cookie名和cookie值
			var arr = cookies[i].split('=');
			if(arr[0] === name){
				res = arr[1];
				break;
			}
		}

		return res;
	}
}

/*
	* 支持多属性同时运动
	* 支持回调函数
 */
function animate(ele,opt,callback){
	var timerQty = 0;
	for(var attr in opt){
		// 记录动画数量
		timerQty++;

		createTimer(attr);
	}

	function createTimer(attr){
		// 以属性名创建定时器名字
		var timerName = attr + 'timer';

		// 清除之前的定时器,放置多个定时器作用于同一个元素
		clearInterval(ele[timerName]);

		// 目标值
		var target = opt[attr];

		// 创建定时器
		ele[timerName] = setInterval(function(){
			// 获取当前值
			var current = getComputedStyle(ele)[attr];

			// 提取单位
			var unit = current.match(/\d([a-z]*)$/);
			unit = unit ? unit[1] : '';

			// 提取数字
			current = parseFloat(current);

			// 计算缓冲速度
			var speed = (target - current)/10;

			//判断属性是否为opacity
			if(attr === 'opacity'){
				speed = speed>0 ? 0.05 : -0.05;
			}else{
				speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
			}

			// 到达目标值/清除定时器
			if(current === target){
				clearInterval(ele[timerName]);
				current = target - speed;

				// 数量减1
				timerQty--;

				// 执行回调函数
				// 最后一个动画执行完成后才执行回调函数
				if(typeof callback === 'function' && timerQty===0){
					callback();
				}
			}

			ele.style[attr] = current + speed + unit;

		},30);
	}
	
}