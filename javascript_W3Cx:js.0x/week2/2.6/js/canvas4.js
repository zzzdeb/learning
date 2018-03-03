var canvas4 = new function(){
    // useful to have them as global variables
var canvas, ctx, mousePos, mouseButton, w, h;
// an empty array!
var balls = [];
var numberOfGoodBalls = 0;
var numberOfInitialBalls = 0;
var globalBallSpeed = 3;
var globalSpeedMutiplier = 1;
var wrongBallsEaten=goodBallsEaten=0;
var colorToEat = 'red';
let player = {
  x:10,
  y:10,
  width:20,
  height:20,
  color:'red'
}


this.init = function () {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas4");
    ctx = canvas.getContext("2d");

    // often useful
    w = canvas.width; 
    h = canvas.height; 

    startGame(10);
 
    canvas.addEventListener("mousemove", function(evt){
      mousePos = getMousePosition(canvas, evt);
    }, false);
 
    canvas.addEventListener("mousedown", function(evt){
      mouseButton = evt.button;
      var message = 'You clicked button '+ mouseButton;
      writeMessage(canvas, message);
    }, false);
 
    canvas.addEventListener("mouseup", function(evt){
      mousePos = getMousePosition(canvas, evt);
      var message = mousePos.x + ' ' +mousePos.y;
      writeMessage(canvas, message);
    }, false);
   // ready to go !
    mainLoop();
};
this.changeNbBalls = function (nb){
    startGame(nb);
}

this.changePlayerColor = function (color){
    player.color = color;
}

this.changeColorToEat = function (color){
    colorToEat = color;
}
this.changeBallSpeed = function (coef){
    globalSpeedMutiplier = coef;
}



function startGame(nb){
    do {
        // create 10 balls
        balls = createBalls(nb);
        numberOfInitialBalls = nb;
        numberOfGoodBalls = countNumberOfGoodBalls(balls, colorToEat);
 
    } while(numberOfGoodBalls ===0);
    wrongBallsEaten = goodBallsEaten = 0;
}

function countNumberOfGoodBalls(balls, colorToEat){
    let sum = 0;
    balls.forEach(function(b){
        if(b.color == colorToEat)
            sum++;
    });
    return sum;
}

function drawBallNumbers(canvas){
    ctx.save();
    ctx.font = "20px Arial";
    if(balls.length===0)
        ctx.fillText("Game Over!", 20, 30);
    else if(goodBallsEaten===numberOfGoodBalls)
        ctx.fillText("You Win! Final score: " +(numberOfInitialBalls-wrongBallsEaten), 20, 30);
    else{
        ctx.fillText("Balls still alive: "+balls.length, 210, 30);
        ctx.fillText("Good Balls eaten: "+ goodBallsEaten, 210, 50)
        ctx.fillText("Wrong Balls eaten: " + wrongBallsEaten, 210, 70);
    }

    ctx.restore();
}
function writeMessage (canvas, msg){
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = '18pt Calibri';
  ctx.fillStyle = "black";
  ctx.fillText(msg, 10, 25);
  ctx.restore;
}

function getMousePosition(canvas, evt){
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  }
}

function movePlayerWithMouse(){
    if(mousePos!==undefined){
        player.x = mousePos.x;
        player.y = mousePos.y;
    }
}

function mainLoop() {
  // 1 - clear the canvas
  ctx.clearRect(0, 0, w, h);
  
  // draw the ball and the player
  drawFilledRectangle(player);
  drawAllBalls(balls);
  drawBallNumbers(balls);

  // animate the ball that is bouncing all over the walls
  moveAllBalls(balls);
    
  movePlayerWithMouse();
 
  // ask for a new animation frame
  requestAnimationFrame(mainLoop);
}

function circRectsOverlap(x0, y0, w0, h0, cx, cy, r){
  var testX=cx;
  var testY=cy;
  if (testX < x0) testX=x0;
  if (testX > (x0+w0)) testX=(x0+w0);
  if (testY < y0) testY=y0;
  if (testY > (y0+h0)) testY=(y0+h0);
  return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))< r*r);
}

function isBallEaten(b, index) {
  if(circRectsOverlap(player.x, player.y,
                     player.width, player.height,
                     b.x, b.y, b.radius)) {
    // we remove the element located at index
    // from the balls array
    // splice: first parameter = starting index
    //         second parameter = number of elements to remove
    balls.splice(index, 1);
    if(b.color === colorToEat)
        goodBallsEaten++;
    else
        wrongBallsEaten++;
    }
}
function calculateSpeed(speed){
    var x, y;
    sx = -speed+2*speed*Math.random();
    var sign = Math.sign(0.5-Math.random())
    sy = sign*Math.pow(speed*speed-sx*sx, 0.5);
    return {x:sx,y:sy};
}
function createBalls(n) {
  // empty array
  var ballArray = [];
  
  // create n balls
  for(var i=0; i < n; i++) {
      var speed = calculateSpeed(globalBallSpeed*globalSpeedMutiplier);
     var b = {
        x:w/2,
        y:h/2,
        radius: 5 + 30 * Math.random(), // between 5 and 35
        speedX: speed.x,
        speedY: speed.y, // between -5 and + 5
        color:getARandomColor(),
      }
     // add ball b to the array
     if(b.color==colorToEat)
      numberOfGoodBalls+=1;
     ballArray.push(b);
      numberOfInitialBalls+=1;
    }
  // returns the array full of randomly created balls
  return ballArray;
}

function getARandomColor() {
  var colors = ['red', 'blue', 'cyan', 'purple', 'pink', 'green', 'yellow'];
  var colors = ['red', 'blue', 'green'];
  // a value between 0 and color.length-1
  // Math.round = rounded value
  // Math.random() a value between 0 and 1
  var colorIndex = Math.round((colors.length-1)*Math.random()); 
  var c = colors[colorIndex];
  
  // return the random color
  return c;
}

function drawAllBalls(ballArray) {
    ballArray.forEach(function(b) {
      drawFilledCircle(b);
    });
}

function moveAllBalls(ballArray) {
  // iterate on all balls in array
  ballArray.forEach(function(b, i) {
      // b is the current ball in the array
      b.x += b.speedX;
      b.y += b.speedY;
  
      testCollisionBallWithWalls(b); 
      isBallEaten(b, i)
  });
}

function testCollisionBallWithWalls(b) {
    // COLLISION WITH VERTICAL WALLS ?
    if((b.x + b.radius) > w) {
    // the ball hit the right wall
    // change horizontal direction
    b.speedX = -b.speedX;
    
    // put the ball at the collision point
    b.x = w - b.radius;
  } else if((b.x -b.radius) < 0) {
    // the ball hit the left wall
    // change horizontal direction
    b.speedX = -b.speedX;
    
    // put the ball at the collision point
    b.x = b.radius;
  }
  
  // COLLISIONS WTH HORIZONTAL WALLS ?
  // Not in the else as the ball can touch both
  // vertical and horizontal walls in corners
  if((b.y + b.radius) > h) {
    // the ball hit the right wall
    // change horizontal direction
    b.speedY = -b.speedY;
    
    // put the ball at the collision point
    b.y = h - b.radius;
  } else if((b.y -b.radius) < 0) {
    // the ball hit the left wall
    // change horizontal direction
    b.speedY = -b.speedY;
    
    // put the ball at the collision point
    b.Y = b.radius;
  }  
}

function drawFilledRectangle(r) {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();
  
    // translate the coordinate system, draw relative to it
    ctx.translate(r.x, r.y);
  
    ctx.fillStyle = r.color;
    // (0, 0) is the top left corner of the monster.
    ctx.fillRect(0, 0, r.width, r.height);
  
    // GOOD practice: restore the context
    ctx.restore();
}

function drawFilledCircle(c) {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();
  
    // translate the coordinate system, draw relative to it
    ctx.translate(c.x, c.y);
  
    ctx.fillStyle = c.color;
    // (0, 0) is the top left corner of the monster.
    ctx.beginPath();
    ctx.arc(0, 0, c.radius, 0, 2*Math.PI);
    ctx.fill();
 
    // GOOD practice: restore the context
    ctx.restore();
}
}