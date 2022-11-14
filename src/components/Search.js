import React, {useState, useEffect} from 'react';
import WeatherDetails from './WeatherDetails';

function Search() {
  const [searchTerm, setSearchTerm] = useState('Pune');
//   const [tempInfo, setTempInfo] = useState({
//     temp: '',
//     pressure: '',
//     humidity: '',
//     weatherType: '',
//     name: '',
//     speed: '',
//     country: '',
//     sunset: ''
//   });
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async() => {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=824295538de621d91873ff09903134aa`;
        let res = await fetch(url);
        let data = await res.json();
        const {temp, pressure, humidity} = data.main;
        const {main: weatherType} = data.weather[0];
        const {name} = data;
        const {speed} = data.wind;
        const {country, sunset} = data.sys;
        setTempInfo({
            temp, pressure, humidity, weatherType, name, speed, country, sunset
        });
        //let result = data.main;
        console.log(data);
    } catch(error) {
        console.log(error);
    }
  }

  useEffect(() => {
    console.log("Weather Info!!!");
    getWeatherInfo();
  }, []);
  return (
    <>
        <div className='wrap'>
            <div className="search">
                <input 
                    type='search' 
                    placeholder='Type a city name...' 
                    id='search' 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />   
                <button className='searchButton' onClick={getWeatherInfo}>
                    Search
                </button>
            </div>
        </div>
        <WeatherDetails {...tempInfo} />
    </>
  );
}
export default Search;
