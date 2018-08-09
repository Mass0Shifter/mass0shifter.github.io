/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe("RSS Feeds", function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it("are defined", function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
		
		it("each object in allFeeds has a working url", function(){
			allFeeds.forEach(function(feed){
				expect(feed.url).toBeDefined(); // This test checks if the url is defined
				expect(feed.url.length).not.toBe(0); // This checks if the url is empty
			});
		});

		it("each object in allFeeds has a non empty name field", function(){
			allFeeds.forEach(function(feed){
				expect(feed.name).toBeDefined(); // This checks if the feed has a name
				expect(feed.name.length).not.toBe(0); // This checks if the feeds name is empty 
			}); 	
		});
    });
	
	describe("The Menu", function(){
		var body = $("body"), // grabs hold of the body element
			icon = $(".menu-icon-link"); // grabs hold of the clickable menu icon
		
		it("all menu elements are hidden by default", function(){
			// This checks the class attribute of the body, 
			// we expect it to be menu-hidden
			expect(body.hasClass("menu-hidden")).toBe(true); 
			
		});
		
		it("all menu elements hide when clicked and show like wise", function(){
			// Since by default the body has menu-hidden class
			// (this is the class that hides the menu elements)
			
			icon.click(); 	// This is the first click that turns on the menu
							// this calls the click method on the menu icon that  
							// toggles the menu-hidden class of the body on or off 
							// (in this case it toggles it on)
			
			
			expect(body.hasClass("menu-hidden")).not.toBe(true);
			// We expect the body now not have the menu-hidden class
			
			icon.click(); // This is the second click that turns off the menu

			expect(body.hasClass("menu-hidden")).toBe(true); 
			// Now we expect the menu-hidden class to be there again thereby hiding
			// the menu
		});
	});
	
	describe("Initail Entries", function(){
		var fed = $(".feed"), // this grabs hold of the feeds container
			entries; // I use this to hold the entry elements array
		
		beforeEach(function(done){
			loadFeed(0, function(){
				try{
					entries = $(".feed .entry"); // This feeds the entries all the elements that has a class attribute of entry
					if(entries.length < 1){ // If the entry.length = 0 that means the internet connection is weak or not available
						throw "no feed was loaded, check your internet"; // Case and error to happen
					}
				}catch(error){
					alert("Check Your Connection And Try again (refresh the page)"); // tells the user to reconnect or check internet connections
					console.log("Check Your Connection And refresh the page " + error );
				}
				done();
			});
		});
		
		it("there is atleast one entry in the feed element", function(done){
			expect(fed.length).toBeGreaterThan(0); // Check if the feed container has any element in it.
			expect(entries.length).toBeGreaterThan(0); // Also check if the entries array has anything in it
			done();
		});
	}); 

	describe("New Feed Selection", function(){
		var newFeed = [], // This holds the array of the newly loaded feeds content
			formalFeed = []; // This holds the array of the formal feeds content
			
		beforeEach(function(done){
			
			loadFeed(0, (function(done){ // This calls the loadFeed function and collects the feed content into formalFeed after it runs 
				var feeds = $(".entry h2");
				console.log(feeds[0].innerHTML);
				for(var f = 0; f < feeds.length; f++ ){
					formalFeed[f] = feeds[f].innerHTML;
				}
				
				loadFeed(1, function(){ // This calls the loadFeed function and collects the feed content into newFeed var after it runs 
					var feeds = $(".entry h2");
					for(var s = 0; s < feeds.length; s++ ){
						newFeed[s] = feeds[s].innerHTML;
					}
					done();
				});
			})(done));	
		});
		
		it("Feed changed!", function(done){
			// loops through the arrays and check if they are thesame if they are not then the test passes
			expect(newFeed).not.toBe(formalFeed);
			done();
		});

	}); 
    
}());
