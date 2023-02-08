import React, { useState } from "react";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_API_KEY,
});
const openai = new OpenAIApi(configuration);

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("null");

  async function handleSubmit(event) {
    event.preventDefault();

    const apiResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      temperature: 0,
      max_tokens: 100,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["\n"],
    });

    setResponse(apiResponse.data.choices[0].text);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <div>{response}</div>
    </div>
  );
}

export default App;
