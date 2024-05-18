import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import chat from "../assets/images/chat.png";
import meditate from "../assets/images/meditation.png";
import alarmSound from "../assets/sounds/alarm.mp3";

const Meditate = () => {
  const [timer, setTimer] = useState("00 : 59");
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(59);
  const [audio] = useState(new Audio(alarmSound));

  useEffect(() => {
    let timerInterval;

    if (isRunning) {
      timerInterval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(timerInterval);
            playAlarm();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning]);

  useEffect(() => {
    const minutes = Math.floor(currentTime / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (currentTime % 60).toString().padStart(2, "0");
    setTimer(`${minutes} : ${seconds}`);
  }, [currentTime]);

  const playAlarm = () => {
    audio.play();
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    audio.pause();
    audio.currentTime = 0;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentTime(59);
    audio.pause();
    audio.currentTime = 0;
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
        <div className="controlsContainer">
          <button
            className="button start"
            onClick={startTimer}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            className="button stop"
            onClick={stopTimer}
            disabled={!isRunning}
          >
            Stop
          </button>
          <button className="button reset" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};

export default Meditate;
