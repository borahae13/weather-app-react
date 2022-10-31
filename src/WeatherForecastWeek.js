import React from "react";
import WeatherIcon from "./WeatherIcon";
import "./WeatherForecast.css";

export default function WeatherForecastWeek(props) {
  function day() {
    let date = new Date(props.data.dt * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }

  return (
    <div className="WeatherForecast">
      <div className="row">
        <div className="col-6">
          <div className="WeatherForecast-day"> {day()}</div>
          <WeatherIcon code={props.data.weather[0].icon} />
          <div className="WeatherForecast-temperatures">
            <span className="WeatherForecast-temperature-max">
              {Math.round(props.data.temp.max)}°
            </span>
            <span className="WeatherForecast-temperature-min">
              | {Math.round(props.data.temp.min)}°{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
