//npm link to keys
require("dotenv").config();

//link the key.js file
var keys = require("./keys.js");

//require npm to use spotify, request, and moment
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
var fs = require('fs')

//save key to variable
var spotify = new Spotify(keys.spotify);

//cml arguements from node
var nodeArgs = process.argv;
console.log(process.argv);

var userInput = "";
var nextUserInput = "";

//user input for song, artist, and movie names
for (var i = 3; i < nodeArgs.length; i++) {

    //If userInput is more than 1 word
    if (i > 3 && i < nodeArgs.length) {
        userInput = userInput + "%20" + nodeArgs[i];
    }
    //If userInput is only 1 word
    else {
        userInput += nodeArgs[i];
    }
    console.log(userInput);
}

//Remove %20 when pushing to log.txt
for (var i = 3; i < nodeArgs.length; i++) {
    nextUserInput = userInput.replace(/%20/g, " ");
}

var userCommand = process.argv[2];
console.log(userCommand);
console.log(process.argv);
runLiri();

//switch stmt 
function runLiri() {
    switch (userCommand) {
        case "concert-this":

            //Append userInput to log.txt
            fs.appendFileSync("log.txt", nextUserInput + "\n----------------\n", function (error) {
                if (error) {
                    console.log(error);
                };
            });

            //Run request to bands in town
            var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
            request(queryURL, function (error, response, body) {
                //If no error and response is a success
                if (!error && response.statusCode === 200) {
                    //Parse the json response
                    var data = JSON.parse(body);
                    //Loop through array
                    for (var i = 0; i < data.length; i++) {
                        //name of venue
                        console.log("Venue: " + data[i].venue.name);
                        //Append data to log.txt
                        fs.appendFileSync("log.txt", "Venue: " + data[i].venue.name + "\n", function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });

                        //venue location
                        if (data[i].venue.region == "") {
                            console.log("Location: " + data[i].venue.city + ", " + data[i].venue.country);
                            //Append data to log.txt
                            fs.appendFileSync("log.txt", "Location: " + data[i].venue.city + ", " + data[i].venue.country + "\n", function (error) {
                                if (error) {
                                    console.log(error);
                                };
                            });

                        } else {
                            console.log("Location: " + data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country);
                            //Append data to log.txt
                            fs.appendFileSync("log.txt", "Location: " + data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country + "\n", function (error) {
                                if (error) {
                                    console.log(error);
                                };
                            });
                        }

                        //date of event "MM/DD/YYY"
                        var date = data[i].datetime;
                        date = moment(date).format("MM/DD/YYYY");
                        console.log("Date: " + date)
                        //Append data to log.txt
                        fs.appendFileSync("log.txt", "Date: " + date + "\n----------------\n", function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });
                        console.log("----------------")
                    }
                }
            });

        
    }
}