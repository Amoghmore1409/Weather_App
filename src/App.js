import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import cloudsImage from "./images/clouds.png";
import humidityImage from "./images/humidity.png";
import windImage from "./images/wind.png";
import drizzleImage from "./images/drizzle.png";
import snowImage from "./images/snow.png";
import rainImage from "./images/rain.png";
import clearImage from "./images/clear.png";
import mistImage from "./images/mist.png";
import searchImage from "./images/search.png";
import hazeImage from "./images/haze.png";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [weatherIcon, setWeatherIcon]= useState("");

  const apiKey = "2528dfcb91663ae323b8976a552f9b7f";

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log(response.data);

      let icon="";
      const description = response.data.weather[0].main;

      if (description === "Mist") {
        icon = mistImage;
      } else if (description === "Clouds") {
        icon = cloudsImage;
      } else if (description === "Clear") {
        icon = clearImage;
      } else if (description === "Rain") {
        icon = rainImage;
      } else if (description === "Drizzle") {
        icon = drizzleImage;
      } else if (description === "Snow") {
        icon = snowImage;
      } else if (description === "Haze") {
        icon = hazeImage;
      }


      setWeather(response.data);
      setWeatherIcon(icon);
    } catch (error) {
      console.error("Error fetching the weather data:", error);
    }
  };

  const fetchForecast = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const filteredForecast = response.data.list.filter((reading) =>
        reading.dt_txt.includes("12:00:00")
      );
      setForecast(filteredForecast);
    } catch (error) {
      console.error("Error fetching the forecast data:", error);
    }
  };

  const handleSearch = () => {
    fetchWeather();
    fetchForecast();
  };

  return (
    <div className="weather-app">
      <h1>Weatherhood</h1>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        spellCheck="false"
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <img src={weatherIcon} className="weatherIcon"></img>
          <h1>{Math.round(weather.main.temp)}°C</h1>
          <div className="details">
            <div className="col">
              <img src={humidityImage}></img>
              <div>
                <p className="humidity">{weather.main.humidity}%</p>
                <p>Humidity: </p>
              </div>
            </div>

            <div className="col">
              <img src={windImage}></img>
              <div>
                <p className="rain">{weather.wind.speed}%</p>
                <p>Rain: </p>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
      {forecast.length > 0 && (
        <div className="forecast">
          <h2>5-Day Forecast</h2>
          <div className="forecast-container">
            {forecast.map((day) => (
              <div key={day.dt} className="forecast-item">
                <p>{new Date(day.dt_txt).toLocaleDateString()}</p>

                <img
                  className="smallicon"
                  src={weatherIcon}
                  alt={`Weather icon representing ${day.weather[0].main}`}
                />
                <h3>{Math.round(day.main.temp)}°C</h3>
                <p>{weather.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;