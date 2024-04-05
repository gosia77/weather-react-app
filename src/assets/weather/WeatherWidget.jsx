import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherWidget = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('useEffect', {city});
    const fetchWeatherData = async () => {
      setLoading(true);
      console.log('fetch');
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5091a8271637b49a785eb2b101fbbbf4`);
        setWeatherData(response.data); // Zakładając, że otrzymasz dane w formacie JSON

        setLoading(false);
        console.log(response);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setLoading(false);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit');
    // Wysyłamy żądanie tylko jeśli zostało wprowadzone miasto
    // if (city.trim()) {
    //   setCity(city.trim());
    // }
  };

  return (
    <div className="weather-widget">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : weatherData ? (
        <div>
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.description}</p>
          {/* Dodaj więcej danych o pogodzie według potrzeb */}
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default WeatherWidget;
