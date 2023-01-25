// import React, { useEffect, useRef } from "react";
// import L from "leaflet";
// import { Map, TileLayer } from "react-leaflet";
// import axios from "axios";
// import "./NewMap.css";
// import "leaflet/dist/leaflet.css";

// // delete L.Icon.Default.prototype._getIconUrl;

// // L.Icon.Default.mergeOptions({
// //   iconRetinaUrl: require("./images/marker-icon-2x.png"),
// //   iconUrl: require("./images/marker-icon.png"),
// //   shadowUrl: require("./images/marker-shadow.png")
// // });


// const NewMap = () => {
//   const [weatherData, setWeatherData] = React.useState({});
//   const [coord, setCoord] = React.useState({ lat: null, lon: null });
//   const fetchData = async () => {
//     try {
//       await axios.get("http://localhost:9000/").then((res) => {
//         setWeatherData(res.data);
//         // setCoord(coord => [...coord, res.data.coord.lat,res.data.coord.lon]);
//         setCoord(res.data.coord);
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const mapRef = useRef();

//   useEffect(() => {
//     const { current = {} } = mapRef;
//     const { leafletElement: map } = current;

//     if (!map) return;

//     const parksGeoJson = new L.GeoJSON(weatherData.coord, {
//       onEachFeature: (feature = {}, layer) => {
//         const { properties = {} } = feature;
//         const { Name } = properties;

//         if (!Name) return;

//         layer.bindPopup(`<p>${Name}</p>`);
//       }
//     });

//     parksGeoJson.addTo(map);
//   }, []);
//   return (
//     <div className="main-content">
//       <Map ref={mapRef} center={[39.5, -98.35]} zoom={4}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//       </Map>
//     </div>
//   );
// };

// export default NewMap;
