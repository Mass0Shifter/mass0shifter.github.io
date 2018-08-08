/// This is where the app is initialized

// Declearation of universal variables

var map, 
	mapDiv = document.getElementById("map"),
	filterValue = document.getElementById("filter-search"), 
	viewModel, 
	selectedIcon, 
	defaultIcon, 
	formerDisplay, 
	pageLoaded = ko.observable(false), 
	borders;

function calsol(msg, msg2=null){
	console.log(msg, msg2);
}

function AppViewModel(markere, infowindow){ // This is the viewmodel class that handles data binding functions with knockout.
	var self = this;
	self.markers = markere, //This gives the class the markers array created in the maps callback function
	self.inWind = infowindow; //This gives the class the infowindow item created in the maps callback function
	//console.log(self.inWind );	
	self.changeState = function(marker, IsShowing){
		// This function changes the isShowing bool state of a marker
		// which is the anchor used to determine if a marker is visible
		// on the map and on the list when filtered
		if(IsShowing){
			marker.isShowing(true);
		}else{
			marker.isShowing(false);
		}
	};
	
	
	self.searchFilter = function(){
		// This is the method that is called when the filter button is clicked
		var text = filterValue.value; // This is the value content of the input element
		for(let v = 0; v < self.markers.length; v++){
			self.changeState(self.markers[v], false);
		}
		for(let i = 0; i < self.markers.length; i++){
			var test = markers[i].title.toLowerCase().search(text.toLowerCase());
			if( test != -1){
				self.changeState(self.markers[i], true);
			}
		}
		self.showHidePointsOnMap();
	};
	
	self.showHidePointsOnMap = function(){
		for(let x = 0; x < self.markers.length; x++){
			if(self.markers[x].isShowing()){
				if(self.markers[x].map !== map){
					self.markers[x].setMap(map);
				}
				borders.extend(self.markers[x].position);
			}else{
				self.markers[x].setMap(null);
			}
		}
		map.fitBounds(borders);
	};
	
	self.fillInfoWindow = function(clicked){
		
		var marker = clicked,
			infoWindow = self.inWind;
	
		fillInfoWindow(marker, infoWindow);
	}
	
	self.highLighted = function(selected){
		selected.setIcon(selectedIcon);
		selected.setAnimation(google.maps.Animation.BOUNCE);
		map.setCenter(selected.position);
	}
	
	self.defaulted = function(selected){
		selected.setIcon(defaultIcon);
		selected.setAnimation(null);
	}
	
}

function startMap(){
	borders = new  google.maps.LatLngBounds();
	map = new google.maps.Map(mapDiv, {
		center:{lat: 9.079224, lng: 7.501334},
		zoom: 15,
		mapTypeControl: false
	});
	
	var bigInfoWindow = new google.maps.InfoWindow();
		defaultIcon = makeMarkerIcon('0091ff');
		selectedIcon = makeMarkerIcon('ffff24');
	
	for(x = 0; x < myLocations.length; x++){
			 
		var position = myLocations[x].location;
		var name = myLocations[x].title;
	
		var marker = new google.maps.Marker({
			position: position,
			title: name,
			icon: defaultIcon,
			animation: google.maps.Animation.DROP,
			id: x
		});
		marker.isShowing =  ko.observable(true);
		markers.push(marker);
		//external = bigInfoWindow;
		marker.addListener('click', function(){		 
			fillInfoWindow(this, bigInfoWindow); 
		});
		
		marker.addListener('mouseover', function(){		 
			this.setIcon(selectedIcon);
			this.setAnimation(google.maps.Animation.BOUNCE);
		});
		
		marker.addListener('mouseout', function(){		 
			this.setIcon(defaultIcon);
			this.setAnimation(null);
		});
	};
	viewModel = new AppViewModel(markers, bigInfoWindow);
	viewModel.showHidePointsOnMap();
	
}

function makeMarkerIcon(markercolor){
	
	var markerImage = new google.maps.MarkerImage(
		'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+markercolor+'|40|_|%E2%80%A2',
		new google.maps.Size(25, 35),
		new google.maps.Point(0, 0),
		new google.maps.Point(10, 30),
		new google.maps.Size(25, 35),
	);
	return markerImage;
}

function fillInfoWindow(marker, infoWindow){
	if(infoWindow.marker !== marker){
		infoWindow.marker = marker;
		infoWindow.setContent(
			"<div>" + marker.title + "</div>"
		);
		infoWindow.open(map, marker);
		infoWindow.addListener("closeclick", function(){
			infoWindow.marker = null;
		})
		map.setCenter(marker.position);
		map.setZoom(16);
	}
}

window.onload = function(){
	ko.applyBindings(viewModel);
};
$("document").ready(function(){
	//ko.applyBindings(viewModel);
});