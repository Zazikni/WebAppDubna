import React, { useState, useContext } from 'react';
import api from './api';
import { AuthContext } from './AuthContext';

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [error, setError] = useState(null);
  const [registerMessage, setRegisterMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await api.post('/api/token/', {
        username: loginUsername,
        password: loginPassword,
      });
      login(response.data.access, loginUsername);
    } catch (err) {
      setError('Ошибка авторизации. Проверьте логин и пароль.');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setRegisterMessage(null);
    try {
      await api.post('/api/auth/register/', {
        username: registerUsername,
        password: registerPassword,
      });
      setRegisterMessage('Регистрация прошла успешно. Теперь можете войти.');
      setShowRegister(false);
      setLoginUsername(registerUsername);
      setLoginPassword('');
    } catch (err) {
      setError('Ошибка регистрации. Возможно, логин уже занят или пароль слишком простой.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h2>Авторизация</h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Логин:
            <input
              type="text"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              required
              style={{ width: '100%', padding: '5px' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            Пароль:
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '5px' }}
            />
          </label>
        </div>
        <button type="submit" style={{ width: '100%', padding: '8px' }}>
          Войти
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <button
          type="button"
          onClick={() => setShowRegister((prev) => !prev)}
          style={{ width: '100%', padding: '8px' }}
        >
          {showRegister ? 'Скрыть регистрацию' : 'Зарегистрироваться'}
        </button>
      </div>

      {showRegister && (
        <div style={{ marginTop: '20px' }}>
          <h3>Регистрация</h3>
          <form onSubmit={handleRegister}>
            <div style={{ marginBottom: '10px' }}>
              <label>
                Логин:
                <input
                  type="text"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  required
                  style={{ width: '100%', padding: '5px' }}
                />
              </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>
                Пароль:
                <input
                  type="password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '5px' }}
                />
              </label>
            </div>
            <button type="submit" style={{ width: '100%', padding: '8px' }}>
              Создать аккаунт
            </button>
          </form>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '15px', color: 'red' }}>
          {error}
        </div>
      )}
      {registerMessage && (
        <div style={{ marginTop: '15px', color: 'green' }}>
          {registerMessage}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
