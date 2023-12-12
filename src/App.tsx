import { useState } from "react";
import useOpenAIChat from "./shared/openai/hooks/use-openai-chat";
import gifFile from './bronya.gif'; // Import the GIF file
import './App.css';

function App() {
  const [completeText, messages] = useOpenAIChat();
  const [userInput, setUserInput] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevents form submission
      completeText(userInput);
    }
  }

  return (
    <div className="app-container">
      <img src={gifFile} className="gif-player"/>
      <div className="chat-window">
        <div className="message-area">
          {messages.filter((val) => val.role !== 'system').map(({content, role}, idx) => 
            typeof content === 'string' 
            ? <p key={idx} className={role === 'user' ? 'user-message' : 'helper-message'}>{role === 'user' ? 'You' : 'DnD Helper'}: {content}</p> 
            : '')}
        </div>
        <div className="chat-input-area">
          <input className="chat-input" onChange={(e) => {setUserInput(e.target.value)}} onKeyDown={handleKeyDown}/>
          <button className="send-button" onClick={() => {
            completeText(userInput)
          }}>&rarr;</button>
        </div>
      </div>
    </div>
  )
}

export default App
