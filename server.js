'use strict'

const express = require("express"); // import express framework after installation
const cors = require("cors"); // import cors library after installation
require("dotenv").config(); // import .env environment variables after installation
// const weatherData = require("./data/weather.json"); // import JSON file about weather data after we made a directory (data) which contains json file
const { response } = require("express");
const axios = require('axios'); // import axios 

const server = express(); // let server access the express methods and properties
const PORT = process.env.PORT; // port on 3001 , put it as variable in .env file and get it by process.env
server.use(cors()); // we use cors()- open API server- to give a permission to get request from any client


//forecast class to use push the date and the description for three days for each city in an array (forecastArray) 
class Forecast {
    constructor(responseData) {
        this.days = responseData.map(day => {
            let dayObj = {
                datetime: day.datetime,
                description: day.weather.description
            }
            return dayObj;
        })

    }
}

class Movies {
    constructor(movie) {

        this.title = movie.title;
        this.overview = movie.overview;
        this.vote_average = movie.vote_average;
        this.total_votes = movie.total_votes;
        this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        this.popularity = movie.popularity;
        this.release_on = movie.release_date;


    }

}









// these are the route that our server is listening for

// localhost:3001/ (local) 
server.get('/', (request, response) => {
    response.send('hello from our server')
})


// https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=${process.env.WEATHER_API_KEY}&city=${cityName}   (3rd party API)

// localhost:3001/weather (local) 
server.get("/weather", (request, response) => {

    let latData = request.query.lat;
    let lonData = request.query.lon;
    let cityName = request.query.searchQuery;

    // array of objects( class Forecsat)
    let weatherArray = [];


    let url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${process.env.WEATHER_API_KEY}`
    try {
        axios.get(url).then(weatherResults => {  // get the url by axios and but the data in weatherResults.
            let responseData = weatherResults.data.data
            let forecastForToday = new Forecast(responseData)
            // the weatherArray contains an daysObj that contain array of objects (datetime, description) for 16 days from the currentday and 15 days after 
            weatherArray.push(forecastForToday)
            // push the data that comes from the response into weatherArray

            console.log("pass")
            response.send(weatherArray);

        })
        console.log("done")
    } catch (error) {
        console.log('error')
        response.status(404).send("Something went wrong!");

    }

})

let moviesArray = [];
// https://api.themoviedb.org/4/search/movie?query=${cityName}&api_key=${process.env.MOVIES_API_KEY}  (3rd party API)

// localhost:3001/movies?searchQuery=${cityName}&api_key=${process.env.MOVIES_API_KEY} (local) 
server.get("/movies", (request, response) => {

    let cityName = request.query.searchQuery;



    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIES_API_KEY}&query=${cityName}`
    try {
        axios.get(url).then(moviesResults => {  // get the url by axios and but the data in moviesResults.
            let responseDataMovies = moviesResults.data.results.map(movie => {
                return new Movies(movie)
            })

            response.send(responseDataMovies);

            console.log("pass")

        })
        console.log("done")
    } catch (error) {
        console.log('error')
        response.status(404).send("Something went wrong!");

    }

});




// handle any route
//localhost:3001/ANY_PATH
server.get("*", (request, response) => {
    response.status(500).send("Something went wrong!");
});

server.listen(PORT, () => {
    console.log(`your server is listening on PORT ${PORT}`);
}); // to lunch the server to listen(express method) to any request, listen take 2 parameters (port,callback function)
