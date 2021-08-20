'use strict'

const express = require("express"); // import express framework after installation
const cors = require("cors"); // import cors library after installation
require("dotenv").config(); // import .env environment variables after installation
const weatherData = require("./data/weather.json"); // import JSON file about weather data after we made a directory (data) which contains json file
const { response } = require("express");

const server = express(); // let server access the express methods and properties
const PORT = process.env.PORT; // port on 3001 , put it as variable in .env file and get it by process.env
server.use(cors()); // we use cors()- open API server- to give a permission to get request from any client


//forecast class to use push the date and the description for three days for each city in an array (forecastArray) 
class Forecast {
    constructor(data) {
        this.days = data.map(day => {
            let dayObj = {
                datetime: day.datetime,
                description: day.weather.description
            }
            return dayObj;
        })

    }
}


// localhost:3001/weather?lat=&lon=&searchQuery=Amman
server.get("/weather", (request, response) => {
    // console.log(request.query);
    // console.log("your data is here");
    // response.send(weatherData[0].city_name);
    let latData = request.query.lat;
    let lonData = request.query.lon;
    let cityName = request.query.searchQuery;

    // array of objects( class Forecsat)
    let forecastArray = [];

    try {
        weatherData.find((object) => {

            if (object.city_name.toLowerCase() === cityName.toLowerCase()) {
                // console.log(object.data[0].datetime);
                // console.log(object.data[0].weather.description);
                let forecast = new Forecast(object.data);

                forecastArray.push(forecast);

                console.log(object.data);
            }
        });
        console.log('pass');
        response.send(forecastArray);


    } catch (error) {
        console.log('error')
        response.status(404).send("Something went wrong!");

    }

})

// handle any path
//localhost:3001/ANY_PATH
server.get("*", (request, response) => {
    response.status(500).send("Something went wrong!");
});

server.listen(PORT, () => {
    console.log(`your server is listening on PORT ${PORT}`);
}); // to lunch the server to listen(express method) to any request, listen take 2 parameters (port,callback function)
