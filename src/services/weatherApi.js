const GEOCODING_API =
  "https://geocoding-api.open-meteo.com/v1/search";

const FORECAST_API =
  "https://api.open-meteo.com/v1/forecast";

export async function getWeatherByCity(city) {
  // Find city latitude and longitude
  const locationResponse = await fetch(
    `${GEOCODING_API}?name=${encodeURIComponent(
      city
    )}&count=1&language=en&format=json`
  );

  if (!locationResponse.ok) {
    throw new Error("Unable to search city");
  }

  const locationData = await locationResponse.json();

  if (!locationData.results || locationData.results.length === 0) {
    throw new Error("City not found");
  }

  const location = locationData.results[0];

  const weatherUrl =
    `${FORECAST_API}` +
    `?latitude=${location.latitude}` +
    `&longitude=${location.longitude}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m` +
    `&timezone=auto`;

  // Fetch current weather
  const weatherResponse = await fetch(weatherUrl);

  if (!weatherResponse.ok) {
    throw new Error("Unable to fetch weather");
  }

  const weatherData = await weatherResponse.json();
  const current = weatherData.current;

  return {
    city: location.name,
    country: location.country,
    temperature: Math.round(current.temperature_2m),
    feelsLike: Math.round(current.apparent_temperature),
    humidity: current.relative_humidity_2m,
    windSpeed: Math.round(current.wind_speed_10m),
    weatherCode: current.weather_code,
  };
}