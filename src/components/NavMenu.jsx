import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { NavLink } from 'react-router-dom';
import '../styles/main.css';

const NavMenu = () => {
  const { language } = useContext(LanguageContext);

  const menuItems = [
    { path: '/news', ru: 'Новости', en: 'News' },
    { path: '/about', ru: 'Об авторе', en: 'About' },
    { path: '/contact', ru: 'Обратная связь', en: 'Contact' },
    { path: '/products', ru: 'Продукты и услуги', en: 'Products' }
  ];

  return (
    <nav className="nav-menu">
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink to={item.path} activeClassName="active">
              {language === 'ru' ? item.ru : item.en}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavMenu;