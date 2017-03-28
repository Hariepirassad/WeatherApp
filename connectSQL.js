var mysql = require('mysql');

var coord = {
  coordName: "",
  lat: 0,
  lon: 0
}

function connectSQL(coordName, callback){

  var mySqlClient = mysql.createConnection({
   host : 'localhost',
   user : 'clearSky',
   password : 'clearSky',
   database : 'route_data'
  }) ;

  mySqlClient.connect(function(err) {

    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + mySqlClient.threadId);
  });

  var selectQuery = 'select DDLat, DDLon, coordName from coordinates where coordName =' + '\'' + coordName + '\';'

  mySqlClient.query(selectQuery, function select(error, results, fields) {
    if (error) {
     console.log(error) ;
     mySqlClient.end() ;
    }
    if (results.length > 0) {
     	var firstResult = results[0] ;
      coord.coordName = firstResult['coordName'];
  		coord.lat = firstResult['DDLat'];
  		coord.lon = firstResult['DDLon'];
      callback && callback(coord);
    }
    else {
     console.log('Pas de données');
    }
    mySqlClient.end();
    return coord;
  });
}

module.exports = connectSQL;
