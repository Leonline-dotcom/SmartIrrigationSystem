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
        console.log(`${url}/weatherinfo`)
        console.error('Error fetching weather data mate:', error);
      }
    }

    fetchWeatherData(); // inital render

    const intervalId = setInterval(fetchWeatherData, 60 * 1000); // Fetch data every 1 minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
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
            <p>
              {((weatherData.weather[0].description.includes("snow") &&
                  <p>It's going to snow, please turn off system</p>) ||
                (weatherData.weather[0].description.includes("rain") &&
                  <p>It's going to rain, please turn off system</p>) ||
                (weatherData.weather[0].description.includes("drizzle") &&
                  <p>It's going to drizzle, please turn off system</p>) ||
                <p>Enjoy your Day</p>
              )}
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;