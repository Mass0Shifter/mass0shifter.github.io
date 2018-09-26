/*
 * Create a list that holds all of your cards
 */
let createdCards = []/*For Storing Array Of Created Cards*/, 
	openCards_id = []/*For Storing Id Of Open Cards*/, 
	matchedCards = []/*For Storing Id Of Matched Cards*/,
	totalMoves = 0/*Total Moves Taken*/,
	totalTwin = 8 /*Total number of twin cards*/,
	intervee, // This is an Interval handle for the card open state, after a while the card closes
	temp, // this is used to store temporal data for the check() function after the wait
	isTitled = false, // For debuging and testing purpose set it to false to disable the tool tip
	Card_Array_Label = "1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8"; // A hold for the id of each card

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	"use strict";
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function displayCards(array){// Displays Cards After creation and Shuffle
	"use strict";
	
	let cards_duck = document.getElementsByClassName("deck")[0], // grab hold of where the cards will ba placed
		new_array = shuffle(array); // Shuffle the created cards and put it in an array
	cards_duck.innerHTML = "";
	for(let i = 0; i < new_array.length; i++){
		cards_duck.appendChild(new_array[i]);
	}
}

function createCards(){
	"use strict";
	let cards = [],
		numOcard = totalTwin * 2, // Total number of cards
		arry = Card_Array_Label.split(","); // Total number of cards
	
	
	for(let x = 0; x < numOcard; x++){ // This loop creates the first set of cards a 
		if(x > 7){
			break;
		}
		let li_a = document.createElement("li"), _id = arry.pop(), icon_a = document.createElement("i");
		li_a.appendChild(icon_a);
		li_a.setAttribute("id", _id+"a");
		li_a.setAttribute("class", "card");
		icon_a.setAttribute("class", chooseShape(_id));

		if(isTitled){
			li_a.setAttribute("title", _id+"a");
			li_a.setAttribute("class", "card "+ "a"+_id);
		}
		
		li_a.addEventListener("click", cardClick, false);
		cards[x] = li_a;
	}
	
	for(let y = 0; y < numOcard; y++){ // While this loop creates the twin of a cards which is b
		
		if(y < 8 ){
			continue; // Skips creating of a cards 
		}
		let li_b = document.createElement("li"), // Create the li element that contains the card info
			_ids = arry.pop(), // takes the id for the current card
			icon_b = document.createElement("i"); // Creates the i element, the icon of the card
		
		li_b.appendChild(icon_b);
		li_b.setAttribute("id", _ids+"b");
		li_b.setAttribute("class", "card");
		icon_b.setAttribute("class", chooseShape(_ids));
		
		if(isTitled){
			li_b.setAttribute("title", _ids+"b");
			li_b.setAttribute("class", "card "+ "a"+_ids);
		}
		
		li_b.addEventListener("click", cardClick, false);
		cards[y] = li_b;
	}
	displayCards(cards);
	return cards;
}

function cardClick(clicked){
	"use strict";
//	console.log(clicked.target);
	if(intervee !== undefined)
	{
		// Checks to see if a player has already clicked a card,
		// And has clicked again,
		// while the cardClick() and check() functions are not done running
		return;
	}
	
	if(clicked.target.tagName !== "LI"){
		console.log( clicked.target.tagName, "You Click the icon of An Open Card");
		return;
	}
	
	if(openCards_id.length > 0){
		for(let o = 0; o < openCards_id.length; o++){  	// Check if the card is already open, 
														// if so return nothing and continue the game.
			if(openCards_id[o] === clicked.target.getAttribute("id")){
				console.log("Clicked An Open Card!!");
			return;
			}
		}
	}
	
	if(openCards_id.length === 0){
		openCards_id[compareArray(openCards_id)] = clicked.target.getAttribute("id");
		clicked.target.setAttribute("class", "card open");
		console.log("First Card!!");
		return;
	}
	
	openCards_id[compareArray(openCards_id)] = clicked.target.getAttribute("id");//Add the card ID IN to the list of open cards
	
	clicked.target.setAttribute("class", "card open");	//Show whats on the card
	
	temp = clicked.target; // Hold on to the clicked item for the check() 
					// to access its data. after waiting 0.5Secs for the user to memorise
	
	intervee = setInterval(check, 500);		//For 0.5 Seconds	
}

function check(){
	"use strict";

	if(temp.getAttribute("id").charAt(0) === openCards_id[0].charAt(0)){//Check if the clicked card matche the opened one 
		for(let x = 0 ; x < openCards_id.length; x++){
			let cl = document.getElementById(openCards_id[x]);
			cl.setAttribute("class", "card match");//Change the class to matched
			cl.removeEventListener("click", cardClick);//Remove The click event listener
			
		}
		matchedCards[compareArray(matchedCards)] = temp.getAttribute("id").charAt(0); // Add the clicked card to 																					  // the list of matched cards
		//console.log("matched");
		regularCheck();
	}else{
		
		for(let y in openCards_id){
			let sl = document.getElementById(openCards_id[y]);

			sl.setAttribute("class", "card");
		}
		
		//console.log("not a matched, Closed");
		regularCheck();
	}
}

function regularCheck(){ // Call Some Functions;
	
	moved();
	clean();
	gameCheck();
	
}

function clean(clearAll = false){
	
	for(let x = 0; x < 2; x++){	 // Removes all card id in the openCards_id array, Hence clear all open cards
		openCards_id.pop();
	}
	
	if(clearAll){
		for(let x = 0, f = matchedCards.length; x < f; x++){	 // Removes all card id in the matchedCards array, Hence clear all matched cards
		console.log(matchedCards, "Has: " + matchedCards.length + " Remaining objects");
		matchedCards.pop();
		}
		console.log("Has: 0 Remaining objects");
	}
	
	clearInterval(intervee); // Stops the interval;
	
	intervee = undefined; // Makes sure the interval is umdefined for testing purposes;
	
	temp = undefined; // Clears the temp data;
	
}

function moved(moved=true, amount = 1){ //  Adds To The Amount of Moves Made
	
	//"use strict";
	
	let moves = document.getElementsByClassName("moves")[0];
	
	if(moved){
		totalMoves = amount + totalMoves;
		moves.innerHTML = totalMoves; //Increase total moves by 1, then Display the new amount of moves
	}else{
		totalMoves = amount;
		moves.innerHTML = totalMoves;
	}
}

function currentStarRating(Reset){ // This function gets the in game current star rating not the won game star rating
	"use strict";
	let stars = document.getElementsByClassName("stars")[0]; // Get hold of the star DOM container
	if((totalMoves > ratings.three) || (Reset)){
		stars.innerHTML = "";
		let t = starRating(totalMoves);
		for(let x in t){
			stars.appendChild(t[x]);
		}
	}
}

function gameCheck(){
	"use strict";
	
	currentStarRating();
	
	if(matchedCards.length === totalTwin	){ // Check if all cards are matched if so call the won() function
		won();
	}
}

function won(){ // this function is called when the player wins the game
	
	"use strict";
	
	stopTimer(); // Stops the time.
	
	modal.style.display = "block"; // Displays the Score board.
	
	document.getElementById("finishtime").innerHTML = getTiming(); // Display the time of game play to the score screen
	
	document.getElementById("numbermoved").innerHTML = totalMoves; 	// Displays the total number of moves 
																	// made to the score screen
	let STAR = starRating(totalMoves), // Generate the stars
		Sx = document.getElementById("starss"); // Grabs Hold of the star ration space on the modal panel
	
	Sx.innerHTML = "";
	
	for(let x = 0; x < STAR.length; x++){// Displays the generated stars
		Sx.appendChild(STAR[x]);
	}
	
}

function startUp(){
	"use strict";
	alert("Game Start!");
	
	startTimer();
	
	addRestartEvent();
	
	createdCards = createCards();
}

window.onload = startUp();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
