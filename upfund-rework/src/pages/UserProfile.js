import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Сброс токена авторизации
    localStorage.removeItem('authToken');
    // Перенаправление на главную страницу
    navigate('/');
  };

  return (
    <div className="user-profile">
      <h1>Профиль пользователя</h1>
      <button onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default UserProfile;