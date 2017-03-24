var fs = require('fs');
var express = require('express');
var OWM = require('./OWM');
var connectSQL = require('./connectSQL');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use( express.static('public'));

app.set('view engine', 'ejs');

app.get('/home', function (req, res) {
  var data = {latitude: 0, longitude: 0, temperature: 0, location: "Unknown", source: "Unknown", humidity: 0, wind: 0, direction: "Unknown"};
  res.render('index', {coord: req.query, data: data});
});

app.post('/home', urlencodedParser, function (req, res) {
  var coordName = req.body.route;

  connectSQL(coordName, function(resultSQL){
    OWM(resultSQL, function(resultat){
      var data = {latitude: resultat.properties.lat, longitude: resultat.properties.lon, temperature: resultat.properties.temperature, location: resultat.properties.location, source: resultat.properties.icon, humidity: resultat.properties.humidity, wind: resultat.properties.wind, direction: resultat.properties.direction};
      res.render('index', {coord: req.query, data: data});
    });
  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
