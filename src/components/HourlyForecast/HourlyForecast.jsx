import React from 'react';
import './HourlyForecast.css';
import { formatDateTime } from '../../utils/dateTime';

const HourlyForecast = ({ forecastData, unit }) => {
  const today = new Date().toLocaleDateString();

  const todayForecast = forecastData.filter((entry) => {
    const entryDate = new Date(entry.dt * 1000).toLocaleDateString();
    return entryDate === today;
  });

  return (
    <div className="hourly-forecast">
      <h3>Today's Forecast</h3>
      <div className="hourly-forecast-grid">
        {todayForecast.map((entry, index) => (
          <div key={index} className="hourly-forecast-item">
            <p>{formatDateTime(entry.dt)}</p>
            <img src={`http://openweathermap.org/img/wn/${entry.weather[0].icon}.png`} alt={entry.weather[0].description} />
            <p>{entry.main.temp.toFixed(1)}°{unit === 'metric' ? 'C' : 'F'}</p>
            <p>{entry.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
