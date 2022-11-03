const { response } = require('express');
const express = require('express');
const app = express();
// native nod https module used to get a get request across the internet
const https = require('https');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");

})

app.post("/", (req,res)=> {
    const query = req.body.cityName;
    const apiKey = "3061e548fb0d64d2174dbc5fe256d031"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey + "&units=imperial";

    https.get(url, (response) => {

        console.log(response.statusCode)

        response.on("data", (data)=> {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            //only one res.send can be used. when sending multiple sends, we use res.write then res.send at end
            res.write("<p>The weather is currently " + desc + "</p>");
            res.write("<h1>temperature in " + query + " is " + temp + " degrees </h1>");
            res.write("<img src="+ imgURL + "></img>")
            res.send();
        })

    })
})




app.listen(3000, function(){
    console.log('server is running on port 3000.')
})