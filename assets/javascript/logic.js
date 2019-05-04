
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

// Variables
// =================================================================================================

// Gets user input of the train and stores in a variable 
var trainName = $("#train-name").val().trim();
// Gets the user input of the desination and stores in a variable
var destinationName = $("#destination").val().trim();
// Gets the value of the first arrival and stores in a variable
var trainTime = moment($("#train-time").val().trim(), "HH:mm").format("HH:mm")
console.log("First train time:",trainTime)
// Gets the value of how frequent the train comes and stores in a variable
var frequencyTime = moment($("#frequency").val().trim(), "m").format("m");
console.log("Frequency time",frequencyTime);
// Gets the current time in military time
var now = moment().format("HH:mm");
console.log("Current time:",now);


// Next arrival has to compare: first arrival and the frequency. 
var nextTrain = moment(trainTime,"HH:mm").add(frequencyTime,"HH:mm").format("HH:mm");
console.log("Next train: ", nextTrain);

// console.log("Next train HTML:",nextTrainHTML);


// Compare frequency to current time and 

// Creating a temporary object to hold train info

var newTrain = {
  name: trainName,
  destination: destinationName,
  time: trainTime,
  frequency: frequencyTime,
};

// console.log(newTrain)

// uploads the newTrain to the database
database.ref().push(newTrain);


alert("New train added")

$("#train-name").val("");
$("#destination").val("");
$("#train-time").val("");
$("#frequency").val("");

});

var firstTrain;

// Creating a firebase event for adding train to the database and a row in HTML
database.ref().on("child_added", function(childSnapshot){
  console.log("Child Snapshot:",childSnapshot)
var nextArr;
var minAway;

// Change year so first train comes before now
var firstTrainNew = moment(childSnapshot.val().trainTime, "hh:mm").subtract(1, "years");
console.log("First Train New: ",firstTrainNew);
var diffTime = moment().diff(moment(firstTrainNew), "minutes");
console.log("Difference between current and firstTrain: ", diffTime);
var remainder = diffTime % childSnapshot.frequency;
console.log("Remainder: ", remainder);
var minAway = childSnapshot.val().frequency - remainder;
console.log("Minutes Away: ", minAway);
// Next train time
var nextTrain = moment().add(minAway, "minutes");
nextTrain = moment(nextTrain).format("hh:mm");
console.log("Next train: ", nextTrain);



var trainName = childSnapshot.val().name;
var destinationName = childSnapshot.val().destination;
var trainTime = childSnapshot.val().time;
var frequencyTime = childSnapshot.val().frequency;
var nextTrainHTML = childSnapshot.val().upcoming;



var newRow = $("<tr>").append(
  $("<td>").text(trainName),
  $("<td>").text(destinationName),
  $("<td>").text(frequencyTime + " min"),
  $("<td>").text(nextTrainHTML),
  // $("<td>").text(frequencyTime)
);


// append the new row to the table
$("#trainSchedule > tbody").append(newRow);
});