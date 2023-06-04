const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
    const query= req.body.cityname;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=f9dc32e2d8f2a96db5cc8c29da55d12e&units=metric";
  https.get(url, function (response) {
    console.log(response.statusCode);
    response.on("data", function (data) {
      const weatherdata = JSON.parse(data);
      // console.log(weatherdata);
      const temp = weatherdata.main.temp;
      const weatherdiscription = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>the weather is currently " + weatherdiscription + " .</p>");
      res.write(
        "<h1>The temperature in "+query+" is " + temp + " degrees celsius. </h1>"
      );
      res.write("<img src=" + imageURL + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("the server is currently working at port 3000.");
});
