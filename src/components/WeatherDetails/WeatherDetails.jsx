import React from 'react'
import "./WeatherDetails.css";

const WeatherDetails = ({ weatherData }) => {
    if(!weatherData) return null;

    const { main, wind, clouds, sys } = weatherData;

  return (
    <div className='weather-details'>
        <h3>Weather Details</h3>
        <p>Pressure: {main.pressure} hPa</p>
        <p>Cloudiness: {clouds.all}%</p>
        <p>Sunrise: {new Date(sys.sunrise * 1000).toLocaleDateString()}</p>
        <p>Sunset: {new Date(sys.sunset * 1000).toLocaleDateString()}</p>
    </div>
  )
}

export default WeatherDetails