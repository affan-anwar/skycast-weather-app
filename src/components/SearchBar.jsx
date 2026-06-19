import { useState } from "react";

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const cityName = city.trim();

    if (cityName === "") {
      return;
    }

    onSearch(cityName);
    setCity("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row"
    >
      <input
        type="text"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Enter city name"
        className="w-full rounded-xl border border-gray-300 bg-white px-5 py-3 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
      />

      <button
        type="submit"
        className="rounded-xl bg-blue-700 px-7 py-3 font-semibold text-white transition hover:bg-blue-800"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;