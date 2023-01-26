const express = require("express"); //importing express
const request = require("request"); //importing request
const cors = require("cors"); //importing cors

const app = express(); //creating an express app
require("dotenv").config(); //importing dotenv and configuring

app.use(cors()); //cors is used to allow cross origin requests

const api_key = `${process.env.API_KEY}`; //api key is stored in .env file

const cities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Surat",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Patna",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Vadodara",
  "Firozabad",
  "Ludhiana",
  "Rajkot",
  "Agra",
  "Siliguri",
  "Nashik",
  "Faridabad",
  "Patiala",
  "Meerut",
  "Rourkela",
  "Bhubaneswar"
]; //list of cities

const WeatherData = []; //array to store weather data

let requests = cities.map((city) => {
  //map function is used to iterate over the array of cities
  return new Promise((resolve, reject) => {
    //promise is used to handle asynchronous operations
    request(
      {
        uri: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`, //api call
        method: "GET" //method is GET
      },
      (err, res, body) => {
        if (err) {
          reject(err); //rejecting the promise if there is an error
        }
        resolve(body); //resolving the promise if there is no error
      }
    );
  });
});

app.get("/_offset=:offset&_limit=:limit", (req, res) => {
  const offset = parseInt(req.params.offset); //offset and limit are the parameters
  const limit = parseInt(req.params.limit);
  const final = offset + limit;
  Promise.all(requests) //promise.all is used to handle multiple promises
    .then((body) => {
      body.forEach((res) => {
        if (res) {
          WeatherData.push(JSON.parse(res)); //pushing the data into the array
        }
      });
      res.send(WeatherData.slice(offset, final)); //sending the data to the client
    })
    .catch((err) => {
      console.log(err);
    });
});

const port = process.env.PORT || 9000; //port is 9000 or process.env.port

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is up on port ${port}`);
  }
}); //server is running on port 9000 or process.env.port
