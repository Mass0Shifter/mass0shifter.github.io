// Game onscreen Controller

$.ready(function(){
 console.log("document.ready");
 addListeners();
 enlargeButtons();
});

function enlargeButtons(){
 console.log("large.readying");
 $(".movement").css("height", 20+"%");
 console.log("large.ready");
}

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
