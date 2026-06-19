function WeatherCard({ weather }) {
  return (
    <section className="mx-auto mt-10 w-full max-w-xl rounded-3xl border border-white/30 bg-white/20 p-6 text-white shadow-2xl backdrop-blur-lg sm:p-8">
      <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm text-blue-100">
            Current Weather
          </p>

          <h2 className="mt-1 text-3xl font-bold">
            {weather.city}, {weather.country}
          </h2>

          <p className="mt-2 text-lg text-blue-100">
            {weather.condition}
          </p>
        </div>

        <div className="text-center">
          <div className="text-7xl" aria-hidden="true">
            ⛅
          </div>

          <p className="mt-2 text-5xl font-bold">
            {weather.temperature}°C
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <article className="rounded-2xl bg-white/15 p-4 text-center">
          <p className="text-sm text-blue-100">
            Feels Like
          </p>

          <p className="mt-1 text-xl font-semibold">
            {weather.feelsLike}°C
          </p>
        </article>

        <article className="rounded-2xl bg-white/15 p-4 text-center">
          <p className="text-sm text-blue-100">
            Humidity
          </p>

          <p className="mt-1 text-xl font-semibold">
            {weather.humidity}%
          </p>
        </article>

        <article className="rounded-2xl bg-white/15 p-4 text-center">
          <p className="text-sm text-blue-100">
            Wind Speed
          </p>

          <p className="mt-1 text-xl font-semibold">
            {weather.windSpeed} km/h
          </p>
        </article>
      </div>
    </section>
  );
}

export default WeatherCard;