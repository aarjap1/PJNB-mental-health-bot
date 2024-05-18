import Chatbox from "../components/Chatbox";
import { useState } from "react";
import { Link } from "react-router-dom";
import guidedBreathing from '../assets/images/guidedBreathing.png';
import send from '../assets/images/send.png';
import "../css/Meditate.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isSender: true }]);
      setInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-list">
        {messages.map((msg, index) => (
          <Chatbox key={index} message={msg.text} isSender={msg.isSender} />
        ))}
      </div>
      <div className="input-container">
        <Link to="/meditate"><img className="guidedBreathingImg" src= {guidedBreathing} alt="guided breathing" /></Link>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
        />
        <img className="sendBtn" src= {send} alt="guided breathing" onClick={handleSend}/>
      </div>
    </div>
  );
};

export default Chatbot;
