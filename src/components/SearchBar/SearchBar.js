import React, { useState } from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import useTrackingStore from '../../store/TrackingStore';

function SearchBar() {
  const { fetchTrackingDetails, loading } = useTrackingStore();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false); // To toggle the search box in smaller screens

  const handleSearch = () => {
    if (trackingNumber.trim() === '') {
      alert('Please enter a tracking number.');
      return;
    }
    fetchTrackingDetails(trackingNumber);
    setIsSearchOpen(false); // Close the modal after search
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); // Toggle the search box
  };

  return (
    <div className="search-bar">
      {window.innerWidth > 768 ? ( 
        <div className="search-container">
          <div className="search-icon-container">
            <button
              className="search-button"
              onClick={handleSearch}
              title="Search"
              disabled={loading}
            >
              {loading ? 'Loading...' :           
              <SearchIcon  className="search-icon" />
            }
            </button>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder="Enter your tracking number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
          />
          {window.innerWidth <= 768 && (
            <button className="close-button" onClick={toggleSearch}>
              <CloseIcon />
            </button>
          )}
        </div>
      ) : (
        <button className="icon-only-button" onClick={toggleSearch}>
          <SearchIcon sx={{ color: "black" }} className="search-icon" />
        </button>
      )}

      {/* Transparent Overlay for smaller screens */}
      {isSearchOpen && window.innerWidth <= 768 && (
        <div className="search-popup-overlay">
          <div className="search-popup">
            <input
              type="text"
              className="search-input"
              placeholder="Enter your tracking number"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <button
              className="search-button"
              onClick={handleSearch}
              title="Search"
              disabled={loading}
            >
              {loading ? 'Loading' : 'Search'}
            </button>
            <button className="close-button" onClick={toggleSearch}>
              <CloseIcon />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
