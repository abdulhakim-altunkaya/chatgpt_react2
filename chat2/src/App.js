import { Configuration, OpenAIApi } from "openai";
import { useEffect, useState } from "react";

function App() {
  let [prompt, setPrompt] = useState("");
  let [response, setResponse] = useState("hello");

  const api = process.env.REACT_APP_CHATGPT_API;
  const configuration = new Configuration({
    apiKey: api
  });
  const openai = new OpenAIApi(configuration);
  const sendMessage = async () => {
    const response = await openai.createCompletion({
      prompt: "how are you?",
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 1000,
    })
    const message = response.data.choices[0].text
    setResponse(message);
  }

  useEffect(() => {
    sendMessage();
  }, [])
  

  return (
    <div className="App">
      <form>
        <textarea name="prompt" 
        id="prompt" 
        cols="30" rows="10"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}></textarea>
        <button>SUBMIT</button>
      </form>
      <div>{response}</div>
    </div>
  );
}

export default App;
