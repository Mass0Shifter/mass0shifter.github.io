// Game onscreen Controller

$("document").load(addListener);

function addListeners(){
 $("#moveleft").on("click", {direction:"left"}, move);
 $("#moveright").on("click", {direction:"right"}, move);
 $("#moveup").on("click", {direction:"up"}, move);
 $("#movedown").on("click", {direction:"down"}, move);
}

function move(event){
 player.handleInput(event.data.direction);
}
