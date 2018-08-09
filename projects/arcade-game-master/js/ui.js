var UI = function(){
	"use strict";
	this.score = 0; // The score value is calculated as (this.score = 
	this.gems = {
		// Gem information are stored here
		total:0,
		green:0,
		blue:0,
		orange:0
	};
	
	this.level = 0; // This is the level container
	this.gameOver = false; // This is used for game state testing, it changes depending on the players actions like Death.
}

UI.prototype.gameState = function(state){
	// This function sets the this.gameOver property
	if(state === "not over"){
		this.gameOver = false;
	}else if(state === "over"){
		this.gameOver = true;
	}
}
UI.prototype.checkSetState = function(object){
	// This function sets the level
	this.gems.total = 	(this.gems.green * 1) + // green gems has a value of 1
						(this.gems.blue * 2) + 	// blue gems has a value of 2
						(this.gems.orange * 3);	// orange gems has a value of 3
	
	this.playerLives = object.lives; // Gets the current player live
	
	this.score = (this.level * this.gems.total); // calculate the score value
	
	if(object.yy < 38){
		this.nextLevel();
	}
}

UI.prototype.update = function() {
	"use strict";
	this.checkSetState(player); // calls the checkSetState() with the player as its argument
	
	if(this.level === maxLevel){ // checks if the player has reached the last level of the game(set in maxLevel var in initialiser.js) then set some values and call some functions like stoping the timer and ending the game
		won = true;
		this.gameOver = true;
		stopTimer();
		intervee = setInterval(gameOver, (gameOverDelay * 1000));
		player.isDead = true;
		
	}
};

UI.prototype.nextLevel = function() {
	// This function takes the game to the next level
	"use strict";
    player.reset();
	this.level++; // increment the level value
	if(allEnemies.length !== 0){ // Remove all Enemies For a clean slate
		for(var c = 0; c < totalEnemiesOnscreen; c++){
			allEnemies.pop();
		}
	}
	
	if(allLives.length !== 0){ // Remove all Lives For a clean slate
		for(var c = 0; c < totalLiveOnscreen; c++){
			allLives.pop();
		}
	}
	
	
	if(allGems.length !== 0){ // Remove all Gems For a clean slate
		for(var c = 0; c < totalGemOnscreen; c++){
			allGems.pop();
		}
	}
	
	if(this.level % 2 === 0){ // This increses the amount of enemies as the game progresses after every 2 levels
		totalEnemiesOnscreen++;
	}
	
	if(this.level !== maxLevel){ // This creates objects like Bugs, gems and lives on screen as long as the game is still not won by the player
		createObjects(totalEnemiesOnscreen, allEnemies, Enemy);
		createObjects(totalGemOnscreen, allGems, Gem, true, headsOrTails());
		createObjects(totalLiveOnscreen, allLives, Live, true, headsOrTails());
	}
};

// Draw the enemy on the screen, reqUIred method for game
UI.prototype.render = function() {
	// This is where the ui display is done
	"use strict";
	var score = "Score: " + this.score;
	var lives = "Live: "+this.playerLives;
	var level = "Level : "+this.level;
	
	if(this.level === maxLevel){ // Change level text on cleared level
	   level = "Level : All Cleared";
	}
	
	ctx.font = "30px Impact";
	ctx.fillText(score, canvasPercent(10, "x"), canvasPercent(20, "y"));
	ctx.fillText(lives, canvasPercent(80, "x"), canvasPercent(20, "y"));
	ctx.fillText(level, canvasPercent(10, "x"), canvasPercent(80, "y"));
	
	if(this.gameOver){ // Displays some extra text when the game is over
		this.stateX = canvasPercent(50, "x");
		this.stateY = canvasPercent(50, "y");
		ctx.font = "50px Impact";
		var text = "Game Over",
			ruler = ctx.measureText(text).width;
		if(won){
			text = "You Won!";
			ruler = ctx.measureText(text).width;
		}
		ctx.fillText(text, this.stateX - (ruler/2), this.stateY);
	}
};
