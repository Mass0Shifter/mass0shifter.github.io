// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
	this.speed = RandomSelect(speeds, speeds.amount); //randomSpeed(speeds);
	this.positionY = RandomSelect(Ypos, Ypos.amount); //randomPositionY(Ypos);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
	
    this.sprite = RandomSelect(bugs, bugs.amount); //randomBug(bugs); //This sets the sprite of the bug randomly
	this.x = -200; // sets the starting location of the bug.
	this.y = this.positionY;
	
	// This is the coord part of the image that contains the bug
	this.bx1 = 30;
	this.bx2 = 60;
	this.by1 = 80;
	this.by2 = 160;
	
	// This is the current position of the collision box, dimensions and coords on canvas for this sprite class object, to be calculated by the this.calculateCollisionBox() method during collision tests
	// px = position X-axis
	// py = position Y-axis
	this.px1 = 0;
	this.px2 = 0;
	this.py1 = 0;
	this.py2 = 0;
};

Enemy.prototype.checkCollisions = function(player){
	"use strict";
	this.calculateCollisionBox();
	if((player.px1 <= this.px2) && (player.px2 >= this.px2)){// Check if the player touches the bug from the bugs front
		
		if((player.py1 <= this.py1)){ // check if the player's head/position y1 is lower than or equals that of the bug
			
			if(player.py2 >= this.py1){ // check if the player's leg/position y2 is high than or equals the bugs wing/ position y1
				
				if(player.lives < 1){ // This prevents the players live from decreasing to a negative value after death
					return;
				}
				player.reset(this, true);
				return; // return, to prevent trigering the next collition test 
			}
		}
	}
	if((player.px1 <= this.px1) && (player.px2 >= this.px1)){ // Check if the player touches the bug from behind the bug
		
		if((player.py1 <= this.py1)){ // check if the player's head/position y1 is lower than or equals that of the bug
			
			if(player.py2 >= this.py1){ // check if the player's leg/position y2 is high than or equals the bugs wing/ position y1
				
				if(player.lives < 1){ // This prevents the players live from decreasing to a negative value after death
					return;
				}
				player.reset(this, true);
			}
		}
	}
	
	
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	"use strict";
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.checkCollisions(player);
	if(this.x > 505){
		this.reset("reset");
	}
	this.x +=this.speed*dt; // Is the movement engine of the bugs
	
	this.y = this.positionY; // set the bug of the road
	
	if(player.isDead){
		this.reset("stop"); // Stops the bugs from moving, when the player dies
	}
	
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function(state){
	// Set the bug back to starting positions
	
	"use strict";
	if(state === "reset"){
		this.speed = RandomSelect(speeds, speeds.amount);
		this.positionY = RandomSelect(Ypos, Ypos.amount);
		this.x = -200;
		this.sprite = RandomSelect(bugs, bugs.amount);
		return;
	}
	// Stop the bug at its current position
	if(state === "stop"){
	   	this.speed = 0;
		return;
	   }
}
Enemy.prototype.calculateCollisionBox = function(){

	// This is the current collision box coords for the bug
	// Calculate the collision box location of the bug.
	this.px1 = this.x + this.bx1;
	this.px2 = this.x + this.bx2;
	this.py1 = this.y + this.by1;
	this.py2 = this.y + this.by2;
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var player = function() {
	"use strict";
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our player, this uses
    // a helper we've provided to easily load images
    this.sprite = playerCharacter; // sets the sprite of the player
	this.lives = playerStartingLives; // sets the initial amount of lives for the player.
	this.isDead = false; // This value is used to determine the players live or death state
	
	// this is the reset start positions
	this.xx = 202;
	this.yy = 380;
	
	// This is the coord part of the image that contains the player
	this.bx1 = 10;
	this.bx2 = 90;
	this.by1 = 80;
	this.by2 = 160;
	
	// This is the current position of the collision box, dimensions and coords on canvas for this sprite class object, to be calculated by the this.calculateCollisionBox() method during collision tests
	// px = position X-axis
	// py = position Y-axis
	this.px1 = 0;
	this.px2 = 0;
	this.py1 = 0;
	this.py2 = 0;
	
};


player.prototype.update = function(/*dt*/) {
	"use strict";
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.calculateCollisionBox();
	
//	if(this.yy < 38){
//		ui.nextLevel();
//	}
		this.x = this.xx;
		this.y = this.yy;
	
};

player.prototype.handleInput = function(input){
	// This is where the movement calculation is done based on the user input
	"use strict";
	if(this.isDead){ // stops the user from moving the player when the player is dead
		return;
	}
	
	switch(input){
		case "left":
				if(this.x <= 1){ return;}
				this.xx -= 101;
				break;
		case "right":
				if(this.x >= 404){ return;}
				this.xx += 101;
				break;
		case "up":
				this.yy -= 85.5;
				break;
		case "down":
				if(this.y >= 380){ return;}
				this.yy += 85.5;
				break;
	}
}

player.prototype.render = function render() {
	"use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.reset = function(enemy, died){
	"use strict";
	if(died === null){died = false;}
	if(died){
		this.lives -= 1;
	}
	if(this.lives <= 0){
		console.log("Dead"); // Write dead to the console
		ui.gameState("over");
		this.isDead = true;
		stopTimer();
		intervee = setInterval(gameOver, (gameOverDelay * 1000));
		return;
	}
	
	//Reset the players position
	this.xx = 202; 
	this.yy = 380;
};

player.prototype.calculateCollisionBox = function(){
	"use strict";
	// This is the current collision box coords for the player
	// Calculate the collision box location of the player.
	this.px1 = this.xx + this.bx1;
	this.px2 = this.xx + this.bx2;
	this.py1 = this.yy + this.by1;
	this.py2 = this.yy + this.by2;
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	"use strict";
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
