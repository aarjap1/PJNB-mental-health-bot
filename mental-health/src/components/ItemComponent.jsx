import React from 'react';
import { Link } from 'react-router-dom';

const ItemComponent = ({ meditationName }) => {
  return (
    <div className='meditationItem'>
      {meditationName}

      <Link to={{
        pathname: "/meditate",
        state: { meditationName: meditationName }
      }}>
        <div className="goToMedBtn">Go to Meditation</div></Link>
      
    </div>
  );
};

export default ItemComponent;
