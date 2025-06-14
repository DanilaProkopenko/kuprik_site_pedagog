import React, { useContext } from 'react';
import { AdminContext } from '../contexts/AdminContext';
import { LanguageContext } from '../contexts/LanguageContext';
import BurgerMenu from '../components/BurgerMenu';
import '../styles/main.css';

const Products = () => {
  const { content } = useContext(AdminContext);
  const { language } = useContext(LanguageContext);
  const isMobile = window.innerWidth <= 800;

  return (
    <>
      {isMobile && <BurgerMenu />}
      <div className="page-content">
        <h1>{language === 'ru' ? 'Продукты и услуги' : 'Products and Services'}</h1>
        
        <div className="products-grid">
          {content.products.map((product, index) => (
            <div key={index} className="product-card">
              <h3>{product.title[language]}</h3>
              <p>{product.description[language]}</p>
              <p className="price">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;