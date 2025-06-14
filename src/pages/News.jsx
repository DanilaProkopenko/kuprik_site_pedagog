import React, { useContext } from 'react';
import { AdminContext } from '../contexts/AdminContext';
import { LanguageContext } from '../contexts/LanguageContext';
import BurgerMenu from '../components/BurgerMenu';
import '../styles/main.css';

const News = () => {
  const { content } = useContext(AdminContext);
  const { language } = useContext(LanguageContext);
  const isMobile = window.innerWidth <= 800;

  return (
    <>
      {isMobile && <BurgerMenu />}
      <div className="page-content">
        <h1>{language === 'ru' ? 'Отличная новость.' : 'Great news.'}</h1>
        <p className='title-caption'>{language === 'ru' ? 'Уже тепло!' : "It's already warm!"}</p>
        
        {content.news.map((item, index) => (
          <div key={index} className="news-item">
            <h2>{item.title[language]}</h2>
            <p>{item.content[language]}</p>
            <small>{new Date(item.date).toLocaleDateString()}</small>
          </div>
        ))}
      </div>
    </>
  );
};

export default News;