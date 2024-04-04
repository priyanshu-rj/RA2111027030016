import React, { useState, useEffect } from 'react';
import './styles.css'; // Tailwind CSS 

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState('even');
  const [average, setAverage] = useState(0); // average
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzEyMTUxNjIxLCJpYXQiOjE3MTIxNTEzMjEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjMxYzIzZGQ1LWMyNDEtNDU4Yi05NDQ3LWRhOTM1ZjdlYWUxZSIsInN1YiI6InBrOTg0MUBzcm1pc3QuZWR1LmluIn0sImNvbXBhbnlOYW1lIjoicHJpeWFuc2h1U1JNIiwiY2xpZW50SUQiOiIzMWMyM2RkNS1jMjQxLTQ1OGItOTQ0Ny1kYTkzNWY3ZWFlMWUiLCJjbGllbnRTZWNyZXQiOiJpa0hkTVVCS0pnb1VMeEFHIiwib3duZXJOYW1lIjoiUHJpeWFuc2h1Iiwib3duZXJFbWFpbCI6InBrOTg0MUBzcm1pc3QuZWR1LmluIiwicm9sbE5vIjoiUkEyMTExMDI3MDMwMDE2In0.tBCGvw-7fCi5a9CtAKwA5WcwBO6yK4vJsxbvT_wuilY'; // token
//update the token beacuse it fail after every request token was expire so we face a problem of this , thats why we update the token 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/numbers/${type}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error in response');
        }
        const jsonData = await response.json();
        setData(jsonData.numbers);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [type, token]);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  useEffect(() => {
    // Calculating average
    const sum = data.reduce((acc, curr) => acc + curr, 0);
    const avg = sum / data.length;
    setAverage(avg);
  }, [data]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">Numbers</h1>
        <div className="mb-4">
          <label htmlFor="numberType" className="mr-2 text-gray-700">Select type:</label>
          <select
            id="numberType"
            value={type}
            onChange={handleTypeChange}
            className="px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="even">Even Numbers</option>
            <option value="odd">Odd Numbers</option>
            <option value="prime">Prime Numbers</option>
            <option value="fibonacci">Fibonacci Numbers</option>
            <option value="random">Random Numbers</option>
          </select>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((number, index) => (
            <li key={index} className="bg-white p-4 rounded-md shadow-md">
              <span className="text-lg font-semibold">Number:</span> {number}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Average:</h2>
          <p>{average}</p>
        </div>
      </div>
    </div>
  );
};

export default
