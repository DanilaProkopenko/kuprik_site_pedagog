import React, { createContext, useState, useEffect } from 'react';
import contentData from '../content.json';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  // Сначала пытаемся взять данные из localStorage, если их нет — используем contentData
  const [content, setContent] = useState(() => {
    const savedContent = localStorage.getItem('siteContent');
    return savedContent ? JSON.parse(savedContent) : contentData;
  });

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Проверка авторизации администратора
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const login = (password) => {
    // Простая проверка пароля (в реальном приложении нужно использовать безопасные методы)
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  const updateContent = (newContent) => {
    setContent(newContent);
    localStorage.setItem('siteContent', JSON.stringify(newContent)); // Сохраняем в localStorage
    // В реальном приложении здесь должна быть отправка на сервер
  };

  return (
    <AdminContext.Provider value={{ content, isAdmin, login, logout, updateContent }}>
      {children}
    </AdminContext.Provider>
  );
};