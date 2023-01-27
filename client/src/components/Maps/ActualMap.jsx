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

const icon = Leaflet.icon({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow,
  iconSize: [25, 41], // size of the icon
  iconAnchor: [10, 41], // point of the icon which will correspond to marker's location
  popupAnchor: [2, -40] // point from which the popup should open relative to the iconAnchor
}); // leaflet icon setup

//the fetchData method requests the api to fetch weather data and is called by useEffect hook everytime the page changes.

const ActualMap = () => {
  const [weatherData, setWeatherData] = useState([]); //to store api data
  const [page, setPage] = useState(1); // to store current page
  const [loading, setLoading] = useState(false); //whether in loading or not
  const fetchData = async (offset, limit) => {
    setLoading(true); //setting loading to true
    const url = `https://weather-app-backend-higr.onrender.com/_offset=${offset}&_limit=${limit}`;
    try {
      await axios.get(url).then((res) => {
        setWeatherData(res.data);
        setLoading(false); //setting loading to false
      });
    } catch (error) {
      console.log(error);
    }
  }; //function to fetch data

  useEffect(() => {
    //using useeffect ot call fetchData method
    const offset = (page - 1) * 5;
    fetchData(offset, 5);
    setTimeout(() => fetchData, 10000); //to refresh data
  }, [page]);

  return (
    <div className="main-container">
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
        {weatherData.map((data) => {
          return data.coord != null ? (
            <Marker
              key={uuid()}
              position={{
                lat: data.coord.lat,
                lng: data.coord.lon
              }}
              icon={icon}
            >
              <Popup>
                <div className="weather-title">
                  <h3>{data.name}</h3>
                  <img
                    src={`http://openweathermap.org/img/wn/${
                      data.weather[0] && data.weather[0].icon
                    }@2x.png`}
                    alt=""
                  />
                </div>
                <div className="weather-data">
                  <p style={{ margin: "0" }}>{`the temperature is ${
                    data.main && data.main.temp
                  }`}</p>
                  <p>{`the humidity is ${data.main && data.main.humidity}`}</p>
                </div>
              </Popup>
            </Marker>
          ) : (
            console.log("not fetched yet")
          );
        })}
      </MapContainer>
      <div className="pagination">
        <button
          disabled={loading || page === 1}
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
          disabled={loading || page === 6}
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
