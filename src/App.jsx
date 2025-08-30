import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "c7ba6247878b99e130c75ea008d67ffe"; 

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-400 to-indigo-600 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">🌤 Weather App</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city"
          className="p-2 rounded-xl text-black"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={fetchWeather}
          className="px-4 py-2 bg-yellow-400 text-black rounded-xl shadow-lg hover:bg-yellow-300"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-lg">Loading...</p>}
      {error && <p className="text-red-300">{error}</p>}

      {weather && (
        <div className="bg-white/20 p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-semibold">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-lg">{weather.weather[0].description}</p>
          <p className="text-4xl font-bold">{weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
