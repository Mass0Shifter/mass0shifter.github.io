// declaring global variables
var map;
var infoWindow;
var bounds;

// google maps callback function when the async request is completed
function startMap() {
    var abuja = {lat: 9.079224, lng: 7.501334};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: abuja,
        mapTypeControl: true
    });

    infoWindow = new google.maps.InfoWindow();

    bounds = new google.maps.LatLngBounds();
   
    ko.applyBindings(new ViewModel());
}

// handle map error
function googleRequestError() {
    alert('An error occurred with Google Maps API Request, Refresh your page when connected to the internet!');
}

/* Location Model */ 
var LocationMarker = function(data) {
    var self = this;

    this.title = data.title; // sets the LocationMarker.title info from the data arg
    this.position = data.location; // sets the LocationMarker.position info from the data arg
    this.street = '',
    this.city = '',
    this.phone = '';

    this.visible = ko.observable(true);

    // Style the markers a bit. This will be our listing marker icon.
    var defaultIcon = makeMarkerIcon('0091ff');
    // Create a "highlighted location" marker color for when the user
    // mouses over the marker.
    var highlightedIcon = makeMarkerIcon('FFFF24');

	// For foursquare data request
	// Foursquare was used to provide extra places data for this project
    var clientID = 'EGJXZYALSQS3CSTDIU1TNTTJTOSJDEUNWHTWHVWOASAHL5ID';
    var clientSecret = '2ZMGVN422YA4J2H3LUVHN5XNKC0CJ1Y1TRSCN4SHHU4FHAGI';

    // get JSON Data request from foursquare data
    var requestURL = 
		'https://api.foursquare.com/v2/venues/search?ll=' + 
		this.position.lat + 
		',' + 
		this.position.lng + 
		'&client_id=' + 
		clientID + 
		'&client_secret=' + 
		clientSecret + 
		'&v=20160118' + 
		'&query=' + 
		this.title;
	/*
		Sample
	https://api.foursquare.com/v2/venues/search?ll=0.555,3.555&client_id=M52DBBI40PSH5IPR25XKJSA0NFIEZWXRM012FUSB5KPGYU4X
	&clientSecret=ESWMBI0RUERHZPLRPMSVABDW2V3XYIBSO2QDW4S2WKAEQQTG&v=20160118&query=titleofmarker
	
	*/

    jQuery.getJSON(requestURL).done(function(data) {
		var results = data.response.venues[0];
        self.street = results.location.formattedAddress[0] ? results.location.formattedAddress[0]: 'N/A';
        self.city = results.location.formattedAddress[1] ? results.location.formattedAddress[1]: 'N/A';
        self.phone = results.contact.formattedPhone ? results.contact.formattedPhone : 'N/A';
    }).fail(function() {
        alert('Something went wrong with foursquare');
    });

    // Create a marker per location, and put into markers array
    this.marker = new google.maps.Marker({
        position: this.position,
        title: this.title,
        animation: google.maps.Animation.DROP,
        icon: defaultIcon
    });    

    self.filterMarkers = ko.computed(function () {
        // set marker and extend bounds (showListings)
        if(self.visible() === true) {
            self.marker.setMap(map);
            bounds.extend(self.marker.position);
            map.fitBounds(bounds);
        } else {
            self.marker.setMap(null);
        }
    });
    
    // add an onclick even to open an infowindow at each marker
    this.marker.addListener('click', function() {
        populateInfoWindow(this, self.street, self.city, self.phone, infoWindow);
        toggleBounceAnimation(this);
        map.panTo(this.getPosition());
    });

    // Two event listeners - one for mouseover, one for mouseout,
    // to change the colors back and forth.
    this.marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
    });
    this.marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
    });

    // show item info when selected from list
    this.show = function(location) {
        google.maps.event.trigger(self.marker, 'click');
    };

    // creates bounce effect when item selected
    this.bounce = function(place) {
		google.maps.event.trigger(self.marker, 'click');
	};

};

/* The View Model */
function ViewModel() {
    var self = this;
	
	this.menuVisible = ko.observable(true);
    this.searchItem = ko.observable('');

    this.mapMarkerList = ko.observableArray([]); // Create an array to hold my locationmarker
	
	this.hideShowMenu = function(){
		//alert(self.menuVisible());
		self.menuVisible(!self.menuVisible());
	}
    // add markers for each location
    myLocations.forEach(function(location) {
        self.mapMarkerList.push( new LocationMarker(location) );
    });

    // locations viewed on map
    this.locationList = ko.computed(function() {
        var searchFilter = self.searchItem().toLowerCase();
        if (searchFilter) {
            return ko.utils.arrayFilter(
				self.mapMarkerList(),
				function(marker) {
					var str = marker.title.toLowerCase();
					var resultBool = str.includes(searchFilter);
					marker.visible(resultBool);
					return resultBool;
				}
			);
        }
        self.mapMarkerList().forEach(function(marker) {
            marker.visible(true);
        });
        return self.mapMarkerList();
    }, self);
};

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, street, city, phone, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        // Clear the infowindow content to give the streetview time to load.
        infowindow.setContent('');
        infowindow.marker = marker;

        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
        var streetViewService = new google.maps.StreetViewService();
        var radius = 50;

        var windowContent = '<h4>' + marker.title + '</h4>' + 
            '<p>' + street + "<br>" + city + '<br>' + phone + "</p>";

        // In case the status is OK, which means the pano was found, compute the
        // position of the streetview image, then calculate the heading, then get a
        // panorama from that and set the options
        var getStreetView = function (data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(
                    nearStreetViewLocation, marker.position);
                infowindow.setContent(windowContent + '<div id="pano"></div>');
                var panoramaOptions = {
                    position: nearStreetViewLocation,
                    pov: {
                        heading: heading,
                        pitch: 20
                    }
                };
                var panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('pano'), panoramaOptions);
            } else {
                infowindow.setContent(windowContent + '<div style="color: red">No Street View Found</div>');
            }
        };
        // Use streetview service to get the closest streetview image of the markers position
        streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);
    }
}

function toggleBounceAnimation(locationMarker) {
  if (locationMarker.getAnimation() !== null) {
    locationMarker.setAnimation(null);
  } else {
    locationMarker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        locationMarker.setAnimation(null);
    }, 1000);
  }
}

// This function takes in a COLOR, and then creates a new marker
// icon of that color. The icon will be 21 px wide by 34 high, have an origin
// of 0, 0 and be anchored at 10, 34).
function makeMarkerIcon(color) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + color +
        '|40|_|%E2%80%A2',
        new google.maps.Size(22, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 35),
        new google.maps.Size(22, 34)
		);
    return markerImage;
}

