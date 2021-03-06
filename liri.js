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

//delete %20 when pushing to log.txt
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
        //bands in town: node liri.js concert-this <artist/band name here>
        case "concert-this":

            //append userInput to log.txt
            fs.appendFileSync("log.txt", nextUserInput + "\n----------------\n", function (error) {
                if (error) {
                    console.log(error);
                };
            });

            //run request to bands in town
            var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
            request(queryURL, function (error, response, body) {
                //if no error and response is a success
                if (!error && response.statusCode === 200) {
                    //parse the json response
                    var data = JSON.parse(body);
                    //loop through array
                    for (var i = 0; i < data.length; i++) {
                        //venue name
                        console.log("Venue: " + data[i].venue.name);
                        //append data to log.txt
                        fs.appendFileSync("log.txt", "Venue: " + data[i].venue.name + "\n", function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });

                        //venue location
                        if (data[i].venue.region == "") {
                            console.log("Location: " + data[i].venue.city + ", " + data[i].venue.country);
                            //append data to log.txt
                            fs.appendFileSync("log.txt", "Location: " + data[i].venue.city + ", " + data[i].venue.country + "\n", function (error) {
                                if (error) {
                                    console.log(error);
                                };
                            });

                        } else {
                            console.log("Location: " + data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country);
                            //append data to log.txt
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
                        //append data to log.txt
                        fs.appendFileSync("log.txt", "Date: " + date + "\n----------------\n", function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });
                        console.log("----------------")
                    }
                }
            });
            break;
        
        //spotify: node liri.js spotify-this-song '<song name here>'
        case "spotify-this-song":
        // console.log("test");

            //if statement for no song provided
            if (!userInput) {
                userInput = "The Sign Ace of Base";
                nextUserInput = userInput.replace(/%20/, " ");
            }

            //append userInput to log.txt
            fs.appendFileSync("log.txt", nextUserInput + "\n----------------\n", function (error) {
                if (error) {
                    console.log(error);
                };
            });

            console.log(spotify);
            spotify.search({

                type: "track",
                query: userInput
            }, function (err, data) {
                if (err) {
                    console.log("Error occured: " + err)
                }

                //assign data being used to a variable
                var info = data.tracks.items
                // console.log(test);

                //loop through "items" array
                for (var i = 0; i < info.length; i++) {
                    //store "album" object to variable
                    var albumObject = info[i].album;
                    var trackName = info[i].name
                    var preview = info[i].preview_url
                    //store "artists" array to variable
                    var artistsInfo = albumObject.artists
                    //loop through "artists" array
                    for (var x = 0; x < artistsInfo.length; x++) {
                        console.log("Artist: " + artistsInfo[x].name)
                        console.log("Song Name: " + trackName)
                        console.log("Preview of Song: " + preview)
                        console.log("Album Name: " + albumObject.name)
                        console.log("----------------")
                        //append data to log.txt
                        fs.appendFileSync("log.txt", "Artist: " + artistsInfo[x].name + "\nSong Name: " + trackName + "\nPreview of Song: " + preview + "\nAlbum Name: " + albumObject.name + "\n----------------\n", function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });
                    }
                }
            })

            break;

        //OMDB: node liri.js movie-this '<movie name here>'
        case "movie-this":
                //if statement for no movie provided
                if (!userInput) {
                    userInput = "Mr. Nobody";
                    nextUserInput = userInput.replace(/%20/, " ");
                }
    
                //append userInput to log.txt
                fs.appendFileSync("log.txt", nextUserInput + "\n----------------\n", function (error) {
                    if (error) {
                        console.log(error);
                    };
                    
                });
    
                //run request to OMDB
                var queryURL = "https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
                request(queryURL, function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        var info = JSON.parse(body);
                        console.log("Title: " + info.Title)
                        console.log("Release Year: " + info.Year)
                        console.log("OMDB Rating: " + info.Ratings[0].Value)
                        console.log("Rotten Tomatoes Rating: " + info.Ratings[1].Value)
                        console.log("Country: " + info.Country)
                        console.log("Language: " + info.Language)
                        console.log("Plot: " + info.Plot)
                        console.log("Actors: " + info.Actors)
    
                        //append data to log.txt
                        fs.appendFileSync("log.txt", "Title: " + info.Title + "\nRelease Year: " + info.Year + "\nIMDB Rating: " + info.Ratings[0].Value + "\nRotten Tomatoes Rating: " +
                            info.Ratings[1].Value + "\nCountry: " + info.Country + "\nLanguage: " + info.Language + "\nPlot: " + info.Plot + "\nActors: " + info.Actors + "\n----------------\n",
                            function (error) {
                                if (error) {
                                    console.log(error);
                                };
                            });
                    }
                });    
                break;       
    }
}

// Random.txt: node liri.js do-what-it-says
if (userCommand == "do-what-it-says") {
    var fs = require("fs");

    //random.txt file
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }

        //split data into array
        var textArr = data.split(",");
        userCommand = textArr[0];
        userInput = textArr[1];
        nextUserInput = userInput.replace(/%20/, " ");
        runLiri();
    })
}

