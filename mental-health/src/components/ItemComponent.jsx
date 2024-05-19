import React from 'react';
import { Link } from 'react-router-dom';
import '../css/ItemComponent.css'; // Import the CSS file for styling
import send from '../assets/images/send.png';

const MeditationItem = ({ meditationName }) => {
  return (
    <div className='meditationItem'>
      <div className="content">
        <h2 className="meditationName">{meditationName}</h2>
        <div className="linkContainer">
          <Link to="/meditate" state={{ meditationName: meditationName }}>
            <img className='sendBtn' src={send}/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MeditationItem;
