import React, { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import '../styles/main.css';

const Footer = () => {
  const { language } = useContext(LanguageContext);

  return (
    <footer className="footer">
      <div className="footer-content">
        {language === 'ru' ? (
          <p>© 2025 Сайт педагога. Все права защищены.</p>
        ) : (
          <p>© 2025 Teacher's Website. All rights reserved.</p>
        )}
        <p>Контакты: teacher@example.com</p>
      </div>
    </footer>
  );
};

export default Footer;