import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const API_KEY = process.env.REACT_APP_API_KEY;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({ 
          prompt: input, 
          max_tokens: 1000, 
          temperature: 0.5 
        })
      });
      const json = await res.json();
      setResponse(json.choices[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={input} onChange={e => setInput(e.target.value)} />
      <button type="submit">Submit</button>
      <p>{response}</p>
    </form>
  );
}

export default App;
