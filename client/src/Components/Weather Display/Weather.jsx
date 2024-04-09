import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './Weather.css';
const url ="http://10.145.229.146:5001";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await axios.get(`${url}/weatherinfo`);
        console.log("fetched data:", response.data)
        const data = await response.data;
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data mate:', error);
      }
    }

    fetchWeatherData();
  }, []);

  return (
    <div className='weather_module'>
      {weatherData && (
        <>
          <div className='city'>
            <p>{weatherData.name}</p>
          </div>
          <div className='temp'>
            <h1>{Math.round(weatherData.main.temp)}°F</h1>
          </div>
          <div className='description'>
            <p>{weatherData.weather[0].description}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;