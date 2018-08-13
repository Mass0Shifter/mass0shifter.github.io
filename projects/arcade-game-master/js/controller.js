// Game onscreen Controller

window.onload = function(){
	 console.log("document.load");
	 startTimer(); // Starts the game timer
	 middlerBtnController();
	 addListeners();
};


function addListeners(){
  console.log("listeners.readying");
 
  $("#moveleft").on("click", function(){ move("left")});
  console.log("moveleft.ready");
 
  $("#moveright").on("click", function(){ move("right")});
  console.log("moveright.ready");
 
  $("#moveup").on("click", function(){ move("up")});
  console.log("moveup.ready");
 
  $("#movedown").on("click", function(){ move("down")});
  console.log("movedown.ready");
}

function move(direction){
 console.log(direction);
 player.handleInput(direction);
}

function middlerBtnController(){
	var y = window.innerHeight, x = window.innerWidth, midX = x/2, midY = y/2;

	var left = $("#moveleft"),
		right = $("#moveright"),
		up = $("#moveup"),
		down = $("#movedown");
	console.log(up[0].clientWidth, down, left, right);
		
	$(".movement").css("transform", "scale(2)").css("margin", "2%")
		.css("position", "absolute")
		.css("top", midY+"px");
		
	$("#moveleft").css("left", x-x+"px");
	 
	$("#moveright").css("left", (x-(right[0].clientWidth*2)-percenter(2.5, x))+"px");
	  
	$("#moveup").css("left", percenter(8, x)+"px");
	 
	$("#movedown").css("left", percenter(84, x)+"px");
}

function percenter(percent, original){ //This function calculates in percent the desired position on the canvas element

	var ap = (percent * original) / 100;
	return ap;
	
}
