// Reads and sets any environment variables with the dotenv package.
require("dotenv").config();

var Spotify = require("node-spotify-api");

var fs = require("fs");

var keys = require("./keys.js");

var moment = require("moment");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");

var command = process.argv[2];

var searchvalue = process.argv[3];

switch (command) {
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

function concertThis() {
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        searchvalue +
        "/events?app_id=codingbootcamp"
    )
    .then(function (response) {
      console.log(searchvalue + "'s coming up concerts are listed below:");
      console.log("=======================================");
      for (let i = 0; i < response.data.length; i++) {
        console.log("Venue: " + response.data[i].venue.name);
        console.log("Located in: " + response.data[i].venue.location);
        var concertdate = moment(response.data[i].datetime).format(
          "MM DD YYYY"
        );
        console.log("On " + concertdate);
        console.log("+++++++++++++++++++++++++++++++++++++");
      };
    });
};

function spotifyThisSong() {
  spotify.search({ type: "track", query: searchvalue, limit: 1 }, function (
    err,
    data
  ) {
    if (err) {
      spotifyNotThisSong();
      return console.log(
        "Nothing... I know nothing about that song. Either it doesn't exist, or it's not on Spotify. Here's my recommendation: "
      );
    };
    console.log(
      "Ah yes, " +
        searchvalue +
        " I know all about that song. Here's what I know: "
    );
    console.log("=================================================");
    console.log(searchvalue + " is by " + data.tracks.items[0].artists[0].name);
    console.log("++++++++++++++++++++++++++++++");
    console.log(
      "It's part of their album '" + data.tracks.items[0].album.name + "' "
    );
    console.log("++++++++++++++++++++++++++++++");
    console.log(
      "You can find the song on spotify: " +
        data.tracks.items[0].external_urls.spotify
    );
  });
};
function spotifyNotThisSong() {
  spotify.search({ type: "track", query: "The Sign", limit: 1 }, function (
    err,
    data
  ) {
    if (err) {
      spotifyNotThisSong();
      return console.log(
        "If you're seeing this, something is really broke. Sorry :("
      );
    };
    console.log("=================================================");
    console.log("'The Sign' by " + data.tracks.items[0].artists[0].name);
    console.log("++++++++++++++++++++++++++++++");
    console.log(
      "It's part of their album '" + data.tracks.items[0].album.name + "' "
    );
    console.log("++++++++++++++++++++++++++++++");
    console.log(
      "You can find the song on spotify: " +
        data.tracks.items[0].external_urls.spotify
    );
  });
};
function movieThis() {
  axios
    .get("http://www.omdbapi.com/?apikey=trilogy&t=" + searchvalue)
    .then(function (err, response) {
        if (err){
            console.log("Looks like that movie has yet to be made. Here's my favorite movie instead: ");
            return movieNotThis();
        };
      console.log("Ah yes, " + searchvalue + ". One of my favorites!");
      console.log("Origonally released in " + response.data.Year);
      console.log(
        "When it released, it rated at " +
          response.data.Ratings[1].Value +
          " on Rotten Tomatoes."
      );
      console.log("It also rated " + response.data.imdbRating + " on IMDB!");
      console.log(
        searchvalue +
          " was produced in " +
          response.data.Country +
          " and is in " +
          response.data.Language
      );
      console.log(
        "It was a movie staring " +
          response.data.Actors +
          ". Where " +
          response.data.Plot
      )
    });
};
function doWhatItSays() {
    fs.readFile('random.txt', 'utf8' ,function read(err, data){
        if(err){
            console.log(err);
        };
        // console.log(data);
        var randocommand = data.split(" ");
        command = randocommand[0];
        searchvalue = randocommand[1];

    });
};
function easterEgg() {
  console.log("Easter Egg");
};
function iNeedHelp() {
  console.log("This is the help menu!: Please use the following commands:");
  console.log("===========================================================");
  console.log("• concert-this  Searches for bands in your town!");
  console.log("");
  console.log(
    "• spotify-this-song   to search a song on spotify and get cool details about it!"
  );
  console.log("");
  console.log(
    "• movie-this   Search for movies here and get lots of facts about the movie."
  );
  console.log("");
  console.log("• do-what-it-says   Will execute a random command.");
  console.log("===========================================================");
  console.log(
    "Currently, only 1 command and one search term is supported. If you're search term contains multiple words, please use quotations. Example: 'The Matrix'"
  );
};
function movieNotThis(){
    axios
    .get("http://www.omdbapi.com/?apikey=trilogy&t=the%20matrix")
    .then(function (response) {
      console.log("  The Matrix! One of my favorites!");
      console.log("==================================================");
      console.log("  • Origonally released in " + response.data.Year);
      console.log(
        "  • When it released, it rated at " +
          response.data.Ratings[1].Value +
          " on Rotten Tomatoes."
      );
      console.log("      It also rated " + response.data.imdbRating + " on IMDB!");
      console.log("  • "+
        searchvalue +
          " was produced in " +
          response.data.Country +
          " and is in " +
          response.data.Language
      );
      console.log(
        "  • It was a movie staring " +
          response.data.Actors +
          ". Where " +
          response.data.Plot
      );
      console.log("============================================");
      console.log("Trans Rights!");
    });
};
function invalidCommand() {
  console.log("Please use a valid command. Use 'Help' for more information");
};