import React, { useState, useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { NavLink } from 'react-router-dom';
import '../styles/mobile.css';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useContext(LanguageContext);

  const menuItems = [
    { path: '/news', ru: 'Новости', en: 'News' },
    { path: '/about', ru: 'Об авторе', en: 'About' },
    { path: '/contact', ru: 'Обратная связь', en: 'Contact' },
    { path: '/products', ru: 'Продукты и услуги', en: 'Products' }
  ];

  return (
    <div className="burger-menu">
      <button 
        className={`burger-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      {isOpen && (
        <div className="burger-nav">
          {menuItems.map((item) => (
            <NavLink 
              key={item.path}
              to={item.path}
              activeClassName="active"
              onClick={() => setIsOpen(false)}
            >
              {language === 'ru' ? item.ru : item.en}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default BurgerMenu;