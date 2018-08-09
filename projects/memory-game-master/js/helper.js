// This java script file helps with some function to reduce the complexity of the app.js file

// Get the modal
let modal = document.getElementById('myModal'),
	
	ratings = { // These determine the amount of moves required to score from 3 stars to 1 star
		three:8,
		twohalf:12,
		two:15,
		onehalf:18,
		one:20,
	},

// Get hold of all the restart buttons
	rbtn = document.getElementsByClassName("restart");

function makeStar(size){// Creates the star objects
	"use strict";
	
		if(size === "F"){// Creates a full star dom element
			
			let l = document.createElement("i");	l.setAttribute("class", "fa fa-star");
			return l;
			
		}else if(size === "H"){// Creates a half star dom element
			
			let lo = document.createElement("i");	lo.setAttribute("class", "fa fa-star-half");
			return lo;
			
		}
	}

function starAmount(amount){// Determine the amount of start to be created
	"use strict";
	
	let elemente = [];// For holdiing the created stars
	
	if(amount === 3){
		
		for(let i = 0; i < 3; i++){ // Calls the makeStar() to create and array of stars
				elemente[i] = makeStar("F");
		}
		return elemente;
		
	}else if(amount === 2.5){
		
		for(let x = 0; x < 3; x++){ // Calls the makeStar() to create and array of stars
				if(x!==2){elemente[x] = makeStar("F");}
				else if(x===2){elemente[x] = makeStar("H");}
		}
		return elemente;
		
	}else if(amount === 2){
		
		for(let z = 0; z < 2; z++){ // Calls the makeStar() to create and array of stars
				elemente[z] = makeStar("F");
		}
		return elemente;
		
	}else if(amount === 1.5){
		
		for(let c = 0; c < 2; c++){ // Calls the makeStar() to create and array of stars
				if(c!==1){elemente[c] = makeStar("F");}
				else if(c===1){elemente[c] = makeStar("H");}
		}
		return elemente;	
		
	}else{
		
		for(let v = 0; v < 1; v++){ // Calls the makeStar() to create and array of stars
				elemente[v] = makeStar("F");
		}
		return elemente;	 
	}		
}



function starRating(moves){	// Triggers the star creation process
	"use strict";
	
	if(moves <= ratings.three){
		
		return starAmount(3);
		
	}else if((ratings.three < moves)&& (moves <= ratings.twohalf)){
		
		return starAmount(2.5);
		
	}else if((ratings.twohalf < moves)&& (moves <= ratings.two)){
		
		return starAmount(2);
		
	}else if((ratings.two < moves)&& (moves <= ratings.onehalf)){
		
		return	starAmount(1.5);
		
	}else if(moves > ratings.onehalf){	
		
		return starAmount(1);	
		
	}
}

function restarts(){
	"use strict";
	modal.style.display = "none";
	resetTime();
	moved(false, 0);
	clean(true);
	currentStarRating(true);
	alert("Game Start!");
	createdCards = createCards();
}

function addRestartEvent(){ // This function finds all the restart icons on the page 
							// and adds the restart function to them.
	"use strict";
		for(let x = 0; x < rbtn.length; x++){
			rbtn[x].addEventListener("click", restarts, false);		
		}
}

function chooseShape(num){  // For Choosing the Shape/Icons of the cards
	
	"use strict";
	
	switch(num){
		case "1":
			return "fa fa-diamond";

		case "2":
			return "fa fa-paper-plane-o";

		case "3":
			return "fa fa-anchor";

		case "4":
			return "fa fa-bolt";

		case "5":
			return "fa fa-cube";

		case "6":
			return "fa fa-leaf";

		case "7":
			return "fa fa-bicycle";

		case "8":
			return "fa fa-bomb";

			
	 }
}

function compareArray(array){ 	
	// This checks an array if its empty or not,  if its empty 
	// it returns zero else it returns the length of the array.
	// It is use full for adding element to an array with out a loop statement
	"use strict";
	
	if(array.length === 0){
		
		return 0;
		
	}else{
		
		return array.length;
		
	}

}