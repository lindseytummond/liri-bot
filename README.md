# LIRI Bot - Language Interpretation and Recognition Interface

## Problem App is Solving:
LIRI Bot solves the problem of searching Bands In Town for concerts, Spotify for songs, and OMDB for movies. It solves using multiple resources to find detailed information about concerts, songs, and movies in one centralized location.

## Overview: 
LIRI is a command line node app that takes in parameters and provides data based off the following commands:

-	concert-this
-	spotify-this-song
-	movie-this
-	do-what-it-says

## Technologies:
-	Javascript
-	Node.js
-	Node-Spotify-API
-	Axios:
    -	OMDB API
    -	Bands in Town API
-	Moment
-	DotEnv

## How to run the app:

### Bands In Town

<img src="images/BandsInTown.png">

`node liri.js concert-this <artist/band name here>`

This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

-   Name of the venue
-   Venue location
-   Date of the Event (use moment to format this as "MM/DD/YYYY")

### Spotify