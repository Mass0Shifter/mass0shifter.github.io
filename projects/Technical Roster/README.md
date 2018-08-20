# Udacity Neighborhood Map Project

## Important Note

This is a web based application so it won't run correctly offline

## Table of Content

- How to run the app
- How the app works
- Mentions
- Dependencies


### How to run the app

Make sure you have a good internet connection, then run the index.html file in the apps root folder.

### How the app works

This is just a brief explanation on how the app runs.
This is a map project that uses the googles map api and the foursquare places api data to provide info on locations around me
the style of the page is done with bootstrap and the view model is handled by knockout,

How all these come to gether is, we request for a google map of a certain location and then we add custom location markers on the map,
when this location markers are clicked we display info concerning the clicked marker location using the googles info window
with data provide by Foursquare Places Api, on the view part we use knockout to communicate between the DOM and the `app.js` file
in terms of search filters.

Now thats the simple explanation if you want further info view the codes.

### Mentions
These are some of the libraries used for the project.

> Bootstrap

> Knockout

> Foursquare Places Api

> Google Map Api


### Dependencies

> Internet Connection

Make sure you have a good internet connection for the app to run properly