import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import chat from "../assets/images/chat.png";
import meditate from "../assets/images/meditation.png";
import alarmSound from "../assets/sounds/alarm.mp3";
import calmMusic from "../assets/sounds/calmMusic.mp3";
import axios from 'axios';  // Ensure axios is correctly imported
import '../css/Meditate.css'
import Typography from '@mui/material/Typography';

const Meditate = () => {
  const [timer, setTimer] = useState("15 : 00");
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(900);
  const [alarmAudio] = useState(new Audio(alarmSound));
  const [calmMusicAudio] = useState(new Audio(calmMusic));
  const location = useLocation();
  // Access the meditationName prop from the location state
  const [instructions, setInstructions] = useState("");
  const [time, setTime] = useState("00:00");
  const [meditationName, setMeditationName] = useState("");

  useEffect(() => {
    let timerInterval;

    if (isRunning && currentTime > 0) {
      calmMusicAudio.play();
      timerInterval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            playAlarm();
            calmMusicAudio.pause();
            calmMusicAudio.currentTime = 0;
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isRunning]);

  useEffect(() => {
    const meditationNameTem = location.state.meditationName;
    setMeditationName(meditationNameTem);
    const encodedName = encodeURIComponent(meditationNameTem);
    axios.get(`https://data-hackfest.onrender.com/meditation/${encodedName}`)
      .then(response => {
        console.log(response.data.instructions)
        setInstructions(response.data.instructions);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    const minutes = Math.floor(currentTime / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (currentTime % 60).toString().padStart(2, "0");
    setTimer(`${minutes} : ${seconds}`);
  }, [currentTime]);

  const playAlarm = () => {
    alarmAudio.play();
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    calmMusicAudio.pause();
    calmMusicAudio.currentTime = 0;
  };

  const resetTimer = () => {
    setIsRunning(false);
    setCurrentTime(900);
    alarmAudio.pause();
    alarmAudio.currentTime = 0;
    calmMusicAudio.pause();
    calmMusicAudio.currentTime = 0;
  };

  const stopMusicAndTimer = () => {
    stopTimer();
    calmMusicAudio.pause();
    calmMusicAudio.currentTime = 0;
  };

  return (
    <>
      <div className="meditatePage">
        <Link to="/" onClick={stopMusicAndTimer}>
          <div className="backImage">
            <img src={chat} className="message-icon" alt="Back to home" />
          </div>
        </Link>
        <div className="meditationName">
          <h1>{meditationName}</h1>
        </div>
        <div className="meditateImage">
          <img src={meditate} alt="Meditate" />
        </div>
        <Typography variant="body1" gutterBottom className="instructionBody">
          {instructions}
        </Typography>
        <div className="controlsContainer">
          <button
            className="button start"
            onClick={startTimer}
            disabled={isRunning || currentTime === 0}
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
        <div className="parenttimerContainer">
          <div className="timerContainer">{timer}</div>
        </div>
      </div>
    </>
  );
};

export default Meditate;
