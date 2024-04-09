import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './Weather.css';

const url ="http://10.154.162.126:5001";

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
            <h1>{Math.round(weatherData.main.temp *(9/5) + 32)}°F</h1>
          </div>
          <div className='description'>
            <p>{weatherData.weather[0].description}</p>
          </div>
          <div className='icon'>
             
          <img alt="icon" src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} width="120" height="100" />
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;