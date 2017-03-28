var MongoClient = require('mongodb').MongoClient;

var findData = function(coordName, callback){
  MongoClient.connect("mongodb://localhost:27017/CLEARSKY", function(err, db) {
    var collection = db.collection('weather');
    collection.find({'coordName': coordName}).toArray(function (error, results){
    if(error) throw error;

    callback && callback(results[0]);

    });
      db.close();
  });
}

var updateWeather = function(data, callback){
  MongoClient.connect("mongodb://localhost:27017/CLEARSKY", function(err, db) {
    var collection = db.collection('weather');

    collection.find({'coordName': data.coordName}).toArray(function (error, results){
    if(error) throw error;
    console.log(results[0]);
    if (results[0] != undefined){
      db.collection('weather').updateOne(
         { "coordName" : data.coordName },
         {
           $set: {
               "coordName": data.coordName ,
               "lat": data.latitude,
               "lon": data.longitude,
               "temperature": data.temperature,
               "location": data.location,
               "humidity": data.humidity,
               "wind": data.wind,
               "direction": data.direction
            }
         }, function(err, results) {
         callback(results);
      });
      console.log("update done");
    }
    else if (results[0] == undefined){
      collection.insertOne({
          "coordName": data.coordName ,
          "lat": data.latitude,
          "lon": data.longitude,
          "temperature": data.temperature,
          "location": data.location,
          "humidity": data.humidity,
          "wind": data.wind,
          "direction": data.direction
       }, function(err, result) {
          if(error) throw error;
          callback(result);
      });
      console.log("insertion done");
    }
      db.close();
    });
  });
}

module.exports.updateWeather = updateWeather;
module.exports.findData = findData;
