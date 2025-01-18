
import React, { useState, useEffect } from 'react';
import './Header.css';
import logoEN from '../../assets/bosta-logoEN.png';
import SearchBar from '../SearchBar/SearchBar';
import i18n from '../../i18n';

function Header() {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    localStorage.setItem('language', selectedLanguage);
    i18n.changeLanguage(selectedLanguage === 'Arabic' ? 'AR' : selectedLanguage === 'French' ? 'FR' : 'EN');
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      setLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage === 'Arabic' ? 'AR' : storedLanguage === 'French' ? 'FR' : 'EN');
    }

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <img src={logoEN} alt="Bosta Logo" className="header-logo" />
        
        <div className="header-right">
          <div className="header-search-bar">
            {isSmallScreen && <SearchBar />}
          </div>

          {/* Language dropdown */}
          <select
            className="language-dropdown"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="English">English</option>
            <option value="Arabic">عربي</option>
            <option value="French">Français</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;