// Js Doc

var workersList = [
	//"Ebubechukwu Precious Chikezie",
	"Onyedikachi Princess Samuel",
	"Ejiro Abohwo Fortune",
	"Maryann Danladi",
	"Adedoyin Hannah Oyewole",
	"Emmanuel Oladipo",
	"Afam Samuel Chinasa",
	"Divine Oriaku Chibuzor",
	"Favour Emmanuel Emenoke",
	//"John Adeyemi",
	//"Michael Ayodele",
	"Abdulazeez Akindele",
	"Miracle Onoja Agaba",
	"Josh",
	//"Daniella Imaobong Uno",
	"Oginni Oluwatomiwa Samuel"
],
	sundays = 4,
	amountOfWorkersPerSunday = workersList.length / sundays;

function sunday(index){
	switch(index){
		case 1:
			return "First Sunday";
		case 2:
			return "Second Sunday";
		case 3:
			return "Third Sunday";
		case 4:
			return "Fourth Sunday";
		case 5:
			return "Fifth Sunday";
	}
}

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

function createField(){
	"use strict";
var mainDiv = document.getElementById("main_div"),
	rows = [],
	divs = [],
	index = 0,
	numberPerSunday = amountOfWorkersPerSunday,
	shuffled = shuffle(workersList);
	
	mainDiv.innerHTML = "";
	for(var i= 0; i < shuffled.length; i++){
		// 
		divs[i] = document.createElement("div");
		divs[i].setAttribute("class", "col-xs-4 bg-success");
		divs[i].textContent = shuffled[i];
	}	
	//divs.forEach(function(s){console.log(s)});
	for(var o = 0; o < sundays; o++){
			var cur = compareArray(rows);
			rows[cur] = document.createElement("div");
			rows[cur].setAttribute("class", "row text-center");
	}
	rows.forEach(function(row){
		index++;
		var h2 = document.createElement("h2");
		h2.textContent = sunday(index);
		row.appendChild(h2);
		for(var k = 0; k < numberPerSunday; k++){
			row.appendChild(divs.pop());
		}
	});
	
	for(var g = 0; g < sundays; g++){
			mainDiv.appendChild(rows[g]);
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

window.onload = function(){
	console.log();
	createField();
}