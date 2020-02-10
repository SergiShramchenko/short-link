import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setlink] = useState('');

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          {
            from: link
          },
          { Authorization: `Bearer ${auth.token}` }
        );

        console.log(data);

        history.push(`/detail/${data.link._id}`);
      } catch (e) {}
    }
  };

  return (
    <div className='row'>
      <div className='col s8 offset-s2' style={{ paddingTop: '1rem' }}>
        <div className='input-field'>
          <input
            placeholder='Paste the link'
            id='link'
            type='text'
            onChange={event => setlink(event.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor='link'>Enter the link</label>
        </div>
      </div>
    </div>
  );
};
