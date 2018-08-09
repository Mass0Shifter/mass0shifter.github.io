// This is for generating uis
var Gem = function(id){
	"use strict";
	this.id = id; // Give The gem An id for array operations like deleting the specific gem after collection 
	this.sprite = RandomSelect(gems, gems.amount); // Set the sprite with the RandomSelect() function
	
	this.type = gemType(this.sprite); // Get the type of gem by its sprite
	
	 // Randomly position the gem on screen
	this.x = RandomSelect(Xpos, Xpos.amount);
	this.y = RandomSelect(Ypos, Ypos.amount);
	
	// This is the coord part of the image in pixels that contains the bug
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

// This is where all the collision tests are done
Gem.prototype.checkCollisions = function(player){
	"use strict";
	this.calculateCollisionBox();
	if((player.px1 <= this.px2) && (player.px2 >= this.px2)){// Check if the player touches the object from the objects front
		if((player.py1 <= this.py1)){ // check if the player's head/position y1 is lower than or equals that of the object
			if(player.py2 >= this.py1){ // check if the player's leg/position y2 is high than or equals the objects wing/ position y1
				this.addGem(ui);
				this.delete();
				return; // return, to prevent trigering the next collition test  
			}
		}
	}
	
	if((player.px1 <= this.px1) && (player.px2 >= this.px1)){ // Check if the player touches the object from behind the object
		if((player.py1 <= this.py1)){ // check if the player's head/position y1 is lower than or equals that of the object
			if(player.py2 >= this.py1){ // check if the player's leg/position y2 is high than or equals the objects wing/ position y1
				this.addGem(ui);
				this.delete();
			}
		}
	}
	
};

Gem.prototype.update = function() {
	"use strict";
    this.checkCollisions(player);	
};

// Draw the enemy on the screen, required method for game
Gem.prototype.render = function() {
	"use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Gem.prototype.calculateCollisionBox = function(){
	"use strict";
	// This is the current collision box coords for the Gem
	// Calculate the collision box location of the Gem.
	this.px1 = this.x + this.bx1;
	this.px2 = this.x + this.bx2;
	this.py1 = this.y + this.by1;
	this.py2 = this.y + this.by2;
}

Gem.prototype.addGem = function(ui){
	// Determine the type of gem and then increment the amount of the type collected in the ui class
	"use strict";
	if(this.type === "Green"){
		ui.gems.green += 1;	
	}else if(this.type === "Blue"){
		ui.gems.blue += 1;	
	}if(this.type === "Orange"){
		ui.gems.orange += 1;	
	}
};

Gem.prototype.delete = function(){
	// Search the array allGems for this.id of this object and remove the object with the id, hence deleting this object.
	"use strict";
	for(var x in allGems){
		if(this.id === allGems[x].id){
			allGems.splice(x, 1);
		}
	}
};
