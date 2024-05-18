import chat from '../assets/images/chat.png';
import meditate from '../assets/images/meditation.png';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "../css/Meditate.css";

const Meditate = () => {

  const [timer, setTimer] = useState("00:59");

  useEffect(() => {
    const interval = setInterval(() => {
      // Split the current timer value into minutes and seconds
      const [minutes, seconds] = timer.split(":").map(Number);

      // Update the timer
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval); // Stop the timer when it reaches 00:00
      } else if (seconds === 0) {
        setTimer(`${minutes - 1 < 10 ? '0' : ''}${minutes - 1}:59`); // Decrease minutes and reset seconds to 59
      } else {
        setTimer(`${minutes < 10 ? '0' : ''}${minutes}:${seconds - 1 < 10 ? '0' : ''}${seconds - 1}`); // Decrease seconds
      }
    }, 1000); // Update timer every second

    return () => clearInterval(interval); // Clean up the interval
  }, [timer]); // Re-run effect when timer state changes

  return <>
  <div className='meditatePage'>
    <Link to="/">
    <div className='backImage'>
      <img src={chat} alt="" />
      </div>
    </Link>
    <div className='meditateImage'><img src={meditate} alt="" /></div>
    <div className='timerContainer'>
      {timer}
    </div>
  </div>
    
  </>;
};

export default Meditate;
