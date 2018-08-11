// Game onscreen Controller

$.ready(function(){
 addListeners();
 enlargeButtons();
});

function enlargeButtons(){
  $(".movement").css("height", "20%");
}

function addListeners(){
  $("#moveleft").on("click", {direction:"left"}, move);
  $("#moveright").on("click", {direction:"right"}, move);
  $("#moveup").on("click", {direction:"up"}, move);
  $("#movedown").on("click", {direction:"down"}, move);
}

function move(event){
 console.log(event);
 player.handleInput(event.data.direction);
}
