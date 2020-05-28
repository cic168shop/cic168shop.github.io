$(document).ready(function($) {
    // 在此區塊內我們使 $ 參照 jQuery 物件
    // 在此區塊內使用 $ 不會與其它函式衝突
	
});

$.ajax({
    url: "https://192.168.2.120:443/getmachinelist", //127.0.0.1:8091
    type: 'GET',								 //方法用POST取回
    data: {},									 //參數
    cache : false,								 //使用GET才能使用緩存，為了防止ajax使用緩存
    dataType: "json",							 //資料類型：json
    success: function(data){					 //成功會執行底下的function
    	var str_Json = JSON.stringify(data);     //將取得物件（Object）字串化
    	var obj = eval("(" + str_Json + ")");	 //eval解析str_Json訊息
    	
    	var Str_temp = "<thead><tr align='center'><td align='center'>"		//設定標題行要顯示的名稱
    				 + "<h1>機器名稱</h1></td><td align='center'><h1>機器碼</h1></td>"
    				 + "<td align='center'><h1>放置地址</h1></td><td align='center'><h1>目前狀態</h1>" 
    				 + "</td></tr></thead>";
    	var Data_list = obj["content"];//取得"content":[{ }]底下的訊息
    	
    	//for (var i = 0; i < Data_list.length; i++) {	//for迴圈根據Data_list.length資料長度決定跑幾次
    	for (var i = 2; i < 3; i++) {
    		Str_temp += "<tr align='center'><td align='center'>" 	
            		 + Data_list[i]["machineName"] 					//machineName：機器名稱
            		 + "</td><td align='center'>" 
            		 + Data_list[i]["machineCode"] 					//machineCode：機器碼
            	   	 + "</td><td align='center'>" 
            	   	 + Data_list[i]["machineAddress"] 				//machineAddress：機器放置的地址
            		 + "</td><td align='center'>" 
            	   	 + Data_list[i]["status"] 						//status：機器目前狀態
            		 + "</td></tr>";
        }
    	var s= "<table width='100%'>";	  //產生表單
    	var e= "</table>";
    	Str_temp = s + Str_temp + e;
    	$("#Machinelist").html(Str_temp); //Str_temp顯示在id=Machinelist上
    	
     },
     error:function(err){			//錯誤執行底下的function
    	 console.log(err.statusText);
         alert("異常");
     }
});
