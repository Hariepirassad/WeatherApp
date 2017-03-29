# WeatherApp

## What it does

Give the weather all over the world. 
You just need to know the route name incorporated into the database.  
-  DTTA
-  KEMIR
-  MORJA
-  ANB
-  JIL
-  BJA
-  BNA
-  DAAG

Now just launch weatherApp.js with node and see the weather.
```
node weatherApp
```

## What to do

Run the following command in your directory to install all the modules needed.
You will need [Node.js](https://nodejs.org/en/) to run the application.
```
npm install
npm install mysql
npm install mongodb
```

We use a NoSQL database (MongoDB) so you need to create a database called 'CLEARSKY' and a collection called 'weather' 

Finally you also need to get you own google MAPS API KEY on google console and add it to weatherForecast.ejs and getWeatherDB.ejs
```
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>
```

## Warning
Get only the weather from the ROUTES that you've already forecasted, other way there is no weather data into the database so the app could crash.

## Licence

[Uncopyrighted](http://zenhabits.net/uncopyright/)
