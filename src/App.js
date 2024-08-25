import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post('https://basic-api-4skn.vercel.app/bfhl', parsedInput);
      setResponse(res.data);
    } catch (error) {
      console.error('Error:', error);
      alert('Invalid JSON or server error.');
    }
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const renderResponse = () => {
    if (!response) return null;

    switch (selectedOption) {
      case 'Alphabets':
        return <pre>{JSON.stringify(response.alphabets, null, 2)}</pre>;
      case 'Numbers':
        return <pre>{JSON.stringify(response.numbers, null, 2)}</pre>;
      case 'Highest lowercase alphabet':
        return <pre>{JSON.stringify(response.highest_lowercase_alphabet, null, 2)}</pre>;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Frontend Application</h1>
        <textarea
          rows="4"
          cols="50"
          placeholder="Enter JSON here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
        <select onChange={handleSelectChange}>
          <option value="">Select an option</option>
          <option value="Alphabets">Alphabets</option>
          <option value="Numbers">Numbers</option>
          <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
        </select>
        {renderResponse()}
      </header>
    </div>
  );
}

export default App;
