// Game onscreen Controller

$("document").load(function(){
 addListener();
 enlargeButtons();
});

function enlargeButtons(){
  $(".movement").css(["width", "height"], "20%");
}

function addListeners(){
  $("#moveleft").on("click", {direction:"left"}, move);
  $("#moveright").on("click", {direction:"right"}, move);
  $("#moveup").on("click", {direction:"up"}, move);
  $("#movedown").on("click", {direction:"down"}, move);
}

function move(event){
 player.handleInput(event.data.direction);
}
