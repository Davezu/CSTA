import { useEffect, useState} from "react";
import Home from "./Home";


const List = () => {
    const [weather, setWeather]= useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const apiKey = "b1cc3ff984309b902ba7bf90b631674b";

            const response = await fetch (`https://api.openweathermap.org/data/2.5/weather?q=Manila,PH&appid=${apiKey}`);
            const data = await response.json();
            setWeather(data);
            
        }
        fetchWeather();
    }, []);
    return(
        <div>
            {weather ? (
                <div>
                    <h1>Weather in {weather.name}</h1>
                    <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p>
                    <p>Weather: {weather.weather[0].description}</p>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
}
export default List;