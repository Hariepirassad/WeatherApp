var fs = require('fs');
var express = require('express');
var OWM = require('./OWM');
var connectSQL = require('./connectSQL');
var mongoDB = require('./mongoDB');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use( express.static('public'));

app.set('view engine', 'ejs');


app.get('/home', function (req, res) {
  res.render('home');
});

app.get('/getWeatherDB', function (req, res) {
  var data = {coordName: " ", latitude: " ", longitude: " ", temperature: " ", location: " ", humidity: " ", wind: " ", direction: " "};
  res.render('getWeatherDB', {coord: req.query, data: data});
});

app.get('/weatherForecast', function (req, res) {
  var data = {latitude: 0, longitude: 0, temperature: 0, location: "Unknown", source: "000", humidity: 0, wind: 0, direction: "Unknown"};
  res.render('weatherForecast', {coord: req.query, data: data});
});

app.post('/weatherForecast', urlencodedParser, function (req, res) {
  var coordName = req.body.route;

  var upperCoordName = coordName.toUpperCase();
  connectSQL(upperCoordName, function(resultSQL){
    OWM(resultSQL, function(resultat){
      var data = {coordName: resultat.properties.coordName, latitude: resultat.properties.lat, longitude: resultat.properties.lon, temperature: resultat.properties.temperature, location: resultat.properties.location, source: resultat.properties.icon, humidity: resultat.properties.humidity, wind: resultat.properties.wind, direction: resultat.properties.direction};
      mongoDB.updateWeather(data, function(result){
        res.render('weatherForecast', {coord: req.query, data: data});
      });
    });
  });
});

app.post('/getWeatherDB', urlencodedParser, function (req, res) {
  var coordName = req.body.route;

  var upperCoordName = coordName.toUpperCase();
  mongoDB.findData(upperCoordName, function(resultat){
    var data = {coordName: resultat.coordName, latitude: resultat.lat, longitude: resultat.lon, temperature: resultat.temperature, location: resultat.location, humidity: resultat.humidity, wind: resultat.wind, direction: resultat.direction};
    res.render('getWeatherDB', {coord: req.query, data: data});
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
