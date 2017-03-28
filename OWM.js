var APPID = "13feb3f8a7a354401a0bb766aef397fc"
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var dataOpenWM = require('./schemaOpenWM.json');

var OWM = function(resultSQL, callback){

  var coordName = resultSQL.coordName;
  var lat = resultSQL.lat;
  var lon = resultSQL.lon;

  var url = "http://api.openweathermap.org/data/2.5/weather?" +
    "lat=" + lat +
  	"&lon=" + lon +
  	"&APPID=" + APPID;

  request(url, function(error, response, body){

    if(!error){

      var $ = cheerio.load(body);
      console.log(body);
      var dataOWM = JSON.parse(body);
      dataOpenWM.properties.coordName = coordName;
      dataOpenWM.properties.lat = lat;
      dataOpenWM.properties.lon = lon;
      dataOpenWM.properties.icon = dataOWM.weather[0].id;
      dataOpenWM.properties.humidity = dataOWM.main.humidity;
      dataOpenWM.properties.wind = M2K(dataOWM.wind.speed);
      dataOpenWM.properties.direction = degreesToDirection(dataOWM.wind.deg);
      dataOpenWM.properties.location = dataOWM.name;
      dataOpenWM.properties.temperature = K2C(dataOWM.main.temp);
      callback && callback(dataOpenWM);
    }
    fs.writeFile('openWMResult.json', JSON.stringify(dataOpenWM, null, 4), function(err){});
  });
}


function M2K(k){
		return Math.round(k*0.868976);
}

function K2C(k){
	return Math.round(k - 273.15);
}

function degreesToDirection(degrees){
	var range = 360/16;
	var low = 360 - range/2;
	var high = (low + range) % 360;
	var angles = [ "N", "NNE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
	for( i in angles){
		if(degrees >= low && degrees < high){
			return angles[i];
		}
		low = (low + range) % 360;
		high = (high + range) % 360;
	}
	return "N";
}

module.exports = OWM;
