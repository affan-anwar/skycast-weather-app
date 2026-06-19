import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { getWeatherByCity } from "./services/weatherApi";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function getWeatherCondition(code) {
    if (code === 0) {
      return "Clear Sky";
    }

    if (code === 1 || code === 2 || code === 3) {
      return "Partly Cloudy";
    }

    if (code === 45 || code === 48) {
      return "Foggy";
    }

    if (code >= 51 && code <= 57) {
      return "Drizzle";
    }

    if (code >= 61 && code <= 67) {
      return "Rainy";
    }

    if (code >= 71 && code <= 77) {
      return "Snowy";
    }

    if (code >= 80 && code <= 82) {
      return "Rain Showers";
    }

    if (code >= 95 && code <= 99) {
      return "Thunderstorm";
    }

    return "Unknown Weather";
  }

  async function handleSearch(cityName) {
    try {
      setLoading(true);
      setError("");

      const weatherData = await getWeatherByCity(cityName);

      setWeather({
        ...weatherData,
        condition: getWeatherCondition(weatherData.weatherCode),
      });
    } catch (error) {
      setWeather(null);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSearch("Bengaluru");
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-800 px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center text-white">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-blue-100">
            Weather Forecast
          </p>

          <h1 className="text-4xl font-bold sm:text-5xl">
            SkyCast
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Search any city and check its current weather conditions.
          </p>
        </header>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <p className="mt-10 text-center text-lg font-semibold text-white">
            Loading weather...
          </p>
        )}

        {error && (
          <p className="mx-auto mt-10 max-w-xl rounded-xl bg-red-100 px-5 py-4 text-center font-semibold text-red-700">
            {error}
          </p>
        )}

        {!loading && !error && weather && (
          <WeatherCard weather={weather} />
        )}
      </div>
    </main>
  );
}

export default App;