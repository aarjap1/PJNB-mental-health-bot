import React from 'react';
import '../css/SearchComponent.css'

const SearchComponent = ({ query, setQuery }) => {
    const handleInputChange = (event) => {
      setQuery(event.target.value);
    };
  
    return (
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search meditations"
          value={query}
          onChange={handleInputChange}
          className="searchInput"
        />
      </div>
    );
  };
  
  export default SearchComponent;