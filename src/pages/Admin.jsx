import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../contexts/AdminContext';
import { LanguageContext } from '../contexts/LanguageContext';
import { useHistory } from 'react-router-dom';
import '../styles/main.css';

const AdminPanel = () => {
  const { 
    content, 
    isAdmin, 
    login, 
    logout, 
    updateContent 
  } = useContext(AdminContext);
  const { language } = useContext(LanguageContext);
  const history = useHistory();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(password);
    if (!success) {
      setError(language === 'ru' ? 'Неверный пароль' : 'Wrong password');
    }
    setPassword('');
  };

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  const handleInputChange = (path, value) => {
    const keys = path.split('.');
    const newContent = { ...editedContent };
    let current = newContent;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setEditedContent(newContent);
  };

  const handleSave = () => {
    updateContent(editedContent);
    setEditMode(false);
  };

  if (!isAdmin) {
    return (
      <div className="admin-login">
        <h2>{language === 'ru' ? 'Вход в админ-панель' : 'Admin Login'}</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={language === 'ru' ? 'Пароль' : 'Password'}
            required
          />
          <button type="submit">{language === 'ru' ? 'Войти' : 'Login'}</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>{language === 'ru' ? 'Админ-панель' : 'Admin Panel'}</h2>
        <button onClick={handleLogout}>
          {language === 'ru' ? 'Выйти' : 'Logout'}
        </button>
      </div>
      
      {!editMode ? (
        <div className="admin-content">
          <button onClick={() => setEditMode(true)}>
            {language === 'ru' ? 'Редактировать контент' : 'Edit Content'}
          </button>
          
          <div className="content-preview">
            <h3>{language === 'ru' ? 'Текущий контент' : 'Current Content'}</h3>
            <pre>{JSON.stringify(content, null, 2)}</pre>
          </div>
        </div>
      ) : (
      <div className="content-editor">
  <h3>{language === 'ru' ? 'Редактирование контента' : 'Content Editor'}</h3>

  {/* Редактирование новостей */}
  <div className="editor-section">
    <h4>{language === 'ru' ? 'Новости' : 'News'}</h4>
    {editedContent.news.map((item, index) => (
      <div key={index} className="editor-item">
        <label>
          {language === 'ru' ? 'Заголовок (RU)' : 'Title (RU)'}
          <input
            type="text"
            value={item.title.ru}
            onChange={(e) =>
              handleInputChange(`news.${index}.title.ru`, e.target.value)
            }
          />
        </label>
        <label>
          {language === 'ru' ? 'Заголовок (EN)' : 'Title (EN)'}
          <input
            type="text"
            value={item.title.en}
            onChange={(e) =>
              handleInputChange(`news.${index}.title.en`, e.target.value)
            }
          />
        </label>
        <label>
          {language === 'ru' ? 'Содержание (RU)' : 'Content (RU)'}
          <textarea
            value={item.content.ru}
            onChange={(e) =>
              handleInputChange(`news.${index}.content.ru`, e.target.value)
            }
          />
        </label>
        <label>
          {language === 'ru' ? 'Содержание (EN)' : 'Content (EN)'}
          <textarea
            value={item.content.en}
            onChange={(e) =>
              handleInputChange(`news.${index}.content.en`, e.target.value)
            }
          />
        </label>
        <label>
          {language === 'ru' ? 'Дата' : 'Date'}
          <input
            type="date"
            value={item.date}
            onChange={(e) =>
              handleInputChange(`news.${index}.date`, e.target.value)
            }
          />
        </label>
      </div>
    ))}
  </div>

  {/* Редактирование "Об авторе" */}
  <div className="editor-section">
    <h4>{language === 'ru' ? 'О педагоге' : 'About the teacher'}</h4>
    <label>
      {language === 'ru' ? 'Заголовок (RU)' : 'Title (RU)'}
      <input
        type="text"
        value={editedContent.about.title.ru}
        onChange={(e) =>
          handleInputChange('about.title.ru', e.target.value)
        }
      />
    </label>
    <label>
      {language === 'ru' ? 'Заголовок (EN)' : 'Title (EN)'}
      <input
        type="text"
        value={editedContent.about.title.en}
        onChange={(e) =>
          handleInputChange('about.title.en', e.target.value)
        }
      />
    </label>
    <label>
      {language === 'ru' ? 'Контент (RU)' : 'Content (RU)'}
      <textarea
        value={editedContent.about.content.ru}
        onChange={(e) =>
          handleInputChange('about.content.ru', e.target.value)
        }
      />
    </label>
    <label>
      {language === 'ru' ? 'Контент (EN)' : 'Content (EN)'}
      <textarea
        value={editedContent.about.content.en}
        onChange={(e) =>
          handleInputChange('about.content.en', e.target.value)
        }
      />
    </label>

    <h5>{language === 'ru' ? 'Достижения' : 'Achievements'}</h5>
    {editedContent.about.achievements.map((achievement, index) => (
      <div key={index} className="editor-item">
        <label>
          {language === 'ru' ? 'Достижение (RU)' : 'Achievement (RU)'}
          <input
            type="text"
            value={achievement.ru}
            onChange={(e) =>
              handleInputChange(`about.achievements.${index}.ru`, e.target.value)
            }
          />
        </label>
        <label>
          {language === 'ru' ? 'Достижение (EN)' : 'Achievement (EN)'}
          <input
            type="text"
            value={achievement.en}
            onChange={(e) =>
              handleInputChange(`about.achievements.${index}.en`, e.target.value)
            }
          />
        </label>
      </div>
    ))}
  </div>

  {/* Редактирование контактов */}
  <div className="editor-section">
    <h4>{language === 'ru' ? 'Контакты' : 'Contact Information'}</h4>
    <label>
      {language === 'ru' ? 'Заголовок (RU)' : 'Title (RU)'}
      <input
        type="text"
        value={editedContent.contact.title.ru}
        onChange={(e) =>
          handleInputChange('contact.title.ru', e.target.value)
        }
      />
    </label>
    <label>
      {language === 'ru' ? 'Заголовок (EN)' : 'Title (EN)'}
      <input
        type="text"
        value={editedContent.contact.title.en}
        onChange={(e) =>
          handleInputChange('contact.title.en', e.target.value)
        }
      />
    </label>
    <label>
      {language === 'ru' ? 'Адрес (RU)' : 'Address (RU)'}
      <input
        type="text"
        value={editedContent.contact.address.ru}
        onChange={(e) =>
          handleInputChange('contact.address.ru', e.target.value)
        }
      />
    </label>
    <label>
      {language === 'ru' ? 'Адрес (EN)' : 'Address (EN)'}
      <input
        type="text"
        value={editedContent.contact.address.en}
        onChange={(e) =>
          handleInputChange('contact.address.en', e.target.value)
        }
      />
    </label>
    <label>
      Email
      <input
        type="email"
        value={editedContent.contact.email}
        onChange={(e) =>
          handleInputChange('contact.email', e.target.value)
        }
      />
    </label>
    <label>
      Телефон
      <input
        type="text"
        value={editedContent.contact.phone}
        onChange={(e) =>
          handleInputChange('contact.phone', e.target.value)
        }
      />
    </label>
  </div>

  {/* Редактирование продуктов */}
  <div className="editor-section">
    <h4>{language === 'ru' ? 'Продукты и услуги' : 'Products & Services'}</h4>
    {editedContent.products.map((product, index) => (
      <div key={index} className="editor-item">
        <label>
          {language === 'ru' ? 'Название (RU)' : 'Title (RU)'}
          <input
            type="text"
            value={product.title.ru}
            onChange={(e) =>
              handleInputChange(`products.${index}.title.ru`, e.target.value)
            }
          />
        </label>
        <label>
          {language === 'ru' ? 'Название (EN)' : 'Title (EN)'}
          <input
            type="text"
            value={product.title.en}
            onChange={(e) =>
              handleInputChange(`products.${index}.title.en`, e.target.value)
            }
          />
        </label>
        <label>
          {language === 'ru' ? 'Описание (RU)' : 'Description (RU)'}
          <textarea
            value={product.description.ru}
            onChange={(e) =>
              handleInputChange(`products.${index}.description.ru`, e.target.value)
            }
          />
        </label>
        <label>
          {language === 'ru' ? 'Описание (EN)' : 'Description (EN)'}
          <textarea
            value={product.description.en}
            onChange={(e) =>
              handleInputChange(`products.${index}.description.en`, e.target.value)
            }
          />
        </label>
        <label>
          {language === 'ru' ? 'Цена' : 'Price'}
          <input
            type="text"
            value={product.price}
            onChange={(e) =>
              handleInputChange(`products.${index}.price`, e.target.value)
            }
          />
        </label>
      </div>
    ))}
  </div>

  {/* Кнопки сохранить / отменить */}
  <div className="editor-buttons">
    <button onClick={() => setEditMode(false)}>
      {language === 'ru' ? 'Отмена' : 'Cancel'}
    </button>
    <button onClick={handleSave}>
      {language === 'ru' ? 'Сохранить' : 'Save'}
    </button>
  </div>
</div>
      )}
    </div>
  );
};

export default AdminPanel;