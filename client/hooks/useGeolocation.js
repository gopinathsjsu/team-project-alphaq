import { useEffect, useState } from 'react';

export const useGeolocation = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const successHandler = (position) => {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    };

    const errorHandler = (error) => {
      setError(error.message);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const watchId = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options,
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { position, error };
};
