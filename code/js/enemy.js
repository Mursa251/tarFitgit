



//敌机Enemy
function Enemy(type){
	
	//属性
	this.ele = document.createElement("div");
	this.id = parseInt(Math.random()*100000000);
	
	this.speed = 10; //速度
	this.hp = 1; //血量
	this.dieImgs = []; //爆炸时的图片数组
	this.score = 10; //敌机的分数
	
	//方法init
	this.init = function(){
		
		//添加
		gameEngine.allEnemy[this.id] = this;
		
		gameEngine.ele.appendChild(this.ele);
		
		switch(type){
			case this.Enemy_Type_Large: //大型飞机
				this.ele.className = "enemy-large";
				this.speed = this.Enemy_Speed_Large;
				this.hp = this.Enemy_Hp_Large;
				this.dieImgs = ["images2/plane3_die1.png", "images2/plane3_die2.png", "images2/plane3_die3.png", "images2/plane3_die4.png", "images2/plane3_die5.png", "images2/plane3_die6.png"]
				this.score = 30;
				break;
				
			case this.Enemy_Type_Middle:  //中型飞机
				this.ele.className = "enemy-middle";
				this.speed = this.Enemy_Speed_Middle;
				this.hp = this.Enemy_Hp_Middle;
				this.dieImgs = ["images2/plane2_die1.png", "images2/plane2_die2.png", "images2/plane2_die3.png", "images2/plane2_die4.png"]
				this.score = 20;
				break;
				
			case this.Enemy_Type_Small: //小型飞机
				this.ele.className = "enemy-small";
				this.speed = this.Enemy_Speed_Small;
				this.hp = this.Enemy_Hp_Small;
				this.dieImgs = ["images2/plane1_die1.png", "images2/plane1_die2.png", "images2/plane1_die3.png"]
				this.score = 10;
				break;
				
			default :
				console.log("error");
		}
		
		//位置
		this.ele.style.left = parseInt(Math.random()*(gameEngine.ele.offsetWidth-this.ele.offsetWidth)) + "px";
		this.ele.style.top = - this.ele.offsetHeight + "px";
		
		return this;
	}
	
	//move
	this.move = function(){
		var that = this;
		this.timer = setInterval(function(){
			var y = that.ele.offsetTop + that.speed;
			if (y > gameEngine.ele.offsetHeight) {
				clearInterval(that.timer); //停止移动	
				gameEngine.ele.removeChild(that.ele); //移除敌机
				
				//移除
				delete gameEngine.allEnemy[that.id]; 
			}
			else {
				that.ele.style.top = y + "px";
			}
		}, 40);
	}
	
	//掉一滴血
	this.hurt = function(){
		this.hp--; 
		if (this.hp == 0) {
			this.boom(); 
			gameEngine.totalScore += this.score;
			console.log("总分数： " + gameEngine.totalScore);
		}
	}
	
	//爆炸
	this.boom = function(){
		clearInterval(this.timer); //停止移动
		
		var that = this;
		var i = 0;
		var dieTimer = setInterval(function(){
			if (i >= that.dieImgs.length){
				clearInterval(dieTimer); //停止爆炸
				gameEngine.ele.removeChild(that.ele); //移除敌机
				
				delete gameEngine.allEnemy[that.id]; 
			}
			else {
				that.ele.style.background = "url("+ that.dieImgs[i++] +") no-repeat";
			}
		}, 100);
		
	}
}


Enemy.prototype = {
	Enemy_Type_Large: 1,  //大型飞机
	Enemy_Type_Middle: 2, //中型飞机
	Enemy_Type_Small: 3, //小型飞机
	
	Enemy_Speed_Large: 3, //大型飞机的速度
	Enemy_Speed_Middle: 5, //中型飞机的速度
	Enemy_Speed_Small: 8, //小型飞机的速度
	
	Enemy_Hp_Large: 8, //大型飞机的血量
	Enemy_Hp_Middle: 3, //中型飞机的血量
	Enemy_Hp_Small: 1 //小型飞机的血量
	
}





