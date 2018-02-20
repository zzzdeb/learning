var canvas2 = new function(){
    // useful to have them as global variables
var canvas, ctx, mousePos, mouseButton;

this.init = function () {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas2");
    ctx = canvas.getContext("2d");

    canvas.addEventListener("mousemove", function(evt){
      mousePos = getMousePosition(canvas, evt);
      var message = mousePos.x + ' ' +mousePos.y;
      writeMessage(canvas, message);
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
  };
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
}