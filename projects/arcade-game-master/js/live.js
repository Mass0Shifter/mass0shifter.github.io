// This is for generating uis
var Live = function(id){
	"use strict";
	this.id = id;	
	this.sprite = 'images/Heart.png';
	
	// Randomly position the live on screen
	this.x = RandomSelect(Xpos, Xpos.amount);
	this.y = RandomSelect(Ypos, Ypos.amount);
	
	// This is the current position of the collision box, dimensions and coords on canvas for this sprite class object, to be calculated by the this.calculateCollisionBox() method during collision tests
	// px = position X-axis
	// py = position Y-axis
	this.bx1 = 30;
	this.bx2 = 60;
	this.by1 = 80;
	this.by2 = 160;
};

// This is where all the collision tests are done
Live.prototype.checkCollisions = function(player){
	"use strict";
	this.calculateCollisionBox();
	if((player.px1 <= this.px2) && (player.px2 >= this.px2)){// Check if the player touches the object from the objects front
		if((player.py1 <= this.py1)){ // check if the player's head/position y1 is lower than or equals that of the object
			if(player.py2 >= this.py1){ // check if the player's leg/position y2 is high than or equals the objects wing/ position y1
				this.addLive(player);
				this.delete();
				return;// return, to prevent trigering the next collition test  
			}
		}
	}
	if((player.px1 <= this.px1) && (player.px2 >= this.px1)){ // Check if the player touches the object from behind the object
		if((player.py1 <= this.py1)){ // check if the player's head/position y1 is lower than or equals that of the object
			if(player.py2 >= this.py1){ // check if the player's leg/position y2 is high than or equals the objects wing/ position y1
				this.addLive(player);
				this.delete();
			}
		}
	}
	
	
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Live.prototype.update = function() {
	"use strict";
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
	this.checkCollisions(player);	
};

// Draw the enemy on the screen, required method for game
Live.prototype.render = function() {
	"use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Live.prototype.calculateCollisionBox = function(){
	"use strict";
	// This is the current collision box coords for the bug at the current frame in time
	// Calculate the collision box location of the live.
	this.px1 = this.x + this.bx1;
	this.px2 = this.x + this.bx2;
	this.py1 = this.y + this.by1;
	this.py2 = this.y + this.by2;
}
Live.prototype.addLive = function(object){
	// Increments the amount of lives remaining for the player object
	"use strict";
	object.lives += 1;
};
Live.prototype.delete = function(){
	// Search the array allLives for this.id of this object and remove the object with the id, hence deleting this object.
	"use strict";
	for(var x in allLives){
		if(this.id === allLives[x].id){
			allLives.splice(x, 1);
		}
	}
};
