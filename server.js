'use strict'

const express = require("express"); // import express framework after installation
const server = express(); // let server access the express methods and properties
const cors = require("cors"); // import cors library after installation
require("dotenv").config(); // import .env environment variables after installation
// const weatherData = require("./data/weather.json"); // import JSON file about weather data after we made a directory (data) which contains json file
const getMovies = require('./modules/movies');
const getWeather = require('./modules/weather');
const axios = require('axios'); // import axios 

server.use(cors()); // we use cors()- open API server- to give a permission to get request from any client
const PORT = process.env.PORT; // port on 3001 , put it as variable in .env file and get it by process.env


// these are the route that our server is listening for

// localhost:3001/ (local) 
server.get('/', (request, response) => {
    response.send('hello from our server')
})

server.get("/weather", getWeather);

server.get("/movies", getMovies);

// handle any route
//localhost:3001/ANY_PATH
server.get("*", (request, response) => {
    response.status(500).send("Something went wrong!");
});

server.listen(PORT, () => {
    console.log(`your server is listening on PORT ${PORT}`);
}); // to lunch the server to listen(express method) to any request, listen take 2 parameters (port,callback function)