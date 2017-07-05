

//创建xhr对象
function createXHR(){
	if (window.XMLHttpRequest) {
		return new XMLHttpRequest(); //支持IE7+，非IE
	}
	return new ActiveXObject("Microsoft.XMLHTTP"); //支持IE6
}


/*
 ajax({
		type: "get",
		url: "http://60.205.181.47/myPHPCode2/checkname.php",
		data: {regname:"zhangsan", pwd:"123455"},
		async: true,
		
		success: function(){
			
		},
		error: function(){
			
		}
	})
 */

//封装ajax
function ajax(obj){
	
	obj.type = obj.type || "get"; //默认是get
	obj.async = obj.async==undefined ? true : obj.async; //默认是true
	
	//1, 创建xhr对象
	var xhr = createXHR();
	
	//2, open()
	var paramStr = getParamStr(obj.data);
	//console.log(paramStr); //regname=zhangsan&pwd=123455
	if (obj.type.toLowerCase() == "get"){
		obj.url +=  paramStr ? ("?" + paramStr) : "";
	}
	xhr.open(obj.type, obj.url, obj.async);
	
	//3, send()
	if (obj.type.toLowerCase() == "get"){ //GET
		xhr.send(null);
	}
	else { //POST
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.send(paramStr);
	}
	
	//4, 接收数据
	if (obj.async) { //异步
		xhr.onreadystatechange = function(){
			if (xhr.readyState==4) {
				callback();
			}
		}
	}
	else { //同步
		callback();
	}
	
	function callback(){
		if (xhr.status == 200){ //请求成功
			//console.log(xhr.responseText);
			if (obj.success)
				obj.success(xhr.responseText); //回调
		}
		else { //请求失败
			//console.log(xhr.status);
			if (obj.error){
				obj.error(); //回调
			}
		}
	}
}

//{regname:"zhangsan", pwd:"123455"} =>  "regname=zhangsan&pwd=123455"
function getParamStr(data){
	var arr = [];
	for (var key in data){
		var str = key + "=" + data[key];
		arr.push(str);
	}
	return arr.join("&");
}





