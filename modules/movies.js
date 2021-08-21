'use strict'
const axios = require('axios'); // import axios



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

const getMovies = (request, response) => {
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
}

// localhost:3001/movies?searchQuery=${cityName}&api_key=${process.env.MOVIES_API_KEY} (local) 
// https://api.themoviedb.org/4/search/movie?query=${cityName}&api_key=${process.env.MOVIES_API_KEY}  (3rd party API)

module.exports = getMovies;
