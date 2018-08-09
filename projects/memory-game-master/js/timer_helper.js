// JavaScript Document
// This Java script file handles the time functionality of the game. 

let time_display = document.getElementById("timer"), // The Timer Display Handle
	currentTime=0, // The Current time in seconds for calculation of Both Mins and Secs
	secs=0, // The Actual secons holder for the game
	mins=0,  // The Actual minutes holder for the game
	timing; // the setInterval ancor

function startTimer(){ // This Begins the timer
	"use strict";
	timing = setInterval(tickTock, 1000);
}

function tickTock(){ // This is called for every seconds that passes
	"use strict";
	currentTime++; 	// increment the currentTime Var for use of calculation 
					// of time in the convertSECMIN() function
	covertSECMIN();	
}

function covertSECMIN(){ // This is where both mins and seconds are calculated using the currentTime Var
	"use strict";
	if(currentTime === 60){
		
		mins++;
		currentTime = 0;
		displayTime();
		
	}else{
		
		secs=currentTime;
		displayTime();
		
	}
}

function getTiming(){ // getTiming() creates an understandable time format for reading.
	"use strict";
	if(mins !== 0){
		return mins + " Minutes : " + secs + " Seconds";
	}else{
		return secs + " Seconds";
	}
	
}

function toTwoDigit(digit){ // Makes sure too return a 2 digit based number in this case 
							// two digit seconds Eg 3:00 or 3:23
	"use strict";
	if(digit < 10){
		return "0" + digit;
	}else{
		return digit;
	}
}

function displayTime(){ // This Displays the time during the game.
	"use strict";
	time_display.innerHTML = mins + ":" + toTwoDigit(secs);
}

function stopTimer(){ // This stops the timer.
	"use strict";
	clearInterval(timing);
}

function resetTime(){
	"use strict";
	mins = 0;
	secs = 0;
	currentTime = 0;
	clearInterval(timing);
	displayTime();
	startTimer();
}