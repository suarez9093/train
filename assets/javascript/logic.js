
// Firebase
var config = {
  apiKey: "AIzaSyBeF7kLB_W0i9cxiY4sYPkMfU1k-cPeoL0",
  authDomain: "train-74a39.firebaseapp.com",
  databaseURL: "https://train-74a39.firebaseio.com",
  projectId: "train-74a39",
  storageBucket: "train-74a39.appspot.com",
  messagingSenderId: "95925391919"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).on("click","#submitButton", function(event){
  event.preventDefault();

// Get the value of the user input for train, destination, train time, frequency and store in a varibale
var trainName = $("#train-name").val().trim();
var destinationName = $("#destination").val().trim();
var trainTime = $("#train-time").val().trim();
var frequencyTime = $("#frequency").val().trim();

// Creating a temporary object to hold train info

var newTrain = {
  name: trainName,
  destination: destinationName,
  time: trainTime,
  frequency: frequencyTime
};

// uploads the newTrain to the database
database.ref().push(newTrain);

// log to the console to make sure everything is working 

console.log(newTrain.name);
console.log(newTrain.destination);
console.log(newTrain.time);
console.log(newTrain.frequency);

alert("New train added")

$("#train-name").val("");
$("#destination").val("");
$("#train-time").val("");
$("#frequency").val("");

});

// Creating a firebase event for adding train to the database and a row in HTML
database.ref().on("child_added", function(childSnapshot){
  console.log("Snapshot",childSnapshot.val());

var trainName = childSnapshot.val().name;
var destinationName = childSnapshot.val().destination;
var trainTime = childSnapshot.val().time;
var frequencyTime = childSnapshot.val().frequency;

// Train Info
console.log(trainName);
console.log(destinationName);
console.log(trainTime);
console.log(frequencyTime);

var trainStartTime = moment.unix(trainTime).format("HH:mm");
console.log(trainStartTime);

var frequencyMomentTime = moment.unix(frequencyTime).format();
console.log(frequencyMomentTime);

var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(destinationName),
  $("<td>").text(trainTime),
  $("<td>").text(frequencyTime)
);



// append the new row to the table
$("#trainSchedule > tbody").append(newRow);
});