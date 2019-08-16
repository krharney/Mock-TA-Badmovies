var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var axios = require('axios');
var app = express();
var config = require('../config');
var mysql = require('mysql');

const db = mysql.createConnection({
  user: 'root',
  database: 'movies'
})

db.connect();

// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup


//Helpers
var apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));


//OPTION 1: Use regular routes

app.get('/genres', function (req, res) {
  // make an axios request to get the official list of genres from themoviedb
  // use this endpoint. you will need your API key from signup: https://api.themoviedb.org/3/genre/movie/list
  axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${config.API_KEY}&language=en-US`)
    .then(function (response) {
      res.status(200).send(JSON.stringify(response.data.genres));
    })
    .catch(function (error) {
      res.sendStatus(500).end("error in the get genres");
    });
});

app.get('/search', function (req, res) {
  let genre = req.query.genre;
  axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${config.API_KEY}&language=en-US&sort_by=popularity.asc&include_adult=false&include_video=false&page=1&with_genres=${genre}`)
    .then(function (response) {
      console.log("movies: ", response.data);
      res.status(200).send(JSON.stringify(response.data));
    }).catch(function (error) {
      console.log("error in the search request");
      res.status(500).send(error);
    })
});

app.post('/save', function (req, res) {
  db.query(`INSERT INTO favorites SET ?`, req.body, () => {
    console.log("sent!");
    db.query(`SELECT * FROM favorites`, (err, data) => {
      if (err) console.log(err)
      else {
        console.log(data)
        res.status(200).end(JSON.stringify(data));
      }
    })
  })
});

// db.query(`INSERT INTO favorites (id, poster_path, title, release_date, popularity) VALUES (?)`, [req.body.id, req.body.poster_path, req.body.title, req.body.release_date, req.body.popularity], () => {
//   console.log("sent!");
//   res.sendStatus(200);
// })

app.post('/delete', function (req, res) {
  console.log('deleting', req.body.id);
  db.query(`DELETE FROM favorites WHERE id=${req.body.id}`, () => {
    db.query(`SELECT * FROM favorites`, (err, data) => {
      if (err) console.log(err)
      else {
        console.log(data)
        res.status(200).end(JSON.stringify(data));
      }
    })
  })
});


//OPTION 2: Use Express Router

//IF you decide to go with this option, delete OPTION 1 to continue

//Routes

// const movieRoutes = require('./routes/movieRoutes.js');

// //Use routes
// app.use('/movies', movieRoutes);


app.listen(3000, function () {
  console.log('listening on port 3000!');
});

