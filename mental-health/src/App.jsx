import "./App.css";
import HomePage from "./pages/HomePage";
import Meditate from "./pages/Meditate";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/meditate" element={<Meditate />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
