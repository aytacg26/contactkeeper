import React, { useState, useContext, useEffect } from 'react';
import authContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import { emailValidation } from '../../utils/validations';

const Login = (props) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { login, isAuthenticated, error, clearErrors } = useContext(
    authContext
  );
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error && error !== 'No token, authorization denied') {
      setAlert(error, 'danger');
      clearErrors();
    }

    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const { email, password } = user;

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidEmail = emailValidation(email);

    if (!email || !password) {
      setAlert('Please fill in all fields', 'danger');
    }

    if (!isValidEmail) {
      setAlert('Please enter a valid email address.', 'danger');
    }

    if (email && password && isValidEmail) {
      login({ email, password });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Login</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            value={email}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={handleChange}
          />
        </div>

        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Login;
