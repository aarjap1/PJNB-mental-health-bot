import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import chat from "../assets/images/chat.png";
import meditate from "../assets/images/meditation.png";
import alarmSound from "../assets/sounds/alarm.mp3";

const Meditate = () => {
  const [timer, setTimer] = useState("00 : 59");

  useEffect(() => {
    let timerInterval;

    const startTimer = () => {
      const totalTime = 59;
      let currentTime = totalTime;

      timerInterval = setInterval(() => {
        const minutes = Math.floor(currentTime / 60)
          .toString()
          .padStart(2, "0");
        const seconds = (currentTime % 60).toString().padStart(2, "0");
        setTimer(`${minutes} : ${seconds}`);

        if (currentTime === 0) {
          clearInterval(timerInterval);
          playAlarm();
        } else {
          currentTime -= 1;
        }
      }, 1000);
    };

    startTimer();

    return () => clearInterval(timerInterval);
  }, []);

  const playAlarm = () => {
    const audio = new Audio(alarmSound);
    audio.play();
  };

  return (
    <>
      <div className="meditatePage">
        <Link to="/">
          <div className="backImage">
            <img src={chat} className="message-icon" alt="Back to home" />
          </div>
        </Link>
        <div className="meditateImage">
          <img src={meditate} alt="Meditate" />
        </div>
        <div className="parenttimerContainer">
          <div className="timerContainer">{timer}</div>
        </div>
      </div>
    </>
  );
};

export default Meditate;
