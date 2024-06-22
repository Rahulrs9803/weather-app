
import axios from "axios";

const API_KEY = "2fb1907230baccecaefda117c0bd2540";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export const getWeatherByLocation = async (latitude, longitude, unit = 'metric') => {
    const response = await axios.get(`${BASE_URL}weather`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: unit,
      },
    });
    return response.data;
  };
  
  export const getWeatherByCity = async (city, unit = 'metric') => {
    const response = await axios.get(`${BASE_URL}weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: unit,
      },
    });
    return response.data;
  };

  export const getForecastByLocation = async (latitude, longitude, unit = 'metric') => {
    const response = await axios.get(`${BASE_URL}forecast`, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: API_KEY,
        units: unit,
      },
    });
    return response.data;
  };