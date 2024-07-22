import { useEffect, useState } from 'react';

interface WeatherResponseType {
  temperature: string;
  description: string;
}

const WeatherData = () => {
  const [city, setCity] = useState<string>('');
  const [data, setData] = useState<WeatherResponseType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchWeather = (city: string) => {
    setLoading(true);
    setError(null);
    fetch(`http://localhost:8080/v1/weather/${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: WeatherResponseType) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error);
        setLoading(false);
      });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (city) {
      fetchWeather(city);
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Check Weather</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="p-3 border border-gray-300 rounded-lg w-full mb-4 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-200 w-full"
        >
          Get Weather
        </button>
      </form>

      {loading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">Error: {error.message}</div>}
      {data && (
        <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 mt-4 w-full">
          <h3 className="text-lg font-bold mb-2">Weather in {city}</h3>
          <p className="mb-1">Temperature: {data.temperature}</p>
          <p>Description: {data.description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherData;
