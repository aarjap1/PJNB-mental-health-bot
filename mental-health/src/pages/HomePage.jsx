import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import guidedBreathing from '../assets/images/logo.png';
import '../css/HomePage.css';
import ItemComponent from '../components/ItemComponent';
import SearchComponent from '../components/SearchComponent';

const HomePage = () => {
  const [names, setNames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(''); // State to store search query
  const [filteredNames, setFilteredNames] = useState([]); // State to store filtered names

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://data-hackfest.onrender.com/names');
        setNames(response.data);
        setFilteredNames(response.data); // Initialize filteredNames with all names
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filtered = names.filter((name) =>
      name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredNames(filtered); // Update filteredNames instead of names
  };

  return (
    <>
      <div className="container">
        <div className='topBar'>
          <img
            className="guidedBreathingImg"
            src={guidedBreathing}
            alt="guided breathing"
          />
          <SearchComponent query={query} setQuery={setQuery} />
          <button className='searchButton' onClick={handleSearch}>Search</button>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <ul>
        {/* Use filtered data after search */}
        {filteredNames.map((name, index) => (
          <li key={index}>
            <ItemComponent meditationName={name} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
