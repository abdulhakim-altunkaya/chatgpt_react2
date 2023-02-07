import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

function App() {
  let[promptInput, setPromptInput] = useState("");
  let[displayText, setDisplayText] = useState("");

  const apiapi = process.env.REACT_APP_CHATGPT_API;
  const configuration = new Configuration({
      apiKey: apiapi
  })
  const openai = new OpenAIApi(configuration);
  
  const sendMessage = async () => {
    const response = await openai.createCompletion({
      prompt: promptInput,
      model: "text-davinci-003",
      temperature: 1,
      max_tokens: 1000
    });
    setDisplayText(response.data.choices[0].text)
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendMessage();
  }
  
  
  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
            <input type="text" name="promptInput"
            value={promptInput} onChange={(e) => setPromptInput(e.target.value)}/>
            <button type="submit">GET RESPONSE</button>
        </form>
        <div>{displayText}</div>
    </div>
  );
}

export default App;
