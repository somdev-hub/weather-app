import React, { useEffect, useState } from "react"; //importing usestate and useeffect
import "./ActualMap.css";
import Leaflet from "leaflet"; //using leaflet for maps
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import iconMarker from "leaflet/dist/images/marker-icon.png";
import iconRetina from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import uuid from "react-uuid"; //using uuid for unique key generation
import { AiFillCaretRight, AiFillCaretLeft } from "react-icons/ai"; //icons
import Spinner from "react-bootstrap/Spinner";

const icon = Leaflet.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40]
}); // leaflet icon setup

//the fetchData method requests the api to fetch weather data and is called by useEffect hook everytime the page changes.

const ActualMap = () => {
  const [weatherData, setWeatherData] = useState([]); //to store api data
  const [page, setPage] = useState(1); // to store current page
  const [loading, setLoading] = useState(false); //whether in loading or not
  const fetchData = async (offset, limit) => {
    setLoading(true);
    const url = `http://localhost:9000/_offset=${offset}&_limit=${limit}`;
    try {
      await axios.get(url).then((res) => {
        setWeatherData(res.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  }; //function to fetch data

  console.log(loading);
  useEffect(() => {
    //using useeffect ot call fetchData method
    const offset = (page - 1) * 5;
    fetchData(offset, 5);
    setTimeout(() => fetchData, 10000); //to refresh data
  }, [page]);

  return (
    <div className="main-container">
      {weatherData[0] === null ? (
        <div className="loading">not loaded yet</div>
      ) : (
        <MapContainer
          center={{ lat: 20.5937, lng: 78.9629 }}
          zoom={5}
          scrollWheelZoom={false}
          style={{ height: "93%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {weatherData[2] != null ? (
            weatherData.map((data) => {
              return data.weatherDetails.coord != null ? (
                <Marker
                  key={uuid()}
                  position={{
                    lat: data.weatherDetails.coord.lat,
                    lng: data.weatherDetails.coord.lon
                  }}
                  icon={icon}
                >
                  <Popup>
                    <div className="weather-title">
                      <h3>{data.city}</h3>
                      <img
                        src={`http://openweathermap.org/img/wn/${
                          data.weatherDetails.weather[0] &&
                          data.weatherDetails.weather[0].icon
                        }@2x.png`}
                        alt=""
                      />
                    </div>
                    <div className="weather-data">
                      <p style={{ margin: "0" }}>{`the temperature is ${
                        data.weatherDetails.main &&
                        data.weatherDetails.main.temp
                      }`}</p>
                      <p>
                        {`the humidity is ${
                          data.weatherDetails.main &&
                          data.weatherDetails.main.humidity
                        }`}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ) : (
                console.log("not fetched yet")
              );
            })
          ) : (
            <Spinner animation="border" variant="primary" />
          )}
        </MapContainer>
      )}
      <div className="pagination">
        <button
          className="previous-button"
          onClick={(e) => {
            page > 1 && setPage(page - 1);
            e.preventDefault();
          }}
        >
          <AiFillCaretLeft />
        </button>
        <h4>{`${page}/6`}</h4>
        <button
          disabled={loading}
          className="next-button"
          onClick={(e) => {
            page < 6 && setPage(page + 1);
            e.preventDefault();
          }}
        >
          <AiFillCaretRight />
        </button>
      </div>
    </div>
  );
};

export default ActualMap;
