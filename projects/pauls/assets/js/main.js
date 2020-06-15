function badger(parent){
    var offsetFactor = {
        x: 8,
        y: 8
    };

    var positioned = { //calculate badge position with an offset.
        top: parent.children[0].offsetTop - offsetFactor.y,
        left: parent.children[0].offsetLeft + parent.children[0].clientWidth  - offsetFactor.x
    };

    var figure = parent.getAttribute("badge-count");
    if(parent.getAttribute("badge-created")=="true"){
        editBadge(figure, positioned, parent.children[1]);        
    }else{
        createBadge(figure, positioned, parent);
    }       
        
}

function createBadge(figure, positioned, parent){
    // Create and position the badge
    var span = document.createElement('span');
    span.setAttribute("class", "badge white-border badge-danger");
    span.textContent = figure;
    span.style.position = "absolute";
    span.style.top = positioned.top + "px";
    span.style.left = positioned.left + "px";
    span.style.zIndex = 200;
    console.log("Badge Created", figure);
    parent.appendChild(span);
    parent.setAttribute("badge-created", "true");
}

function editBadge(figure, positioned, badgeObj){

    badgeObj.textContent = figure;
    badgeObj.style.top = positioned.top + "px";
    badgeObj.style.left = positioned.left + "px";
}

function badgerSearch(){
    var badges = document.getElementsByClassName('badged');
    for(var i = 0 ; i < badges.length; i++){
        badger(badges[i]);
    }        
};

window.onresize = function(){
    badgerSearch();
};

window.onload = function(){
    badgerSearch();
};