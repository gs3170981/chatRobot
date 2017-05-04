//唯一调用入口
function myChatRobot(rel){
//---------------------所有对外的接口------------------------------------------------------
//-------------------------初始化----------------------------------------------------------
//p:父类、c:子类、bg:背景、t:top、r:right、b:bottom、l:left、w:width、h:height
//-----------------------------------------------------------------------------------------
	var data={
		klass:{
			p_w:660,
			p_t_h:82,
			p_b_l_w:518,
			p_b_l_1_h:435,
			p_b_l_2_h:32,
			p_b_l_3_h:80,
			p_b_l_4_h:48,
			p_b_r_h:595,
			p_t:'auto',
			p_l:'auto',
			p_r:'auto',
			p_b:'auto'
		},
		option:{
			send:function(data){
				console.log('do something......');
			},
			close:function(){
				$('#myChatRobot').remove();
			},
			append:'body'
		}
	};
	data.klass=arrForSubscript(data.klass,rel.klass);
	data.option=arrForSubscript(data.option,rel.option);
	//缺省字段数据处理
	function arrForSubscript(def,rel){
		if(!rel)return def;
		for(var i in def){
			if(rel.hasOwnProperty(i)){
				def[i]=rel[i];
			}
		}
		return def;
	}
	//执行阶段
	myChatRobotStart(data);
	function myChatRobotStart(data){
		ready(data)
		//结构部署
		function ready(data){
			var klass=data.klass;
			var aside_top="<header id='myChatRobotHeader' style='height:"+klass.p_t_h+"px;cursor:default;background:linear-gradient(to right,#fb0102,#ff8686);border-radius:5px 5px 0 0;'>"
				+"<img name='myChatRobotClose' src='img/close.png' style='float:right;color:#9da6ad;height:15px;width:15px;padding:15px;cursor:default;' onmouseover="+"$(this).css('background','#ff4646')"+" onmouseout="+"$(this).css('background','transparent')"+"></img>"
			+"</header>";
			var aside_bottom_left_content="<ul style='list-style: none;padding:0;margin:0;'>"
				+"<li id='myChatRobotList' style='height:"+klass.p_b_l_1_h+"px;overflow-x:hidden;overflow-y:auto;background:#fff4f4;'></li>"
				+"<li style='height:"+klass.p_b_l_2_h+"px;background:#ffeded;'></li>"
				+"<li style='height:"+klass.p_b_l_3_h+"px;'>"
					+"<textarea id='myChatRobotVal' style='background:#fff6f6;border:none;resize:none;height:100%;width:514px;outline:none;font-family:微软雅黑;'></textarea>"
				+"</li>"
				+"<li style='height:"+klass.p_b_l_4_h+"px;background:#fff4f4;border-bottom-left-radius:5px;text-align:center;'>"
					+"<span id='myChatRobotSend' style='float:right;margin:11px 20px 0 0;width:70px;background:#ff7a32;cursor:default;border-radius:3px'>发送</span>"
					+"<span name='myChatRobotClose' style='float:right;margin:11px 10px 0 0;width:70px;background:#ff7a32;cursor:default;border-radius:3px'>关闭</span>"
				+"</li>"
			+"</ul>";
			var aside_bottom_left="<dt style='float:left;width:"+klass.p_b_l_w+"px;'>"
				+aside_bottom_left_content
			+"</dt>";
			var aside_bottom_right="<dd style='overflow:hidden;height:"+klass.p_b_r_h+"px;background:linear-gradient(#ffb186,#ff5a00);border-bottom-right-radius:5px;'></dd>";
			var aside_bottom="<dl style='padding: 0;margin: 0;'>"
				+aside_bottom_left
				+aside_bottom_right
			+"</dl>";
			var aside="<aside id='myChatRobot' style='width:"+klass.p_w+"px;position:fixed;top:"+klass.p_t+";left:"+klass.p_l+";right:"+klass.p_r+";bottom:"+klass.p_b+";box-shadow:0 0 2rem #b7c0c1;font-family:微软雅黑;font-size:14px;line-height:25px;-moz-user-select:none;-webkit-user-select: none;-ms-user-select:none;-khtml-user-select:none;user-select:none;'>"
				+aside_top
				+aside_bottom
			+"</aside>";
			$(data.option.append).append(aside);
			$('#myChatRobot').height(klass.p_t_h+klass.p_b_l_1_h+klass.p_b_l_2_h+klass.p_b_l_3_h+klass.p_b_l_4_h);
			$("#myChatRobotHeader").on('mousedown',function(){
				myChatRobotDrag(event,$('#myChatRobot'));
			});
			var close=document.getElementsByName('myChatRobotClose');
			for(var i=0;i<close.length;i++)
			$(close[i]).on('click',function(){
				data.option.close()
			});
			$("#myChatRobotSend").on('click',function(){
				var val=$('#myChatRobotVal').val();
				if(val!='')data.option.send($('#myChatRobotVal').val());
			});
			$('#myChatRobotVal').keydown(function(event){
				event=document.all?window.event:event;
		    	if((event.keyCode || event.which)==13){
		    		var val=$('#myChatRobotVal').val();
					if(val!='')data.option.send($('#myChatRobotVal').val());
		    	}
			})
			setTimeout(function(){
				$('#myChatRobotList').append("<div style='overflow: hidden;padding: 10px;'>"
					+"<img src='img/service.jpg' style='height:40px;width:40px;float:left;border-radius: 50%;' />"
					+"<p style='float:left;padding:10px;max-width:400px;margin:0 0 0 10px;border-radius:10px;color:white;background:#ff8a50;word-wrap:break-word;'>您好，请问遇到了什么困难？</p>"
				+"</div>");
			},500)
		}
		//拖动监听
		function myChatRobotDrag(event,obj){
			//初始化-----------------------------------------------------------
			//e:鼠标坐标、obj:当前对象、p:父级对象、n:当前变量、c:临时变量
			//-----------------------------------------------------------------
			var e_x=event.clientX;
			var e_y=event.clientY;
			var obj_t=$(obj).position().top;
			var obj_l=$(obj).position().left;
			var obj_w=$(obj).width();
			var obj_h=$(obj).height();
			var p=$(data.option.append);
			var p_w=$(p).width();
			var p_h=$(p).height();
			var e_b_c=0,e_t_c=0,e_l_c=0,e_r_c=0;//对四角的兼容
			$(this).mousemove(function(event){
				//初始化
				var obj_n_t=$(obj).position().top;
				var obj_n_b=p_h-obj_n_t-obj_h;
				var obj_n_l=$(obj).position().left;
				var obj_n_r=p_w-obj_n_l-obj_w;
	
				var e_n_x=event.clientX;//now_X
				var e_n_y=event.clientY;
				//移动偏差
				var e_x_t=obj_t+(e_n_y-e_y);
				var e_y_l=obj_l+(e_n_x-e_x);
				//范围限定
//				if(obj_n_b<21){//bottom
//					e_x_t=p_h-obj_h-19;//与pading相关
//					if(!e_b_c)e_b_c=e_n_y;
//					else if(e_n_y<e_b_c){
//						e_x_t=e_x_t-2//与pading相关
//						e_b_c=0;
//					}
//				}if(obj_n_t<0){//top
//					e_x_t=-1;
//					if(!e_t_c)e_t_c=e_n_y;
//					else if(e_n_y>e_t_c){
//						e_x_t=e_x_t+1
//						e_t_c=0;
//					}
//				}if(obj_n_l<0){//left
//					e_y_l=-1;
//					if(!e_l_c)e_l_c=e_n_x;
//					else if(e_n_x>e_l_c){
//						e_y_l=e_y_l+1
//						e_l_c=0;
//					}
//				}if(obj_n_r<41){//right
//					e_y_l=p_w-obj_w-39;
//					if(!e_r_c)e_r_c=e_n_x;
//					else if(e_n_x<e_r_c){
//						e_y_l=e_y_l-2
//						e_r_c=0;
//					}
//				}
		    	$(obj).css({top:e_x_t,left:e_y_l});
			})
		 	$(this).mouseup(function (event){
		    	$(this).unbind("mousemove");
			});
		}
	}
}
