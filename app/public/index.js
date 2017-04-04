// Register firebase module
var app = angular.module("app", ["firebase"]);

// Set up controller function                                                                                       
app.controller("Ctrl", function($scope, $firebaseObject) {
    // Initialize Firebase
    var config = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        storageBucket: "",
        messagingSenderId: ""
    };
    firebase.initializeApp(config);

    var firebaseRef = firebase.database().ref();

    // pull the data into a local model                                                                             
    var syncObject = $firebaseObject(firebaseRef);

    // sync the object with three-way data binding                                                                  
    syncObject.$bindTo($scope, "data");
});