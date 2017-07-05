


//游戏引擎
var gameEngine = {
	
	//属性ele: 游戏主界面
	ele: null,
	
	allBullet: {}, //页面上的所有子弹
	allEnemy: {}, //页面上的所有敌机
	
	totalScore: 0, //总分数
	
	//方法init： 初始化属性
	init: function(){
		gameEngine.ele = document.getElementById("main");
		return this;
	},
	
	//方法start: 开始游戏
	start: function(){
		console.log("开始游戏");
		
		//加载游戏
		gameEngine.loadding(function(){
			
			console.log("游戏加载完毕");
			
			//我的飞机
			myPlane.init().move();
			myPlane.fire(); //开火
			
			
			//监听键盘
			gameEngine.listeningKeybord();
			
			//创建敌机
			gameEngine.createEnemy();
			
			//碰撞检测
			gameEngine.listeningCrash();
			
			//移动背景图
			gameEngine.moveBackground();
			
		});
		
	},
	
	//加载游戏
	loadding: function(callback){
		//logo
		var logo = document.createElement("div");
		logo.className = "logo";
		gameEngine.ele.appendChild(logo);
		
		//load
		var load = document.createElement("div");
		load.className = "load";
		gameEngine.ele.appendChild(load);
		
		//动画
		var imgs = ["images2/loading1.png", "images2/loading2.png", "images2/loading3.png"];
		var i = 0;
		var timer = setInterval(function(){
			if (i >= 5){
				clearInterval(timer); //停止动画
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(load);
				
				//回调
				callback();
			}
			else {
				load.style.background = "url("+ imgs[++i%3] +") no-repeat";
			}
		},500);
		
	},
	
	//监听键盘
	listeningKeybord: function(){
		
		var xSpeed = 0;
		var ySpeed = 0;
		window.onkeydown = function(e){
			e = e || event;
			if (e.keyCode == 37){ //左
				xSpeed = -10;
			}
			else if (e.keyCode == 39){ //右
				xSpeed = 10;
			}
			else if (e.keyCode == 38){ //上
				ySpeed = -10;
			}
			else if (e.keyCode == 40){ //下
				ySpeed = 10;
			}
		}
		window.onkeyup = function(){
			xSpeed = 0;
			ySpeed = 0;
		}
		setInterval(function(){
			var x = myPlane.ele.offsetLeft + xSpeed;
			if (x < 0) {x = 0;}
			if (x > gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth) {
				x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth
			}
			myPlane.ele.style.left = x + "px";
			myPlane.ele.style.top = myPlane.ele.offsetTop + ySpeed + "px";
		}, 30);
		
	},
	
	//创建敌机
	createEnemy: function(){
		
		//随机创建小型飞机
		setInterval(function(){
			var flag = Math.random()>0.4 ? true : false;
			if (flag) {
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_Small);
				enemy.init().move();
			}
		}, 1000);
		
		//随机创建中型飞机
		setInterval(function(){
			var flag = Math.random()>0.6 ? true : false;
			if (flag) {
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_Middle);
				enemy.init().move();
			}
		}, 2000);
		
		//随机创建小型飞机
		setInterval(function(){
			var flag = Math.random()>0.5 ? true : false;
			if (flag) {
				var enemy = new Enemy(Enemy.prototype.Enemy_Type_Large);
				enemy.init().move();
			}
		}, 8000);
		
	},
	
	//碰撞检测
	listeningCrash: function(){
		
		var isCrashMyPlane = false; //表示是否碰撞到我的飞机
		setInterval(function(){
			
			for (var i in gameEngine.allEnemy) { //遍历所有页面上的敌机
				
				for (var j in gameEngine.allBullet) { //遍历所有页面上的子弹
					
					//如果某个子弹和某个敌机发生了碰撞
					if ( isCrash(gameEngine.allEnemy[i].ele, gameEngine.allBullet[j].ele) ) {
						//console.log("发生了碰撞");
						
						//让子弹消失
						gameEngine.allBullet[j].boom(); //让子弹爆炸
						delete gameEngine.allBullet[j];  //将子弹对象从allBullet中移除
						
						//让敌机掉一滴血
						gameEngine.allEnemy[i].hurt();
					}
					
				}
				
				//如果敌机和我的飞机发生了碰撞
				if ( !isCrashMyPlane && isCrash(gameEngine.allEnemy[i].ele, myPlane.ele)){
					isCrashMyPlane = true;
					//alert("Game Over");
					console.log("Game Over");
					
					
					var myName = prompt("您的总分数是:"+ gameEngine.totalScore +", 请输入您的大名");
					if (myName) {
						//点击了确定
						ajax({
							type: "post",
							url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
							data: {name:myName, score:gameEngine.totalScore},
							async: true,
							
							success:function(data){
								console.log(data);
								
								//进入排行榜
								location.href = "03_rand.html";
								
							},
							error: function(){
								console.log("error");
							}
						})
					}
					else {
						//点击了取消
						location.reload();
					}
					
					
				}
				
			}
			
		}, 30);
		
	},
	
	//移动背景图
	moveBackground: function(){
		var y = 0;
		setInterval(function(){
			gameEngine.ele.style.backgroundPositionY = y++ + "px";
		}, 30);
	}, 
	
	//统计分数
	score: function(){
		
		
	}
}















