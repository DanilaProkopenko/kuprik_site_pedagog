import React, { useContext, useState } from 'react';
import { AdminContext } from '../contexts/AdminContext';
import { LanguageContext } from '../contexts/LanguageContext';
import BurgerMenu from '../components/BurgerMenu';
import '../styles/main.css';

const Contact = () => {
  const { content } = useContext(AdminContext);
  const { language } = useContext(LanguageContext);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isMobile = window.innerWidth <= 800;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь должна быть отправка формы на сервер
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <>
      {isMobile && <BurgerMenu />}
      <div className="page-content">
        {/* <p>+7 908 517 50 43</p> */}
        <h1>{content.contact.title[language]}</h1>
        
        <div className="contact-info">
          {/* <h2>{content.contact.title[language]}</h2> */}
          <p>{content.contact.address[language]}</p>
          <p>Email: {content.contact.email}</p>
          <p>Phone: {content.contact.phone}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <h3>{language === 'ru' ? 'Форма обратной связи' : 'Contact Form'}</h3>
          
          <div className="form-group">
            <label>
              {language === 'ru' ? 'Имя' : 'Name'}
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          
          <div className="form-group">
            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          
          <div className="form-group">
            <label>
              {language === 'ru' ? 'Сообщение' : 'Message'}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          
          <button type="submit">
            {language === 'ru' ? 'Отправить' : 'Submit'}
          </button>
          
          {isSubmitted && (
            <p className="success-message">
              {language === 'ru' ? 'Сообщение отправлено!' : 'Message sent!'}
            </p>
          )}
        </form>
      </div>
    </>
  );
};

export default Contact;