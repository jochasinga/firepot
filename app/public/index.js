var socket = io();

// Register firebase module
var app = angular.module("sampleApp", ["firebase"]);

app.controller("SampleCtrl", function($scope, $firebase) {
    var ref = new Firebase(
      "https://blistering-inferno-6120.firebaseio.com/colors"
    );
    // create an AngularFire ref to the data
    var sync = $firebase(ref);

    // pull the data into a local copy
    var syncObject = sync.$asObject();

    // sync the object with three-way data binding
    syncObject.$bindTo($scope, "data");
});
