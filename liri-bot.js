//npm link to keys
require("dotenv").config();

//link the key.js file
var keys = require("keys.js");

//require npm to use spotify, request, and moment
var Spotify = require('node-spotify-api');
var request = require('request');
var moment = require('moment');
var fs = require('fs')

//save key to variable
var spotify = new Spotify(keys.spotify);
var omdbKey = keys.omdb.api_key;

//cml arguements from node
var nodeArgs = process.argv;
console.log(process.argv);

var userInput = "";
var nextUserInput = "";

