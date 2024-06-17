import React, { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
import './Header.css'; // Импорт файла стилей
import logo from '../images/logo.svg';
import icon_search from '../images/icons/icon-search.svg';
import icon_profile from '../images/icons/icon-profile.svg';
import icon_profile_auth from '../images/icons/icon-profile.auth.jpg';

const Header = ({ showHeader, setShowHeader }) => {
  const [searchValue, setSearchValue] = useState('');
  // Проверяем, авторизован ли пользователь (наличие токена)
  const isAuth = localStorage.getItem('authToken');

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Значение поиска:', searchValue);
  };

  return showHeader ? (
    <header className='header container'>
      <nav>
        <div>
          <Link to="/">
            <img className="logo logo--header" src={logo} alt="Логотип" />
          </Link>
        </div>
        <div className="header__buttons">
          <form className="form form--search" onSubmit={handleSearchSubmit}>
            <input
              className="input input--search"
              id="searchInput"
              type="search"
              value={searchValue}
              onChange={handleSearchInputChange}
              required
            />
            <img src={icon_search} alt="" />
          </form>
          <Link to="/addproject">
            <button id="addbtn" className="button button--header-add" type="text">
              <span>+</span>
            </button>
          </Link>
          {isAuth ? (
            <Link to="/user">
              <button className="button button--header-profile" type="button">
                <img src={icon_profile_auth} alt="" />
              </button>
            </Link>
          ) : (
            <Link to="/auth">
              <button className="button button--header-profile" type="button">
                <img src={icon_profile} alt="" />
              </button>
            </Link>
          )}
        </div>
      </nav>
      <Highlighter
        highlightClassName="YourHighlightClass"
        searchWords={[searchValue]}
        autoEscape={true}
        textToHighlight={searchValue} // Теперь это строка, как и требуется
      />
    </header>
  ) : null;
};

export default Header;