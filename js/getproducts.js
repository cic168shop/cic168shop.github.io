$(document).ready(function($) {
    // 在此區塊內我們使 $ 參照 jQuery 物件
    // 在此區塊內使用 $ 不會與其它函式衝突
	
});

$.ajax({    
    url: "http://192.168.2.120:8091/getproducts?_=1582708608114",  //127.0.0.1:8091
    type: 'GET',								    //方法用POST取回
    data: {},									    //參數
    cache : false,								    //為了防止ajax使用緩存
    dataType: "json",						  	    //資料類型：json
    success: function(data){				    	//成功會執行底下的function
    	var str_Json = JSON.stringify(data);  	   //將取得物件（Object）字串化
    	var obj = eval("(" + str_Json + ")");      //eval解析str_Json訊息
    	var Str_data = "";
    	var Data_list = obj["content"];        //取得"content":[{ }]底下的訊息
    	for (var i = 0; i < Data_list.length ; i++) {			//for迴圈根據Data_list.length資料長度決定跑幾次				
            Str_data += "<tr><td><img src='" 					//取得productImg：圖片的網址，並用<img src='取回的圖片網址'>
            		 + Data_list[i]["productImg"] 				//productImg：圖片的網址
            		 + "'></td></tr>"
            		 + "<tr><td>" 
            		 + "<h3>品名：" 
            		 + Data_list[i]["productName"] 				//productName：產品名稱
             		 + "</h3></td>"
             		 + "<tr><td><S>原價：" 
             		 + parseInt(Data_list[i]["price"])/100 		//price：原價，parseInt()字串轉成整數並除以100顯示正確的價格
             		 + "元</S>&emsp;" 
             		 + "<font color='red'>特價：" 
             		 + parseInt(Data_list[i]["salesPrice"])/100 //salesPrice：特價，parseInt()字串轉成整數並除以100顯示正確的價格
             		 + "元</font>" 
             		 + "</td></tr>"
             		 + "<tr><td><input name='購買' id='buy" + i +"'"	
             		 + "type='button' style='VISIBILITY: hidden' value='購買'></input>"	//產生購買按鈕
             		 + "</td></tr>";
        }
    	var s= "<table width='100%'>";		//產生表單
    	var e= "</table>";
    	Str_data = s + Str_data + e;		
    	$("#Products").html(Str_data);		//Str_temp顯示在id=Machinelist的旗標上
     },
     error:function(err){					//錯誤執行底下的function(err)
    	 console.log(err.statusText);
         alert("異常");
     }
});
