import logo from '../images/logo.svg';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../components/AuthContext';
import '../App.css';

const Auth = ({ setShowHeader }) => {
  const { login } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ fullName: '', email: '', password: '' });

  useEffect(() => {
    setShowHeader(false);
    return () => {
      setShowHeader(true);
    };
  }, [setShowHeader]);

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4444/auth/login', loginForm);
      if (response.data.token) {
        login(response.data.token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4444/auth/register', registerForm);
      if (response.data.token) {
        login(response.data.token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="body--logsign">
      <div className="main main--logsign">
        <div className="login-and-signup">
          <input type="checkbox" id="chk" aria-hidden="true" />
            <div className="login">
              <form onSubmit={handleLogin}>
                <label htmlFor="chk" aria-hidden="true">Login</label>
                <input type="email" name="email" placeholder="Email" required value={loginForm.email} onChange={handleLoginChange} />
                <input type="password" name="password" placeholder="Password" required value={loginForm.password} onChange={handleLoginChange} />
                <button className="button button--login" type="submit">Log in</button>
              </form>
            </div>
            <div className="signup">
              <form onSubmit={handleRegister}>
                <label htmlFor="chk" aria-hidden="true">Sign up</label>
                <input type="text" name="fullName" placeholder="Full Name" required value={registerForm.fullName} onChange={handleRegisterChange} />
                <input type="email" name="email" placeholder="Email" required value={registerForm.email} onChange={handleRegisterChange} />
                <input type="password" name="password" placeholder="Password" required value={registerForm.password} onChange={handleRegisterChange} />
                <button className="button button--login" type="submit">Sign up</button>
              </form>
            </div>
        </div>
        <div className="login__banner">
          <Link to="/">
            <img className="login__banner-logo" src={logo} alt="Логотип" />
          </Link>
          <h4 className="login_subtitle-logo">@2024 ALL RIGHTS RESERVED</h4>
          <h1 className="login__title">Log in to unlock <span className="text-wavy">all features</span></h1>
          <h4 className="login__desc">Over than 2 million developers and community members appreciated the possibilities of UpFund</h4>
        </div>
      </div>
    </div>
  );
};

export default Auth;
