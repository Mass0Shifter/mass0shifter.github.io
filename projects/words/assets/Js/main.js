// Declaration of general variables
var forms = document.getElementById("fom"), 
		permutation_number = document.getElementById("Cho_Am"),
		permutation_button = document.getElementById("sub"),
		word_march_counter = 0,
		permutations_found_counter = 0,
		vsas = 0,
		permutations_found = [];//;
//		permutation_Clamp = document.getElementById("Am");
function swap(array, frstElm, scndElm){
	"use strict";
    var temp = array[frstElm];
    array[frstElm] = array[scndElm];
    array[scndElm] = temp;
}
//var fi=0;
function permutation(array, leftIndex, size) {
	"use strict";
    if(leftIndex === size) {
//alert("end" + fi);
		
        var temp = "";

        for (var i = 0; i < array.length; i++) {
            temp += array[i];
			if((i+1) === array.length){
				//alert(temp+permutation_number.value);
				if(temp.length == permutation_number.value){
					//alert(vsas);
					if(permutation_number.value > 0 ){
						//alert(vsas);
						vsas = permutation_number.value;
					} 
					permutations_found[permutations_found_counter] = temp;
					//alert(temp);
				}
			}
        }

       	console.log("---->" + temp);
		permutations_found_counter = permutations_found_counter + 1;
    	//fi++;
	 } else {
//alert("start" + fi);
        for(var x = leftIndex; x < size; x++) {
            swap(array, leftIndex, x);
			//alert("leftIndex is " + leftIndex + " and x is " + x);
			//fi++;
            permutation(array, leftIndex + 1, size);
			
        }
    }
	
	if(calcPermutationPossiblities(permutation_number.value) == permutations_found.length ){
		alert(calcPermutationPossiblities(permutation_number.value) + " result Ready " + permutations_found.length);
//		alert("result Ready");
		permutation_button.removeEventListener("click", genPermutationListArray);
		permutation_button.addEventListener("click", showIt, false);
		document.getElementById("sub").innerHTML = "Show the results";
	}
//	alert("this is "+vsas+" the current value of vsas and this is the permutation value "+calcPermutationPossiblities(vsas)+" This is the amount found "+permutations_found.length);
	
}

function showIt(){
	"use strict";
	finalPrint(checkForEnglishMatch(permutations_found));
}

function finalPrint(final){
	"use strict";
	document.getElementById("head_tx").innerHTML = "here are you possible answers";
	document.getElementById("fom").innerHTML = "";
	var g = document.createElement("ul");
	for(var y = 0; y<final.length;y++){
		var o = document.createElement("li"), p = document.createTextNode(final[y]); 
		o.appendChild(p);
		g.appendChild(o);
	}
	document.body.appendChild(g);
	
}

function checkForEnglishMatch(arrayList){
	"use strict";
	var arrayFoundWords = [];
	for(var x = 0; x<arrayList.length;x++){
		if(words.search("\n"+arrayList[x]+"\n") > 0){
			arrayFoundWords[word_march_counter] = arrayList[x];
			word_march_counter = word_march_counter +1;
		}
	}
	return arrayFoundWords;
}

function genPermutationListArrayCollectionForm(){
	"use strict";
	if(permutation_number.value>2){
		for(var x=0;x<permutation_number.value;x++){
//			alert(permutation_number.value);
			var a = document.createElement("input"), b = document.createElement("br"), 
				c = document.createElement("br");
			a.setAttribute("name", "in");
			a.setAttribute("size", 1);
			if(x===0){
				forms.innerHTML = "";
			}
			forms.appendChild(a);
			if(x!==0){
				if(x%4===0){
					forms.appendChild(b);
					forms.appendChild(c);
					continue;
				}
			}
			forms.innerHTML +="&nbsp&nbsp&nbsp&nbsp&nbsp";
			
		}
		permutation_button.removeEventListener("click", genPermutationListArrayCollectionForm);
		permutation_button.addEventListener("click", genPermutationListArray, false);
	}
}

function calcPermutationPossiblities(figure){// calculate permution possiblities eg 8! = 8*7*6*5*4*3*2*1 = 40,320;
	"use strict";
	var ts = figure, arr = 0, final;
	for(var x=0; x < figure ;x++){
		if(x === 0){
			arr = ts * (ts-1);
			ts--;	
			//alert("arr is = "+arr+"  ts is = "+ts);
			continue;
		}else{
			//alert("arr is = "+arr+"  ts is = "+ts);
			arr = arr * (ts-1);
			ts--;
		}
		if(arr > 0){
			if(final > (figure-1)){
				continue;
			}
			final = arr;
		}
		//alert("this is the permution function loop "+arr);
	}
	//alert("this is the permution function "+final);
	return final;
}

function genPermutationListArray(){
	"use strict";
	var listCollection = document.getElementsByName("in"), arri = [];
	//alert(listCollection[0].value);
	for(var x=0;x<listCollection.length;x++){
		arri[x] = listCollection[x].value;
		
		//alert(arri[x]);
	}
	permutation(arri, 0, arri.length);
}

function startUp(){
	"use strict";
	permutation_button.addEventListener("click", genPermutationListArrayCollectionForm, false);
}
//var ary = ["usds", "use", "and"];


window.addEventListener("load", startUp, false);