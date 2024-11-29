import { useEffect, useState } from "react";
import Forecast from "./components/Forecast";
import Input from "./components/Input";
import TempAndDetails from "./components/TempAndDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopBar from "./components/TopBar";
import "./index.css";
import getFormattedWeatherData from "./services/weatherService";
function App() {
  const [query, setQuery] = useState({ q: "paris" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [city,setCity] = useState("")
  
  const getWeather = async () => {
    try {
      const data = await getFormattedWeatherData({ ...query, units });
      if (data.cod === "404") {
        alert("City not found. Please try again.")
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      console.error("Error fetching weather data:", err);
      alert("City not found. Please try again.")
      setWeather(null);
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const dynamicBackground = () => {
    if (!weather) return ` from-cyan-600 to-blue-700`;
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return ` from-cyan-600 to-blue-700`;
    return ` from-yellow-600 to-orange-700`;
  };

  return (
    <div
      className={`mx-auto max-w-screen-lg mt-4 py-5 pb-7 px-32 bg-gradient-to-br
    shadow-xl shadow-gray-400 rounded-3xl${dynamicBackground()}`}
    >
      <TopBar setQuery={setQuery} setCity={setCity} />
      <Input setQuery={setQuery} setUnits={setUnits} city={city} setCity={setCity} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempAndDetails weather={weather} units={units} />
          <Forecast
            title="3 hour step forecast"
            data={weather.hourly}
            units={units}
          />
          <Forecast title="daily forecast" data={weather.daily} units={units} />
        </>
      )}
    </div>
  );
}

export default App;
