import Chatbox from "../components/Chatbox";
import { useState } from "react";
import { Link } from "react-router-dom";
import guidedBreathing from "../assets/images/guidedBreathing.png";
import send from "../assets/images/send.png";
import logo from "../assets/images/logo.png";
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
    <>
      <Link to="/meditate">
        <img
          className="guidedBreathingImg"
          src={guidedBreathing}
          alt="guided breathing"
        />
      </Link>
    </>
  );
};

export default Chatbot;
