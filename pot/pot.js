var Firebase = require("firebase");
var five = require("johnny-five");

// Create a new instance of Firebase db
var firebaseRef = new Firebase(
  "https://blistering-inferno-6120.firebaseio.com/colors"
);

five.Board().on("ready", function() {
  var maxValue = 511;
  var colRange = 6;
  var offset   = maxValue / colRange;

  // Create a new pot instance
  var pot = new five.Sensor({
    pin: "A0",
    freq: 250
  });

  // Create a new led array based on pin number
  var ledArray = new five.Led.Array([9, 10, 11]);

  // analogRead on pin A0
  pot.on("data", function() {

    var self = this.value;
    console.log(self);

    // Implement new map method
    Number.prototype.map = function(fromLow , fromHigh , toLow , toHigh) {
      return (this - fromLow) * (toHigh - toLow) / (fromHigh - fromLow) + toLow;
    }

    
    // Map dynamic color brightness to pot value
    // RED - VIOLET - BLUE
    var redDec   = Math.round(self.map(offset, offset*2, 255, 0));
    var blueInc  = Math.round(self.map(0, offset, 0, 255));
    // BLUE - CYAN - GREEN
    var blueDec  = Math.round(self.map(offset*4, offset*5, 255, 0));
    var greenInc = Math.round(self.map(offset*2, offset*3, 0, 255));
    // GREEN - YELLOW - RED
    var greenDec = Math.round(self.map(offset*5, offset*6, 255, 0));
    var redInc   = Math.round(self.map(offset*4, offset*5, 0, 255));

    switch (true) {
      case (self >= 0 && self <= offset):
        console.log("1st loop");
        ledArray[0].brightness(255);
        ledArray[2].brightness(blueInc);
        ledArray[1].brightness(0);
	firebaseRef.set({"r": 255, "b": blueInc, "g": 0});
        break;
      case (self > offset && self <= offset*2):
        console.log("2nd loop");
        ledArray[0].brightness(redDec);
        ledArray[2].brightness(255);
        ledArray[1].brightness(0);
	firebaseRef.set({"r": redDec, "b": 255, "g": 0});
	break;
      case (self > offset*2 && self <= offset*3):
        console.log("3rd loop");
        ledArray[0].brightness(0);
        ledArray[2].brightness(255);
        ledArray[1].brightness(greenInc);
	firebaseRef.set({"r": 0, "b": 255, "g": greenInc});
	break;
      case (self > offset*3 && self <= offset*4):
        console.log("4th loop");
        ledArray[0].brightness(0);
        ledArray[2].brightness(blueDec);
        ledArray[1].brightness(255);
	firebaseRef.set({"r": 0, "b": blueInc, "g": 0});
        break;
      case (self > offset*4 && self <= offset*5):
        console.log("5th loop");
        ledArray[0].brightness(redInc);
        ledArray[2].brightness(0);
        ledArray[1].brightness(255);
	firebaseRef.set({"r": redInc, "b": 0, "g": 255});
	break;
      case (self > offset*5 && self <= offset*6):
        console.log("6th loop");
        ledArray[0].brightness(255);
        ledArray[2].brightness(0);
        ledArray[1].brightness(greenDec);
	firebaseRef.set({"r": 255, "b": 0, "g": greenDec});
	break;
      default:
	console.log("Out of range");
        ledArray[0].brightness(255);
	ledArray[2].brightness(0);
	ledArray[1].brightness(0);
	firebaseRef.set({"r": 255, "b": 0, "g": 0});
    }
  });
});
