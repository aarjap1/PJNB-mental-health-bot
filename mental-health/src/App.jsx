import "./App.css";
import Chatbox from "./components/Chatbox";
import Chatbot from "./pages/Chatbot";
import Meditate from "./pages/Meditate";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<Chatbot />} />
          <Route path="/meditate" element={<Meditate />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
