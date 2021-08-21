'use strict'
const axios = require('axios'); // import axios
const express = require("express"); // import express framework after installation

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


const getWeather = (request, response) => {
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

}
// https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=${process.env.WEATHER_API_KEY}&city=${cityName}   (3rd party API)

// localhost:3001/weather (local) 

module.exports = getWeather;



