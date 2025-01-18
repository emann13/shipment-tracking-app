import React, { useState, useEffect } from 'react';
import './Header.css';
import logoEN from '../../assets/bosta-logoEN.png';
import SearchBar from '../SearchBar/SearchBar';

function Header({}) {
  const [language, setLanguage] = useState('English');
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  useEffect(() => {
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
        
        {isSmallScreen && <SearchBar />}
        
        <div className="header-right">
          {/* Language dropdown */}
          <select
            className="language-dropdown"
            value={language}
            onChange={handleLanguageChange}
          >
            <option value="English">English</option>
            <option value="Arabic">العربية</option>
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;
