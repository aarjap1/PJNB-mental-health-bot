import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  // Ensure axios is correctly imported
import guidedBreathing from '../assets/images/guidedBreathing.png';
import '../css/HomePage.css';
import ItemComponent from '../components/ItemComponent';

const HomePage = () => {
  const [names, setNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/names');
        setNames(response.data);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);  // Log the error
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Link to="/meditate">
        <img
          className="guidedBreathingImg"
          src={guidedBreathing}
          alt="guided breathing"
        />
      </Link>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {names.map((name, index) => (
          <li key={index}><ItemComponent meditationName={name} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
