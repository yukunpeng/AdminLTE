/**
 * 异步下拉，回显
 * key展示的文字,value传给程序的内容
 * layui.selectAjax.render({
		elem:'#opraType',//绑定的selectdom
		url:layui.config.serverUrl+'/dictionary/list',
		type:'post',
		data:{
			typeCode:"000002"//ajax参数
		},
		parseData:function(r){
			return {
				data:r.data,//数据源
				key: r.typeName,//给用户看
				value: r.typeValue//提交给后台
			}
		},
		done:function(){}
	})
 * 
 */

layui.define(['jquery','form'],function(exports){
	var $=layui.jquery;
	
	var obj = {
		// url，data,elem
		render:function(parm){
			var defaultObj={
				type: 'get',
				dataType: "JSON",
				contentType: 'application/json; charset=UTF-8',
				data:{},
				success: function (res) {
					onSuccess(parm,res);
				},
				error: function (data) {
					console.error(data);
				}
			}
			$.ajax($.extend({},defaultObj,parm));
		}
  };
  
  function onSuccess(parm,res){
	  var str="";
	  // 解析数组
	  var data=res.data;
	  if(parm.parseData){
	  	data=parm.parseData(res).data;
	  }
	  $.each(data, function (key, el) {
	  	var item=el;
	  	// 解析数据
	  	if(parm.parseData)item=parm.parseData(el);
	  	if(item.value==parm.value){
	  		str+="<option selected value='" + item.value + "'>" + item.key + "</option>";
	  	}else{
	  		str+="<option value='" + item.value + "'>" + item.key + "</option>";
	  	}
	  });
	  $(parm.elem).append(str);
	  layui.form.render();
	  if(parm.done)parm.done();
  }
  
  //输出test接口
  exports('selectAjax', obj);
});    