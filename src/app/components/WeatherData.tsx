import { useEffect, useState } from 'react';

interface MyResponseType {
  // Define the structure of your response data here
  id: number;
  name: string;
  // Add more fields as per your API response
}

const WeatherData = () => {
  const [data, setData] = useState<MyResponseType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/your-endpoint')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: MyResponseType) => {
        setData(data);
        setLoading(false);
      })
      .catch((error: Error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Data from API</h2>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default WeatherData;
