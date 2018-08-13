// JavaScript Document
// This File Is For Initialising our objects, grabing elements and configuring values

var modal = document.getElementById('myModal'),		// Get the modal
	titlee = document.getElementById('gameOver'),	// This is the title section of the modal
	charact = document.getElementById('charact'),	// This is where the characters avatar is displayed
	gGem = document.getElementById('green gem'),	// This is where the amount of green Gem collected are displayed
	bGem = document.getElementById('blue gem'),		// This is where the amount of blue Gem collected are displayed
	oGem = document.getElementById('orange gem'),	// This is where the amount of orange Gem collected are displayed
	liveses = document.getElementById('lives'),		// This is the holder for the remaining lives info
	heartses = document.getElementById('hearts'),	// This is where the remaining amount of lives are displayed
	leveles = document.getElementById('levels'), 	// This is where the cleared level is displayed
	times = document.getElementById("finishtime"), 	// This is where the finish time is displayed
	scorese = document.getElementById('scores'), 	// The Game Score Goes Here

// Get hold of all the restart buttons
	rbtn = document.getElementsByClassName("restart"),	// Grabs all the restart icons with the restart class name
	intervee, // an anchor to the interal created for the game over delay.
	gameOverDelay = 1, // amount of time to delay the game over function in seconds
	won = false;

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var playerStartingLives = 5, // Amount of lives player starts with.
	playerCharacter = 'images/char-boy.png', // Selected Player character number of Lives on screen
	totalLiveOnscreen = 1, // Total number of Lives on screen
	totalGemOnscreen = 2, // Total number of Gems on screen
	totalEnemiesOnscreen = 0, // Total number of enemeis on screen
	allEnemies = [],// Holds all the enemy instances, enemy never dies
	allLives = [],	// Holds all our live objects
	allGems = [],	// Holds all our gem objects
	player = new player(), // Spawns the player
	ui = new UI(), 	// Instantiate the ui
	maxLevel = 20; 	// Set The total amount of levels to be reached.

var speeds = { 	//	Speed settings for setting randomSpeed()
				One:400, // Speed 1
				Two:600, // Speed 2
				Three:800, // Speed 3
				//Four:1000, // God Speed
				amount:4 // Amount of objects excluding this one
			  },
	Xpos = {	//	X-positions settings for setting randomPositionX()
				One:0, // Position 1
				Two:105, // Position 2
				Three:205, // Position 3
				Four:305, // Position 4
				Five:405, // Position 5
				amount:5 // Amount of objects excluding this one
			  },
	Ypos = {	//	Y-positions settings for setting randomPositionY()
				One:55, // Position 1
				Two:135, // Position 2
				Three:225, // Position 3
				amount:3 // Amount of objects excluding this one
			  },
	bugs = {	//	Bug sprite list for RandomSelect()
				One:'images/enemy-bug-brown.png',
				Two:'images/enemy-bug-green.png',
				amount:2 // Amount of objects excluding this one
			  },
	gems = {	//	Gem sprite list for RandomSelect()
				One:'images/Gem Green.png',
				Two:'images/Gem Blue.png',
				Three:'images/Gem Orange.png',
				amount:3 // Amount of objects excluding this one
			  };


ui.nextLevel();	// Calls the nextLevel Method of the ui
		// The ui holds the creation of the items on screen at every level.
