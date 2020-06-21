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

function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
      elmnt = z[i];
      /*search for elements with a certain atrribute:*/
      file = elmnt.getAttribute("w3-include-html");
      if (file) {
        /* Make an HTTP request using the attribute value as the file name: */
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("w3-include-html");
            includeHTML();
          }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
      }
    }
  }

  var all = 0;
  
function reOccuringEvents(){
    badgerSearch();
    // console.log("TESTing 1" + all++)
}

function beginReOccuring(){
    // console.log("TESTing 2" + all++)
    var rOE = setInterval(reOccuringEvents, 250);
}

window.onresize = function(){
    badgerSearch();
};

window.onload = function(){
    beginReOccuring();

};