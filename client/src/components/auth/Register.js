import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { emailValidation } from '../../utils/validations';

const Register = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = user;
  const { setAlert } = useContext(AlertContext);
  const { register, error, clearErrors, isAuthenticated } = useContext(
    AuthContext
  );

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }

    //eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const handleChange = (e) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const isMatch = password === confirmPassword;

    if (name === '' || email === '' || password === '') {
      setAlert('Please enter all fileds', 'danger', 4500);
    }

    if (!isMatch) {
      setAlert('Password and confirm password do not match', 'danger', 5200);
    }

    if (password.length < 6) {
      setAlert('Password should be at least 6 characters', 'danger', 5900);
    }

    if (!emailValidation(email)) {
      setAlert('Please enter a valid email', 'danger', 6600);
    }

    if (name && email && isMatch) {
      register(user);
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' value={name} onChange={handleChange} />
        </div>

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

        <div className='form-group'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
