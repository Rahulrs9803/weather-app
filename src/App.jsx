import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import WeatherDetails from "./components/WeatherDetails/WeatherDetails";
import SearchBar from "./components/SearchBar/SearchBar";
import HourlyForecast from "./components/HourlyForecast/HourlyForecast";
import useCurrentLocation from "./hooks/useCurrentLocation";
import {
  getWeatherByLocation,
  getWeatherByCity,
  getForecastByLocation,
} from "./utils/api";
import "./App.css";
import History from "./components/History/History";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState(null);
  const [searchParam, setSearchParam] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const { location, locationError, getLocation } = useCurrentLocation(
    (coords) => {
      fetchWeather(coords.latitude, coords.longitude, unit);
      fetchForecast(coords.latitude, coords.longitude, unit);
    }
  );

  const fetchWeather = async (lat, lon, unit) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherByLocation(lat, lon, unit);
      setWeatherData(data);
    } catch (err) {
      setError("Failed to fetch weather data");
    }
    setLoading(false);
  };

  const fetchForecast = async (lat, lon, unit) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getForecastByLocation(lat, lon, unit);
      setForecastData(data.list);
    } catch (err) {
      setError("Failed to fetch forecast data");
    }
    setLoading(false);
  };

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    setSearchType("city");
    setSearchParam(city);

    setSearchHistory((prev) => {
      if (!Array.isArray(prev)) prev = [];
      const updatedHistory = [city, ...prev.filter((item) => item !== city)];
      return updatedHistory.slice(0, 10);
    });

    try {
      const data = await getWeatherByCity(city, unit);
      setWeatherData(data);
      const coords = { latitude: data.coord.lat, longitude: data.coord.lon };
      fetchForecast(coords.latitude, coords.longitude, unit);
    } catch (err) {
      setError("Failed to fetch weather data");
    }
    setLoading(false);
  };

  const handleGetCurrentLocation = () => {
    setSearchType("location");
    getLocation();
  };

  const handleHistoryItemClick = (city) => {
    setShowHistory(false);
    handleSearch(city);
  };

  const handleHistoryButton = () => {
    setShowHistory((prev) => !prev);
  };

  useEffect(() => {
    if (searchType === "location" && location.latitude && location.longitude) {
      fetchWeather(location.latitude, location.longitude, unit);
      fetchForecast(location.latitude, location.longitude, unit);
    } else if (searchType === "city" && searchParam) {
      handleSearch(searchParam);
    }
  }, [unit]);

  return (
    <div className="app">
      <Header
        unit={unit}
        setUnit={setUnit}
        onGetCurrentLocation={handleGetCurrentLocation}
        showHistory={showHistory}
        handleHistoryButton={handleHistoryButton}
      />
      <SearchBar onSearch={handleSearch} />
      {/* <button onClick={() => setSearchHistory((prev) => !prev)}>History</button> */}
      {
        showHistory && (
          <History
            searchHistory={searchHistory}
            handleHistoryItemClick={handleHistoryItemClick}
          />
        )
        // showHistory && (
        //   <div className='history'>
        //     <h2>Search History</h2>
        //     <ul>
        //       {
        //         searchHistory.map((city, index) => (
        //           <li key={index} onClick={() => handleHistoryItemClick(city)}>
        //             {city}
        //           </li>
        //         ))
        //       }
        //     </ul>

        //   </div>
        // )
      }
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {locationError && <p className="error">{locationError}</p>}
      {weatherData && !loading && !error && !showHistory && (
        <>
          <div className="weather">
            <CurrentWeather weatherData={weatherData} unit={unit} />
            <WeatherDetails weatherData={weatherData} />
          </div>
          {forecastData && (
            <>
              <HourlyForecast forecastData={forecastData} unit={unit} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
