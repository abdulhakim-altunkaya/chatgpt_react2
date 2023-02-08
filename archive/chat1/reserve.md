import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";

function XX() {
  let[promptInput, setPromptInput] = useState("");
  let[displayText, setDisplayText] = useState("");

  const apiapi = process.env.REACT_APP_CHATGPT_API;
  const configuration = new Configuration({
      apiKey: apiapi
  })
  const openai = new OpenAIApi(configuration);
  
  const ddd = async () => {
    const response = await openai.createCompletion({
      prompt: promptInput,
      model: "text-davinci-003",
      temperature: 1,
      max_tokens: 1000
    });
    setDisplayText(response.data.choices[0].text)
  }
  


  



  const DEFAULT_PARAMS = {
    "model": "text-davinci-003",
    "temperature": 0,
    "max_tokens": 256
  }
  
  async function sendMessage(params = {}) {
    const params_ = { ...DEFAULT_PARAMS, ...params };
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(apiapi)
      },
      body: JSON.stringify(params_)
    };
    const response = await fetch('https://api.openai.com/v1/completions', requestOptions);
    const data = await response.json();
    setDisplayText(data.choices[0].text);
  }





  const handleSubmit = async (e) => {
    e.preventDefault();
    sendMessage();
  }















  
  return (
    <div className="App">
        <form action="POST" onSubmit={handleSubmit}>
            <input type="text" name="promptInput"
            value={promptInput} onChange={(e) => setPromptInput(e.target.value)}/>
            <button type="submit">GET RESPONSE</button>
        </form>
        <div>{displayText}</div>
    </div>
  );
}

export default XX;
