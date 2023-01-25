const express = require("express"); //importing express
const request = require("request"); //importing request
const cors = require("cors"); //importing cors

const app = express(); //creating an express app
require("dotenv").config(); //importing dotenv and configuring

app.use(cors()); //cors is used to allow cross origin requests

const api_key = `${process.env.API_KEY}`; //api key is stored in .env file

const new_cities = [
  { city: "Mumbai" },
  { city: "Delhi" },
  { city: "Bangalore" },
  { city: "Hyderabad" },
  { city: "Chennai" },
  { city: "Kolkata" },
  { city: "Pune" },
  { city: "Ahmedabad" },
  { city: "Surat" },
  { city: "Jaipur" },
  { city: "Lucknow" },
  { city: "Kanpur" },
  { city: "Nagpur" },
  { city: "Patna" },
  { city: "Indore" },
  { city: "Thane" },
  { city: "Bhopal" },
  { city: "Visakhapatnam" },
  { city: "Vadodara" },
  { city: "Firozabad" },
  { city: "Ludhiana" },
  { city: "Rajkot" },
  { city: "Agra" },
  { city: "Siliguri" },
  { city: "Nashik" },
  { city: "Faridabad" },
  { city: "Patiala" },
  { city: "Meerut" },
  { city: "Rourkela" },
  { city: "bhubaneswar" }
]; //cities in the array

app.get("/_offset=:offset&_limit=:limit", (req, res) => {
  const offset = parseInt(req.params.offset); //offset and limit are the parameters
  const limit = parseInt(req.params.limit);
  const final = offset + limit;
  for (let i = offset; i < final; i++) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${new_cities[i].city}&appid=${api_key}`; //api call

    try {
      request(url, function (err, response, body) {
        if (err) {
          console.log("error:", err);
          res.send("error", err);
        } else {
          let weather = JSON.parse(body); //parsing the response

          new_cities[i]["weatherDetails"] = weather; //adding the weather details to the array
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  res.send(new_cities.slice(offset, final)); //sending the sliced array
});

const port = process.env.PORT || 9000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is up on port ${port}`);
  }
}); //server is running on port 9000 or process.env.port
