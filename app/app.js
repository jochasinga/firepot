var Firebase = require("firebase");
var express = require("express");

var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
var port = process.env.PORT || 3000;

var firebaseRef = new Firebase("https://blistering-inferno-6120.firebaseio.com/colors");

server.listen(port, function() {
  console.log("Server listening on port %d", port);
});

// Routing to static files
app.use(express.static(__dirname + "/public"));
/*
app.get('/', function(req, res) {
  res.sendfile("index.html");
});
*/

io.on("connection", function(socket) {
  console.log("Connected and ready!");

  firebaseRef.on("value", function(snapshot) {
    var colorChange = snapshot.val();
    
    console.log("snapshot R: " + colorChange.r);
    console.log("snapshot B: " + colorChange.b);
    console.log("snapshot G: " + colorChange.g);

    socket.broadcast.emit("color change", {
      red: colorChange.r,
      green: colorChange.g,
      blue: colorChange.b
    });
  });
});


