// Initialize client socket
var socket = io();

// Register firebase module
var app = angular.module("app", ["firebase"]);

// Set up controller function
app.controller("Ctrl", function($scope, $firebase) {
    var firebaseRef = new Firebase(
      "https://burning-limbo-6666.firebaseio.com/colors"
    );
    // create an AngularFire ref to the data
    var sync = $firebase(firebaseRef);

    // pull the data into a local model
    var syncObject = sync.$asObject();

    // sync the object with three-way data binding
    syncObject.$bindTo($scope, "data");
});
