import { useState, useEffect } from 'react';

const useCurrentLocation = (onLocationFetched) => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [locationError, setLocationError] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    const success = (position) => {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      setLocation(coords);
      setLocationError(null);
      if (onLocationFetched) {
        onLocationFetched(coords);
      }
    };

    const error = () => {
      setLocationError('Unable to retrieve your location');
    };

    navigator.geolocation.getCurrentPosition(success, error);
  };

  return { location, locationError, getLocation };
};

export default useCurrentLocation;
