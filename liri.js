// Reads and sets any environment variables with the dotenv package. 
require("dotenv").config();

var keys= require("./keys.js");

// var spotify = new spotify(keys.spotify);


var command = process.argv[2];

var searchvalue = process.argv[3];

switch(command){
    case "concert-this":
        concertThis();
        break;
    case "spotify-this-song":
        spotifyThisSong();
        break;
    case "movie-this":
        movieThis();
        break;
    case "do-what-it-says":
        doWhatItSays();
        break;
    case "egg":
        easterEgg();
        break;
    case "help":
        iNeedHelp();
        break;
    default:
        invalidCommand();
        break;
}

function concertThis(){
    console.log("Concerts are fun. lets go to one")
};

function spotifyThisSong(){
    console.log("Spotify is for music so this command is for music")
};
function movieThis(){
    console.log("Search this movie or smth")
};
function doWhatItSays(){
 console.log("Do what it says my dude")
};
function easterEgg(){
    console.log("Easter Egg")
};
function iNeedHelp(){
    console.log("This is the help menu!: Please use the following commands:");
    console.log("=================================");
    console.log("• concert-this  Searches for bands in your town!");
    console.log("");
    console.log("• spotify-this-song   to search a song on spotify and get cool details about it!");
    console.log("");
    console.log("• movie-this   Search for movies here and get lots of facts about the movie.");
    console.log("");
    console.log("• do-what-it-says   Will execute a random command.");
    console.log("=================================");

};
function invalidCommand(){
    console.log("Please use a valid command. Use 'Help' for more information")
};