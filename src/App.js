import React, { useState, useEffect } from 'react';
import './styles.css'; //Tailwind CSS 

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [type, setType] = useState('even'); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://20.244.56.144/test/${type}`); //every request we face a problem of token expire please resolve it .
        if (!response.ok) {
          throw new Error('Error in response');
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [type]); 

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  if (loading) {
    return <div className="text-center mt-5">Loading..</div>;
  }

  if (error) {
    return <div className="text-center mt-5">Error: {error}</div>;
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
      </div>
    </div>
  );
};

export default App;
