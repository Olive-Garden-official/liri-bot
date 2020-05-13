// Reads and sets any environment variables with the dotenv package. 
require("dotenv").config();

var keys= require("./keys.js");

var spotify = new spotify(keys.spotify);
