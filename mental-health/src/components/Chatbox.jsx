import "../css/Chatbot.css";

const Chatbox = ({ message, isSender }) => {
  return (
    <div className={`message-item ${!isSender ? "sender" : "receiver"}`}>
      <p>{message}</p>
    </div>
  );
};


export default Chatbox;
