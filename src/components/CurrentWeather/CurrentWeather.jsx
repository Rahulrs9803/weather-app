
import React from 'react';
import './CurrentWeather.css';
import { formatDateTime } from '../../utils/dateTime';

const CurrentWeather = ({ weatherData, unit }) => {
  const { name, sys, main, weather, wind, dt } = weatherData;
  const temperature = main.temp.toFixed(1);
  const realFeel = main.feels_like.toFixed(1);
  const humidity = main.humidity;
  const windSpeed = wind.speed.toFixed(1);
  const weatherCondition = weather[0].description;
  const weatherIcon = `http://openweathermap.org/img/wn/${weather[0].icon}.png`;
  const formattedDateTime = formatDateTime(dt);

  return (
    <div className="current-weather">
      <h2>
        {name}, {sys.country}
      </h2>
      <p>{formattedDateTime}</p>
      <img src={weatherIcon} alt={weatherCondition} />
      <p className='weather-condition'>{weatherCondition}</p>
      <p>Temperature: {temperature}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p>Real Feel: {realFeel}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p>Humidity: {humidity}%</p>
      <p>Wind Speed: {windSpeed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
    </div>
  );
};

export default CurrentWeather;
