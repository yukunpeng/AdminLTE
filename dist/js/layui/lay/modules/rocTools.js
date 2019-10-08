/**
 * 
 */

layui.define(['jquery'],function(exports){
	var $=layui.jquery;
	
	var _obj = {
		// ajax请求
		ajax:function(parm){
			var defaultObj={
				type: 'get',
				dataType: "JSON",
				data:{},
				contentType: 'application/json; charset=UTF-8',
				success: function (res) {
					//sucess(res);
				},
				error: function (data) {
					console.log(data);
				}
			}
			$.ajax($.extend({},defaultObj,parm));
		},
		// 设置table的默认参数
		tbCfg:function(parm){
			// 表格默认参数
			var defaultObj={
				// ajax请求
				contentType: "application/json;charset=utf-8",
				height: 511,
				// 分页相关
				page:true,
				request: {
					pageName: 'page', //页码的参数名称，默认：page
					limitName: 'pageSize' //每页数据量的参数名，默认：limit,
				},
				limits:[10,20,50,100],
				limit:10,
				// 数据为空,文字提示
				text: {
					none: '一条数据也没有^_^'
				}
				// 后台格式不符合要求，改为layui需要的格式
				// response: {
				// 	statusName: 'code' //规定数据状态的字段名称，默认：code
				// 	,statusCode: 0 //规定成功的状态码，默认：0
				// 	,msgName: 'message' //规定状态信息的字段名称，默认：msg
				// 	,countName: 'totalElements' //规定数据总数的字段名称，默认：count
				// 	,dataName: 'data' //规定数据列表的字段名称，默认：data
				// },
			}
			// 返回合并后的参数
			return $.extend({},defaultObj,parm);
		},
	}
  
	exports('rocTools', _obj);
});    