// Game onscreen Controller

$.ready(function(){
 addListeners();
 enlargeButtons();
});

function enlargeButtons(){
  $(".movement").css("height", 20+"%");
}

function addListeners(){
  $("#moveleft").on("click", function(){ move("left")});
  $("#moveright").on("click", function(){ move("right")});
  $("#moveup").on("click", function(){ move("up")});
  $("#movedown").on("click", function(){ move("down")});
}

function move(direction){
 console.log(direction);
 player.handleInput(direction);
}
