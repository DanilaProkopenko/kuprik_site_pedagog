import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import Logo from '../assets/logo-2.svg';
import '../styles/main.css';

const Header = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <header className="header">
      <div className="header-content">
        <img src={Logo} alt="Logo" className="logo" />
        <button onClick={toggleLanguage} className="language-switcher">
          {language === 'ru' ? 'EN' : 'RU'}
        </button>
      </div>
    </header>
  );
};

export default Header;