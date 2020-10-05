//setup canvas
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

/******************************************
					GLOBAL VARIABLES
******************************************/
//general variables
var playing = false; //is the game running
var tileSize = 64; //the side length of individual tiles
var framerate = 30; //how many frames per second should the game run at

//arrays
var enemies = []; //the array of bad guys
var map = []; //where current maps are stored
var tileSet = []; //the array of tile types

//movement variables
var gravity = 1.7; //the amount of gravity in the level. Only applicable in sideScroller
var moveStyle = "sideScroller"; //"rotationBased", "RPG", or "sideScroller"






/******************************************
					     IMAGES
******************************************/
//the background --optional--
var backgroundImage = ""; //the url of the pic
var bgImage = new Image(); //defining the name of the image
bgImage.src = backgroundImage; //setting the .src

//menu image
var menuImage = "./menuImage.png"; //the url of the pic
var mnImage = new Image(); //defining the name of the image
mnImage.src = menuImage; //setting the .src

//character image
var spriteSheet = "./spriteSheet.png"; //the url of the pic
var ssImage = new Image(); //defining the name of the image
ssImage.src = spriteSheet; //setting the .src

//top down grass
var grassTopImage = "./grassDown.png"; //the url of the pic
var gtImage = new Image(); //defining the name of the image
gtImage.src = grassTopImage; //setting the .src

//side view of grass
var grassSideImage = "./grassSide.png"; //the url of the pic
var gsImage = new Image(); //defining the name of the image
gsImage.src = grassSideImage; //setting the .src

//dirt
var dirtImage = "./dirt.png"; //the url of the pic
var drImage = new Image(); //defining the name of the image
drImage.src = dirtImage; //setting the .src

//stone bricks
var brickImage = "./bricks.png"; //the url of the pic
var brImage = new Image(); //defining the name of the image
brImage.src = brickImage; //setting the .src






/******************************************
					     SOUNDS
******************************************/
var exampleSound = new Audio(""); //an example sound file






/******************************************
					      MAPS
******************************************/
var map1 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];


var map2 = [
  [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
  [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
  [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
  [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
  [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
  [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
  [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1],
  [1,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,4,4,1],
  [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,4,4,4,4,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,4,4,1],
  [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,1],
  [1,4,4,4,4,4,4,4,4,1,1,1,4,4,4,4,4,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,4,4,4,4,4,4,4,1,4,4,1],
  [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,4,4,1],
  [1,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,1,1,1,4,1],
  [3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,4,4,2,2,2,2,2,2,2,2,2,2,2,2,4,4,4,4,4,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
];

map = map1; //choosing which map to start with






/******************************************
					  CHARACTERS
******************************************/
var player = { //The player-character
  x: 400, //the starting x-position
  y: 100, //the starting y-position
  state: "right", //for animations
  width: 48, //how wide the player is
  height: 84, //how tall the player is
  moveSpeed: 6, //the speed the player moves at or their acceleration //4
  dir: 0, //the direction the player is turning or moving
  jumping: false, //is the player jumping
    
  //rotationBased movement variables
  rotSpeed: 3 * (Math.PI / 180), //how quickly the player turns
  angle: 0, //the angle the player is looking in
  speed: 0, //the direction the player is walking
  
  //other movement systems
  velocityX: 0, //the player's vertical momentum
  velocityY: 0, //the player's vertical momentum
  maxSpeed: 14, //the player's top speed
  terminalVelocity: 20, //the player's max falling speed
  airSpeed: 11, //maximum speed for horizontal air movement
  jumpHeight: 25, //how high the player can jump
  friction: 0.6 //how quickly the player stops. More is slower
}


var camera = { //The in game camera
  x: player.x, //the starting x-position
  y: player.y - 100, //the starting y-position
  static: false, //should the camera stay still
  shake: false, //if the camera is shaking
  
  //boundingbox system --optional--
  boundingBox: true, //should there be a box at all?
  drawBox: false, //draw on screen --for debugging--
  xMin: 100, //left boundary of box
  xMax: 450, //right boundary of box
  yMin: 100, //top boundary of box
  yMax: 400 //bottom boundary of box
}






/******************************************
					  MAIN THREAD
******************************************/
function gameCycle() {
  if (playing === true) { //the game
  	movePlayer();
    drawMap();
    drawPlayer();
  } else { //menus
    menu();
  }
}






/******************************************
				  	SETUP TILES
******************************************/
function tile(symbol, solid, color, texture) {
  this.symbol = symbol; //how it is reffered to in the map
  this.solid = solid; //can you walk through it
  this.texture = texture; //the texture of the tile
  this.color = color; //if applicable
  tileSet.push(this); //add to array
}

//add tiles here
//symbol, is solid, color, image
new tile(0, false, "", gtImage); //top of grass
new tile(1, true, "", brImage); //bricks
new tile(2, true, "", drImage); //dirt
new tile(3, true, "", gsImage); //side of grass
new tile(4, false, "", ""); //air






/******************************************
				  		 MENUS
******************************************/
var selected = "top"; //are they looking at camera or movement

function menu() {
  context.drawImage(mnImage, 0, 0);
  
  context.fillStyle = "white";
  context.strokeStyle = "white";
  context.font = "700 35px Arial";
  context.lineWidth = 5;
  context.textAlign = "center";
  
  if (selected === "top") {
    context.strokeRect(165, 276, 365, 45);
  } else {
  	context.strokeRect(165, 386, 365, 45);
  }
  
  if (camera.static) {
  	context.fillText("STATIC", 350, 311);
  } else if (camera.boundingBox) {
  	context.fillText("DYNAMIC", 350, 311);
  } else {
  	context.fillText("FOLLOW", 350, 311);
  }
  
  if (moveStyle === "sideScroller") {
    context.fillText("SIDE-SCROLLER", 350, 421);
  } else if (moveStyle === "rotationBased") {
    context.fillText("ROTATION", 350, 421);
  } else {
    context.fillText("TOP DOWN", 350, 421);
  }
}





/******************************************
				  MOVE THE PLAYER
******************************************/
function movePlayer() {

	if (moveStyle === "rotationBased") { //turn and walk forward
  
 		var moveStep = player.speed * player.moveSpeed; //how far the player walks forward
  	player.angle += player.dir * player.rotSpeed;
  
 		if (player.angle > (2 * Math.PI)) { //if the players angle goes too high
    	player.angle = 0; //bring it back around
  	} else if (player.angle < 0) { //if the players angle goes too low
    	player.angle = (2 * Math.PI); //bring it back around
  	}
    
    var newX = Math.floor(player.x + Math.cos(player.angle) * moveStep); //calculate the player's step forward
  	var newY = Math.floor(player.y + Math.sin(player.angle) * moveStep); //calculate the player's step forward
    
    if (collisionDetectX(newX)) { //is the new x blocked?
    
    } else { //if it isn't blocked
    	player.x = newX; //move to it
    }
    
    if (collisionDetectY(newY)) { //is the new y blocked?
    
    } else { //if it isn't blocked
    	player.y = newY; //move to it
    }
	}
  
  
  if (moveStyle === "sideScroller") { //platformer controls
  	if ((player.dir === -1 && player.velocityX > 0) || (player.dir === 1 && player.velocityX < 0) || player.dir === 0) { //if they aren't holding the same direction anymore or have left the controls
    
    	player.velocityX = player.friction * player.velocityX; //apply friction to their horizontal velocity
      
      if ((player.velocityX < 0.1 && player.velocityX > 0) || (player.velocityX > -0.1 && player.velocityX < 0)) { //if they have a very tiny velocity
      	player.velocityX = 0; //round down to zero
      }
    }
    
    if (player.velocityX < player.maxSpeed && player.velocityX > -player.maxSpeed) { //if player isn't already at top speed
    	player.velocityX += player.dir * (player.moveSpeed / 5); //add to their velocity
    } 
    
  	var newX = Math.floor(player.x + player.velocityX); //decide where to move next
    var newY = Math.floor(player.y + player.velocityY); //decide where to move next
    
    if (collisionDetectX(newX)) { //is the new x blocked?
    	player.velocityX = 0; //stop their momentum
    } else {
    	player.x = newX; //move to new x position
    }
    
    if (collisionDetectY(newY)) { //is the new y blocked?
    	player.velocityY = 0; //stop their vertical momentum
    } else { //if they're in the air
    	if (player.velocityY < player.terminalVelocity) { //if they aren't falling at max speed
    		player.velocityY += gravity; //apply gravity to their y momentum
      }
      
    	player.y = newY; //move to new y position
      
      if (player.velocityX >= player.airSpeed) { //if they're moving faster than their maximum air speed
      	player.velocityX = player.airSpeed; //slow them to their maximum airspeed
      } else if (player.velocityX <= -player.airSpeed) { //if they're moving faster than their maximum air speed
      	player.velocityX = -player.airSpeed; //slow them to their maximum airspeed
      }
    }
  }
  
  
  if (moveStyle === "RPG") { //Top down walking
  
  	var newX = Math.floor(player.x + player.velocityX); //determine their new x position
    var newY = Math.floor(player.y + player.velocityY); //determine their new y position
    
    if (collisionDetectX(newX)) { //is their new position blocked?
    
    } else { //no?
    	player.x = newX; //move
    }
    
    if (collisionDetectY(newY)) { //is their new position blocked?
    
    } else { //no?
    	player.y = newY; //move
    }
  }
}

var halfWidth = player.width / 2; //to make things a little simpler
var halfHeight = player.height / 2; //to make things a little simpler

function collisionDetectX(newX) { //see if the player can move to their new x coordinate
  
	for (var k = 0; k < tileSet.length; k++) { //cycle through all tiles
  	if (tileSet[k].solid === true) { //see if tile is walkable
    
    	if (map[Math.floor((player.y + halfHeight - 1) / tileSize)][Math.floor((newX + halfWidth) / tileSize)] === tileSet[k].symbol || map[Math.floor((player.y - halfHeight + 1) / tileSize)][Math.floor((newX + halfWidth) / tileSize)] === tileSet[k].symbol) { //is their new position in the array solid? + halfWidth
      	player.x = ((Math.floor((newX + halfWidth) / tileSize)) * tileSize) - halfWidth; //move them to right up against it
        return true; //it is blocked
      }
      
      if (map[Math.floor((player.y + halfHeight - 1) / tileSize)][Math.floor((newX - halfWidth) / tileSize)] === tileSet[k].symbol || map[Math.floor((player.y - halfHeight + 1) / tileSize)][Math.floor((newX - halfWidth) / tileSize)] === tileSet[k].symbol) { //is their new position in the array solid? - halfWidth
      	player.x = ((Math.floor((newX - halfWidth) / tileSize)) * tileSize) + halfWidth + tileSize; //move them to right up against it
        return true; //it is blocked
      }
    }
  }
}


function collisionDetectY(newY) { //see if the player can move to their new y coordinate

	for (var k = 0; k < tileSet.length; k++) { //cycle through all tiles
  	if (tileSet[k].solid === true) { //see if tile is walkable
    
    	if (map[Math.floor((newY + halfHeight) / tileSize)][Math.floor((player.x + halfWidth - 1) / tileSize)] === tileSet[k].symbol || map[Math.floor((newY + halfHeight) / tileSize)][Math.floor((player.x - halfWidth + 1) / tileSize)] === tileSet[k].symbol) { //is their new position in the array solid? + halfHeight
      	player.y = ((Math.floor((newY + halfHeight) / tileSize)) * tileSize) - halfHeight; //move them to right up against it
        player.jumping = false; //they aren't jumping 
        return true; //it is blocked
      }
      
      if (map[Math.floor((newY - halfHeight) / tileSize)][Math.floor((player.x + halfWidth - 1) / tileSize)] === tileSet[k].symbol || map[Math.floor((newY - halfHeight) / tileSize)][Math.floor((player.x - halfWidth + 1) / tileSize)] === tileSet[k].symbol) { //is their new position in the array solid? - halfHeight
      	player.y = ((Math.floor((newY - halfHeight) / tileSize)) * tileSize) + halfHeight + tileSize; //move them to right up against it
        return true; //it is blocked
      }
    }
  }
}






/******************************************
				  	DRAW THE MAP
******************************************/
function drawMap() {
	context.fillStyle = "lightBlue"; //Set a background color
  context.fillRect(0, 0, canvas.width, canvas.height); //draw background
  //If using background image
  //context.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

	if (camera.static === true) { //the non-moving camera
  	for (var i = 0; i < map.length; i++) {
    	for (var j = 0; j < map[i].length; j++) {
    		for (var k = 0; k < tileSet.length; k++) {
      		if (map[i][j] === tileSet[k].symbol) { //run through the tileset to see if they match
        		if (tileSet[k].color != "") { //if it is a solid color
        			context.fillStyle = tileSet[k].color;
        			context.fillRect(j * tileSize, i * tileSize, tileSize, tileSize);
          	} else if (tileSet[k].texture != "") { //if it has a texture
        			context.drawImage(tileSet[k].texture, j * tileSize, i * tileSize, tileSize, tileSize);
          	}
        	}
      	}
    	}
  	}
  } else { //the camera that follows the player
  
  	if (camera.boundingBox === false) { //should the player remain in the center of the screen
  		camera.x = player.x; //camera follows player
    	camera.y = player.y; //camera follows player
  	} else {
    	var xMin = camera.xMin - (canvas.width / 2); //find position relative to canvas center
      var xMax = camera.xMax - (canvas.width / 2); //find position relative to canvas center
      var yMin = camera.yMin - (canvas.height / 2); //find position relative to canvas center
      var yMax = camera.yMax - (canvas.height / 2); //find position relative to canvas center
      
      if ((player.x - camera.x + (player.width / 2)) >= xMax) { //if up against bounding box
				camera.x = player.x - xMax + (player.width / 2); //move camera behind them
      } else if ((player.x - camera.x - (player.width / 2)) <= xMin) { //if up against bounding box
				camera.x = player.x - xMin - (player.width / 2); //move camera behind them
      }
      
      if ((player.y - camera.y + (player.height / 2)) >= yMax) { //if up against bounding box
				camera.y = player.y - yMax + (player.height / 2); //move camera behind them
      } else if ((player.y - camera.y - (player.height / 2)) <= yMin) { //if up against bounding box
				camera.y = player.y - yMin - (player.height / 2); //move camera behind them
      }
      
      
    }
    
    if (camera.shake === true) { //camera shake function
  		var maxShake = 30; //the maximum amount of camera shake
    	var minShake = 0; //the minimum amount of camera shake
    	var saveX = camera.x; //for restoration after
    	var saveY = camera.y; //for restoration after
      
  		camera.x += (Math.floor((Math.random() * (maxShake - minShake) + minShake))); //add a random amount of shake
    	camera.y += (Math.floor((Math.random() * (maxShake - minShake) + minShake))); //add a random amount of shake 
  	}
    
    var iq = 1; //a lag reducing measure
    var jq = 1; //a lag reducing measure
    
    for (var j = (camera.y - (canvas.height / 2) - tileSize + 1); j < (camera.y + (canvas.height / 2) + tileSize); j += jq) { //find the first possible y coordinate for a block in the top row
    
    	if ((((j / tileSize) % 1) === 0) && ((j / tileSize) >= 0) && ((j / tileSize) < map.length)) { //see if it is an integer on the map
      
      	jq = tileSize; //make it count by a whole tile
      	iq = 1; //reset the skip counter
        
        for (var i = (camera.x - (canvas.width / 2) - tileSize + 1); i < (camera.x + (canvas.width / 2) + tileSize); i += iq) { //find the first possible x coordinate for a block in the left coloumn
        
      		if (((i / tileSize) % 1) === 0 && ((i / tileSize) >= 0)) { //see if it is an integer on the map
          
          	iq = tileSize; //make it count by a whole tile
            
          	for (var k = 0; k < tileSet.length; k++) { //run through the tileset to see if they match
            
      				if (map[(j / tileSize)][i / tileSize] === tileSet[k].symbol) {
              	if (tileSet[k].color != "") { //if it is a solid color
        					context.fillStyle = tileSet[k].color;
        					context.fillRect((i - camera.x + (canvas.width / 2)), (j - camera.y + (canvas.height / 2)), tileSize, tileSize); //draw
          			} else if (tileSet[k].texture != "") { //if it has a texture
        					context.drawImage(tileSet[k].texture, (i - camera.x + (canvas.width / 2)), (j - camera.y + (canvas.height / 2)), tileSize, tileSize); //draw
          			}
              }
            }
          }
      	}
      }
    }
    if (camera.drawBox) { //should we draw the bounding box?
      context.beginPath();
			context.strokeStyle= "red"; //set path color
			context.moveTo(camera.xMin, camera.yMin);
			context.lineTo(camera.xMax, camera.yMin);
      context.lineTo(camera.xMax, camera.yMax);
      context.lineTo(camera.xMin, camera.yMax);
      context.lineTo(camera.xMin, camera.yMin); 
			context.stroke(); //draw it
    }
  }
}






/******************************************
				  DRAW THE PLAYER
******************************************/
function drawPlayer() { //figure out where and how to draw
	if (moveStyle === "rotationBased") { 
    context.save(); //save for later
    if (camera.static === true) { //the non moving camera
  		context.translate(player.x, player.y); //center canvas for rotation on player's coords
    } else { //the dynamic camera
      context.translate(player.x - camera.x + (canvas.width / 2), player.y - camera.y + (canvas.height / 2)); //translate canvas center to player relative to the camera
   	}
  	context.rotate(player.angle + (Math.PI / 2)); //rotate based on player's angle
    animatePlayer(-25, -25); //call for him to be drawn
    context.restore(); //reset canvas
  }
  
  if (moveStyle === "sideScroller") {
 		if (camera.static === true) {
    	animatePlayer(player.x - (player.width / 2), player.y - (player.height / 2)); //draw them at their position
    } else {
    	animatePlayer(player.x - camera.x + (canvas.width / 2) - (player.width / 2), player.y - camera.y + (canvas.height / 2) - (player.height / 2)); //draw them relative to the camera
    }
  }
  
  if (moveStyle === "RPG") {
 		if (camera.static === true) {
    	animatePlayer(player.x - (player.width / 2), player.y - (player.height / 2)); //draw them at their position
    } else {
    	animatePlayer(player.x - camera.x + (canvas.width / 2) - (player.width / 2), player.y - camera.y + (canvas.height / 2) - (player.height / 2)); //draw them relative to the camera
    }
  }
  
  if (camera.shake === true) { //shakey cam?
    	camera.x = saveX; //save so we can reset it
      camera.y = saveY; //save so we can reset it
  }
}


var frame = 0; //the timer for animations
var animationSpeed = 1.5; //the speed the animations play at

function animatePlayer(x, y) { //the actual drawing part
	if (moveStyle === "rotationBased") {
    context.drawImage(ssImage, 192, 186, 48, 48, x, y, player.width, player.height);
    
  } else if (player.jumping) { //if player is jumping
  	if (player.state === "right") {
    	context.drawImage(ssImage, 192, 0, 48, 84, x, y, player.width, player.height);
    } else if (player.state === "left") {
    	context.drawImage(ssImage, 192, 84, 48, 84, x, y, player.width, player.height);
    }
    
  } else if (player.velocityX === 0 && player.velocityY === 0) { //standing still
  	if (player.state === "right") {
    	context.drawImage(ssImage, 0, 0, 48, 84, x, y, player.width, player.height);
    } else if (player.state === "left") {
    	context.drawImage(ssImage, 0, 84, 48, 84, x, y, player.width, player.height);
    } else if (player.state === "up") {
    	context.drawImage(ssImage, 0, 168, 48, 84, x, y, player.width, player.height);
    } else if (player.state === "down") {
    	context.drawImage(ssImage, 0, 252, 48, 84, x, y, player.width, player.height);
    } else {
    	context.drawImage(ssImage, 0, 168, 48, 84, x, y, player.width, player.height);
    }
    
  } else if (player.state === "right") { //walking right
  	if (frame < animationSpeed) {
    	context.drawImage(ssImage, 0, 0, 48, 84, x, y, player.width, player.height);
    } else if (frame < 2 * animationSpeed) {
    	context.drawImage(ssImage, 48, 0, 48, 84, x, y, player.width, player.height);
    } else if (frame < 3 * animationSpeed) {
    	context.drawImage(ssImage, 96, 0, 48, 84, x, y, player.width, player.height);
    } else if (frame < 4 * animationSpeed) {
    	context.drawImage(ssImage, 48, 0, 48, 84, x, y, player.width, player.height);
    } else if (frame < 5 * animationSpeed) {
    	context.drawImage(ssImage, 0, 0, 48, 84, x, y, player.width, player.height);
    } else if (frame <= 6 * animationSpeed) {
    	context.drawImage(ssImage, 144, 0, 48, 84, x, y, player.width, player.height);
    }
    
  } else if (player.state === "left") { //walking left
  	if (frame < animationSpeed) {
    	context.drawImage(ssImage, 0, 84, 48, 84, x, y, player.width, player.height);
    } else if (frame < 2 * animationSpeed) {
    	context.drawImage(ssImage, 48, 84, 48, 84, x, y, player.width, player.height);
    } else if (frame < 3 * animationSpeed) {
    	context.drawImage(ssImage, 96, 84, 48, 84, x, y, player.width, player.height);
    } else if (frame < 4 * animationSpeed) {
    	context.drawImage(ssImage, 48, 84, 48, 84, x, y, player.width, player.height);
    } else if (frame < 5 * animationSpeed) {
    	context.drawImage(ssImage, 0, 84, 48, 84, x, y, player.width, player.height);
    } else if (frame <= 6 * animationSpeed) {
    	context.drawImage(ssImage, 144, 84, 48, 84, x, y, player.width, player.height);
    } 
    
  } else if (player.state === "up") { //walking up
  	if (frame < 2 * animationSpeed) {
    	context.drawImage(ssImage, 0, 168, 48, 84, x, y, player.width, player.height);
    } else if (frame < 4 * animationSpeed) {
    	context.drawImage(ssImage, 48, 168, 48, 84, x, y, player.width, player.height);
    } else if (frame <= 6 * animationSpeed) {
    	context.drawImage(ssImage, 144, 168, 48, 84, x, y, player.width, player.height);
    }
    
  } else if (player.state === "down") { //walking down
  	if (frame < 2 * animationSpeed) {
    	context.drawImage(ssImage, 0, 252, 48, 84, x, y, player.width, player.height);
    } else if (frame < 4 * animationSpeed) {
    	context.drawImage(ssImage, 48, 252, 48, 84, x, y, player.width, player.height);
    } else if (frame <= 6 * animationSpeed) {
    	context.drawImage(ssImage, 144, 252, 48, 84, x, y, player.width, player.height);
    }
  }
  
  frame++ //increment the animations
  if (frame > 6 * animationSpeed) { //if reaches the end of the sheet
  	frame = 0; //loop back around
  }
}






/******************************************
				    KEY CONTROLS
******************************************/

//when keys are pushed
document.onkeydown = function(e) {
  //capture the event
  e = window.event || e;
  //get the key code
  key = e.keyCode;
  //prevent default event behavior
  e.preventDefault();
  
  if (playing === true) {
  	//left arrow key
  	if (key === 37) {
    	if (moveStyle === "rotationBased") {
    		player.dir = -1; //moving left
      
    	} else if (moveStyle === "RPG") {
    		player.velocityX = -player.moveSpeed;
      	if (player.velocityY === 0) {
      		player.state = "left";
      	}
  
    	} else if (moveStyle === "sideScroller") {
    		player.state = "left";
    		player.dir = -1; //moving left
    	}
  	}
  
		//right arrow key
  	if (key === 39) {
  		if (moveStyle === "rotationBased") {
    		player.dir = 1; //moving right
      
    	} else if (moveStyle === "RPG") {
    		player.velocityX = player.moveSpeed;
      	if (player.velocityY === 0) {
      		player.state = "right";
      	}
      
    	} else if (moveStyle === "sideScroller") {
    		player.state = "right";
    		player.dir = 1; //moving right
    	}
  	}
  
  	//up arrow key
  	if (key === 38) {
    	if (moveStyle === "rotationBased") {
    		player.speed = 1; //moving forward
      	player.state = "up";
      
    	} else if (moveStyle === "RPG") {
    		player.velocityY = -player.moveSpeed;
      	if (player.velocityX === 0) {
      		player.state = "up";
      	}
      
    	} else if (moveStyle === "sideScroller" && player.jumping === false && player.velocityY === 0) { //can we jump?
    		player.jumping = true;
     		player.velocityY -= player.jumpHeight; //add upwards momentum
    	}
  	}
  
  	//down arrow key
  	if (key === 40) {
    	if (moveStyle === "rotationBased") {
    		player.speed = -1; //moving backwards
      	player.state = "down";
      
    	} else if (moveStyle === "RPG") {
    		player.velocityY = player.moveSpeed;
      	if (player.velocityX === 0) {
      		player.state = "down";
      	}
      
    	} else if (moveStyle === "sideScroller") {
    
    	}
  	}
  
  	//spacebar
  	if (key === 32) {
  		playing = false;
  	}
    
  } else {
  	//up arrow key
  	if (key === 38) {
    	selected = "top";
    }
    
  	//down arrow key
  	if (key === 40) {
    	selected = "bottom";
    }
    
    //right arrow key
    if (key === 39) {
    
    	if (selected === "top") {
      	if (camera.static === false && camera.boundingBox === true) { //dynamic
        	camera.static = true;
          camera.boundingBox = false;
        } else if (camera.static === true && camera.boundingBox === false) { //static
        	camera.static = false;
          camera.boundingBox = false;
        } else { //follow
        	camera.static = false;
          camera.boundingBox = true;
        }
      } else { //bottom selected
      	if (moveStyle === "sideScroller") {
        	moveStyle = "RPG";
        } else if (moveStyle === "RPG") {
        	moveStyle = "rotationBased";
        } else {
        	moveStyle = "sideScroller";
        }
      }
      
    }
    
    //left arrow key
    if (key === 37) {
    
    	if (selected === "top") {
      	if (camera.static === false && camera.boundingBox === true) { //dynamic
        	camera.static = false;
          camera.boundingBox = false;
        } else if (camera.static === true && camera.boundingBox === false) { //static
        	camera.static = false;
          camera.boundingBox = true
        } else { //follow
        	camera.static = true
          camera.boundingBox = false
        }
      } else { //bottom selected
      	if (moveStyle === "sideScroller") {
        	moveStyle = "rotationBased";
        } else if (moveStyle === "RPG") {
        	moveStyle = "sideScroller";
        } else {
        	moveStyle = "RPG";
        }
      }
      
    }
    
    //spacebar
    if (key === 32) { //setup the values when you switch movestyles
      if (moveStyle === "rotationBased") {
        map = map1;
        player.x = 128;
        player.y = 128;
        player.moveSpeed = 6;
        player.width = 48;
        player.height = 48;
        
        camera.xMin = 200;
  			camera.xMax = 500;
  			camera.yMin = 100;
  			camera.yMax = 400;
      } else if (moveStyle === "RPG") {
      	map = map1;
        player.x = 128;
        player.y = 128;
        player.moveSpeed = 6;
        player.width = 48;
        player.height = 84;
        
        camera.xMin = 200;
  			camera.xMax = 500;
  			camera.yMin = 100;
  			camera.yMax = 400;
      } else { //sideScroller
      	map = map2;
        player.x = 128;
        player.y = 700;
        player.moveSpeed = 4;
        player.width = 48;
        player.height = 84;
        
        camera.xMin = 100;
  			camera.xMax = 450;
  			camera.yMin = 100;
  			camera.yMax = 400;
      }
      player.state = "right";
      player.dir = 0;
      player.velocityX = 0;
      player.velocityY = 0;
      halfWidth = player.width / 2;
			halfHeight = player.height / 2;
      playing = true;
    }
  }
}


//when keys are released
document.onkeyup = function(e) {
  //capture the event
  e = window.event || e;
  //get the key code
  keyUp = e.keyCode;
  
  if (playing === true) {
  	//all arrow keys released
  	if (keyUp === 37 || keyUp === 38 || keyUp === 39 || keyUp === 40) {
  		if (moveStyle === "rotationBased") {
  			player.state = ""; //the player isn't moving
    	}
 		}
  
  	if (keyUp === 37) { //left arrow key
  		if (moveStyle === "rotationBased") {
  			player.dir = 0;
    	} else if (moveStyle === "sideScroller") { 
    		if (player.dir === -1) {
      		player.dir = 0;
      	}
   	 } else if (moveStyle === "RPG") {
    		if (player.velocityX < 0) {
    			player.velocityX = 0;
      	}
    	}
  	}
  
  	if (keyUp === 39) { //right arrow key
  		if (moveStyle === "rotationBased") {
  			player.dir = 0;
    	} else if (moveStyle === "sideScroller") { 
    		if (player.dir === 1) {
      		player.dir = 0;
      	} 
    	} else if (moveStyle === "RPG") {
    		if (player.velocityX > 0) {
    			player.velocityX = 0;
      	}
    	}
  	}
  
  	//up arrow key
  	if (keyUp === 38) {
  		player.speed = 0;
    	if (moveStyle === "RPG") {
    		if (player.velocityY < 0) {
    			player.velocityY = 0;
      	}
    	}
  	}
  
  	//down arrow key
  	if (keyUp === 40) {
  		player.speed = 0;
    	if (moveStyle === "RPG") {
    		if (player.velocityY > 0) {
    			player.velocityY = 0;
      	}
    	}
  	}
  } else {
  
  }
}

var thread = setInterval(gameCycle, 1000 / framerate); //setting the main interval the game runs on