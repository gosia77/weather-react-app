import React, { useState, useEffect } from 'react';
import axios from 'axios';

// kelvin to celcius

function kelvinToCelsius(kelvin) {
  return (kelvin - 273.15);
}

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
        setWeatherData(response.data); 

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
          <p>Temperature: {Math.round(kelvinToCelsius(weatherData.main.temp))}°C</p>
          <p>Humidity: {weatherData.main.humidity}%</p>
          <p>Pressure: {weatherData.main.pressure}hPa</p>
          <p>Clouds: {weatherData.clouds.all}%</p>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

export default WeatherWidget;
