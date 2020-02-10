import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    eamil: '',
    password: ''
  });

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      message(data.message);
    } catch (e) {}
  };
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (e) {}
  };

  return (
    <div className='row'>
      <div className='col s6 offset-s3'>
        <h1>Short-link</h1>
        <div className='card  blue darken-1'>
          <div className='card-content white-text'>
            <span className='card-title'>Authorization</span>
            <div>
              <div className='input-field'>
                <input
                  placeholder='email'
                  id='email'
                  type='text'
                  name='email'
                  className='yellow-input'
                  value={form.eamil}
                  onChange={changeHandler}
                />
                <label htmlFor='email'>Email</label>
              </div>
              <div className='input-field'>
                <input
                  placeholder='password'
                  id='password'
                  type='password'
                  name='password'
                  className='yellow-input'
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor='password'>Password</label>
              </div>
            </div>
          </div>
          <div className='card-action'>
            <button
              className='btn yellow lighten-4 black-text'
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Enter
            </button>
            <button
              className='btn deep-orange lighten-2 black-text'
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
