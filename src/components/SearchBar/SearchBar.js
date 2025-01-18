import React, { useState } from 'react';
import './SearchBar.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import useTrackingStore from '../../store/TrackingStore';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function SearchBar() {
  const { t } = useTranslation();
  const { fetchTrackingDetails, loading } = useTrackingStore();
  const [trackingNumber, setTrackingNumber] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearch = () => {
    if (trackingNumber.trim() === '') {
      return toast.error(t('pleaseEnterTrackingNumber'));
    }
    fetchTrackingDetails(trackingNumber);
    setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); 
  };

  return (
    <div className="search-bar">
      {window.innerWidth > 768 ? ( 
        <div className="search-container">
          <div className="search-icon-container">
            <button
              className="search-button"
              onClick={handleSearch}
              title={t('search')}
              disabled={loading}
            >
              {loading ? t('loading') : <SearchIcon className="search-icon" />}
            </button>
          </div>
          <input
            type="text"
            className="search-input"
            placeholder={t('enterTrackingNumber')}
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

      {isSearchOpen && window.innerWidth <= 768 && (
        <div className="search-popup-overlay">
          <div className="search-popup">
            <input
              type="text"
              className="search-input"
              placeholder={t('enterTrackingNumber')}
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
            />
            <button
              className="search-button"
              onClick={handleSearch}
              title={t('search')}
              disabled={loading}
            >
              {loading ? t('loading') : t('search')}
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
