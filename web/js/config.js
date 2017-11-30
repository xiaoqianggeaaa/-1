/*
	requirejs配置
 */
require.config({
	// baseUrl:'js'
	paths:{
		jquery:'../lib/jquery-3.2.1.min',
		global:'../lib/global',
	},
	shim:{
		jqueryUI1:['jquery'],
		jqueryUI2:['jquery'],
		load_ep:['jquery'],
		global:['jquery']
	}
}); 

requirejs(['jquery'],function(){
	requirejs(['load_ep'],function(){
		requirejs
	})

})