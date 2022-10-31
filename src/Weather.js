import React, { useState } from "react";
import FormattedDate from "./FormattedDate";
import axios from "axios";
import "./Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  function handleResponse(response) {
    console.log(response.data);
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: "",
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }

  if (weatherData.ready) {
    return (
      <div className="container">
        <div className="weather-app-wrapper">
          <div className="weather-app">
            <form id="search-form" class="mb-3">
              <div className="row">
                <div className="col-9">
                  <input
                    type="search"
                    placeholder="Enter a city..."
                    className="form-control"
                    id="city-input"
                    autocomplete="off"
                  />
                </div>
                <div className="col-3">
                  <input
                    type="submit"
                    value="Search"
                    className="btn btn-primary w-100"
                  />
                </div>
              </div>
            </form>
            <div className="overview">
              <h1 id="city">{weatherData.city}</h1>
              <ul>
                <li id="subheading">
                  Last updated:{" "}
                  <span id="date">
                    <FormattedDate date={weatherData.date} />
                  </span>
                </li>
                <li id="description">{weatherData.description}</li>
              </ul>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="d-flex weather-temperature">
                  <img
                    src={weatherData.icon}
                    alt={weatherData.description}
                    className="float-left"
                    id="icon"
                  />
                  <div className="float-left">
                    <strong id="temperature">
                      {Math.round(weatherData.temperature)}
                    </strong>
                    <span className="units">°F</span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <ul>
                  <li>
                    Humidity: <span id="humidity">{weatherData.humidity}</span>%
                  </li>
                  <li>
                    Wind: <span id="wind">{weatherData.wind}</span> mph
                  </li>
                </ul>
              </div>
            </div>
            <div className="weather-forecast" id="forecast"></div>
          </div>
        </div>
      </div>
    );
  } else {
    const apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);

    return "Loading...";
  }
}
