import React, { useContext } from 'react';
import { AdminContext } from '../contexts/AdminContext';
import { LanguageContext } from '../contexts/LanguageContext';
import BurgerMenu from '../components/BurgerMenu';
import '../styles/main.css';

const About = () => {
  const { content } = useContext(AdminContext);
  const { language } = useContext(LanguageContext);
  const isMobile = window.innerWidth <= 800;

  return (
    <>
      {isMobile && <BurgerMenu />}
      <div className="page-content">
        <h1>{language === 'ru' ? 'Южный федеральный университет' : 'Southern Federal University'}</h1>
        
        <div className="about-content">
          <h2>{content.about.title[language]}</h2>
          <p>{content.about.content[language]}</p>
          
          <h3>{language === 'ru' ? 'Достижения' : 'Achievements'}</h3>
          <ul>
            {content.about.achievements.map((item, index) => (
              <li key={index}>{item[language]}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default About;