var canvas; 
		var sq1;
		var ctx;
		var keyPressed = {};
		//var sprite;

		function init()
		{
			canvas = document.getElementById("myCanvas");
			ctx = canvas.getContext('2d');
			sq1 = new Spaceship();
			console.log("init");
			keyboard();
			run();
		}
		function keyboard()
		{
			window.addEventListener('keydown',function(e){
				keyPressed[e.keyCode] = true;
			}, false);

			window.addEventListener('keyup',function(e){
				keyPressed[e.keyCode] = false;
			},false);



		}

		function run()
		{
			if(canvas.getContext)
			{
				ctx.canvas.width = window.innerWidth;
				ctx.canvas.height = window.innerHeight;
				drawBackground("#333");
				sq1.draw();
				sq1.move();
				setTimeout(run,10);
			}
			else
			{
				canvas.innerHTML = "<h1>Not supported</h1>";
			}

			
		}

		function drawBackground(fill)
		{
			ctx.fillStyle = fill;
			ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
		}


		function Spaceship(){
			this.x = ctx.canvas.width/2;
			this.y = ctx.canvas.height/2;
			this.vx = 0;
			this.vy = 0;
			this.a = 0.25;
			this.drag = this.a/100;
			this.size = 37;
			this.maxSpeed = 25;
			this.sprites = [new Image(), new Image()];

			this.sprites[0].src = "src/sprite1.png";
			this.sprites[1].src = "src/sprite2.png";
			this.rotation = 0;
			this.rotationSpeed = 0;
			this.rotationAccel = 0.001;
			this.rotationDrag = this.rotationAccel/3;
			this.rotationMaxSpeed = 10;
			this.costume = 0;
			this.draw = function(){
				
				ctx.save();
				ctx.translate(this.x+19,this.y+19);
				ctx.rotate(this.rotation);
				ctx.drawImage(this.sprites[this.costume],-19,-19);
				ctx.restore();
				
			}

			this.move = function()
			{

				//DEBUG
				

				//set Costume
				this.costume = 0;
				//move forward
				if(keyPressed[38])
					this.moveUp();
				if(keyPressed[40])
					this.moveDown();
				if(keyPressed[37])
					this.moveLeft();
				if(keyPressed[39])
					this.moveRight();


				//rotation
				if(keyPressed[65])
					this.rotationSpeed -= this.rotationAccel;
				if(keyPressed[68])
					this.rotationSpeed += this.rotationAccel;

				if(Math.abs(this.rotationSpeed)<this.rotationMaxSpeed)
					this.rotation+=this.rotationSpeed;

				if(this.rotationSpeed>0)
					this.rotationSpeed-=this.rotationDrag;
				if(this.rotationSpeed<0)
					this.rotationSpeed+=this.rotationDrag;


				//Moves
				this.x += this.vx;
				this.y += this.vy;

				//Drag
				if(this.vx>0)
					this.vx-=this.drag;
				else if(this.vx<0)
					this.vx+=this.drag;


				if(this.vy>0)
					this.vy-=this.drag;
				else if(this.vy<0)
					this.vy+=this.drag;


				//bounce
				if(this.x<=0 || this.x>ctx.canvas.width-this.size)
				{
					this.vx*=-0.25;
					this.x=(this.x<ctx.canvas.width/2)? 1: ctx.canvas.width- this.size - 1;
				}
				if(this.y<=0 || this.y>ctx.canvas.height-this.size)
				{
					this.vy*=-0.25;
					this.y=(this.y<ctx.canvas.height/2)? 1: ctx.canvas.height - this.size - 1;
				}

			}

			this.moveRight = function()
			{
				if(Math.abs(this.vx)<this.maxSpeed)
				{
					this.vx+=this.a;
					this.costume = 1;
				}
			}
			this.moveLeft = function()
			{
				if(Math.abs(this.vx)<this.maxSpeed)
				{
					this.vx-= this.a;
					this.costume = 1;
				}
			}
			this.moveDown = function()
			{
				if(Math.abs(this.vy)<this.maxSpeed)
				{
					this.vy+= this.a;
					this.costume = 1;
				}
			}
			this.moveUp = function()
			{
				if(Math.abs(this.vy)<this.maxSpeed)
				{
					this.vy-= this.a;
					this.costume = 1;
				}

			}


		}

