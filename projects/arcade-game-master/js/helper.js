// Definition of helper functions for a clean and short class files

function createObjects(length, holder, type, id=false, doIt = true){
	if(doIt){
		for(var x = 0; x < length; x++){
			if(id){
				holder[x] = new type(x);
			}else{
				holder[x] = new type();
			}
		}
	}else{
		return;
	}
}

function canvasPercent(percent, axis, canva = canvas){ //This function calculates in percent the desired position on the canvas element
	//That is say the canvas width is 200 calling the function canvasPercent(50, x)
	// Will return 100 as it is fifty percent of the width which is 200 wide on the x axis
	//"use strict";
	var ap;
	if(axis === 'x'){
		ap = (percent * canva.width) / 100;
	return ap;
	}
	if(axis === 'y'){
		ap = (percent * canva.height) / 100;
	return ap;
	}
	
}

function headsOrTails(){ // Randomly Select Heads Or Tails, returns True or false
	"use strict";
	var rN = Math.random(); // Generates a random number for chosing random boolean values
	
	if(rN < 0.5){
		return true;
    }else{
    	return false;
    }
}

function RandomSelect(object, amount){
	var rNum = Math.random(); // Generates a random number for chosing random Gem Sprite
	var Amount = [];
	
	var Dif = 1/amount;
	
	for(var x = 0; x < amount; x++){
		if(x > 0){
			var formal = x - 1;
			Amount[x] = Amount[formal] + Dif;
		}else{
			Amount[x] = Dif;
		}
	}
	
	if(rNum < Amount[0]){
			return object.One;
		}else if((rNum >= Amount[0]) && (rNum < Amount[1])){
			return object.Two;
		}else if((rNum >= Amount[1]) && (rNum < Amount[2])){
			if(object.Three === undefined){
				object.Three = object.One;
			}
			return object.Three;
		}else if((rNum >= Amount[2]) && (rNum < Amount[3])){
			if(object.Four === undefined){
				object.Four = object.Two;
			}
			return object.Four;
		}else if((rNum >= Amount[3]) && (rNum <= Amount[4])){
			if(object.Five === undefined){
				object.Five = object.Three;
			}
			return object.Five;
		}
	
}

function gemType(type){ // Randomly Select Gem Type name for use in the add gem method of GEM
	"use strict";
	
	switch(type){
		case 'images/Gem Green.png':
			return "Green";
		case 'images/Gem Blue.png':
			return "Blue";
		case 'images/Gem Orange.png':
			return "Orange";
	}
}

function restarts(){
	"use strict";
		location.reload(); // Reloads the entire page there by resetting everything
}

function addRestartEvent(){ // This function finds all the restart icons on the page 
							// and adds the restart function to them.
	"use strict";
		for(var x = 0; x < rbtn.length; x++){
			rbtn[x].addEventListener("click", restarts, false);		
		}
}


function gameOver(){
	"use strict";
	clearInterval(intervee);
	addRestartEvent();
	stopTimer();
	//charact.src = player.sprite; //this is for displaying player character used if implemented, if i find time.
	
	
/* This is where the display of score board info is prepared */
	gGem.innerHTML = ui.gems.green;
	bGem.innerHTML = ui.gems.blue;
	oGem.innerHTML = ui.gems.orange;
	leveles.innerHTML = "You Reached Level " + ui.level;
	scorese.innerHTML = ui.score;
	times.innerHTML = "Your Play Time: " + getTiming(); // Display the time of game play to the score screen
	
	modal.style.display = "block";
	if(won){
		times.innerHTML = " Congrats You Finished The Game In " + getTiming();
		liveses.style.display = "block" ; // Show the score board
		heartses.innerHTML = player.lives;
		titlee.innerHTML = "You Won!";
		leveles.innerHTML = "You cleared all Levels";
	}
}
