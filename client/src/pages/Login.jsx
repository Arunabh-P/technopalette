import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserAction } from '../actions/userAction';
import LogInImg from '../images/banner/login.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill all fields..');
      return;
    }

    const success = await dispatch(loginUserAction({ email, password }));

    if (success) {
      navigate('/');
    }
  };
  return (
    <>
      <Container className="login-reg-page">
        <div className="login-reg-page-wrapper">
          <div
            className="login-reg-img-div"
            style={{ backgroundImage: `url(${LogInImg})` }}
          ></div>
          <div className="login-reg-form-div">
            <div className="login-reg-form">
              <h1 className="headline text-center mb-4">Login now</h1>

              <input
                className="mb-4 input-style-1"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                name="password"
                className="mb-4 input-style-1"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="error-text">{error}</p>
              <button onClick={handleLogin} className="button-1">
                Login
              </button>
              <p className="p-text mt-2">
                Don't you have a account?{' '}
                <Link to="/register">Register here</Link>{' '}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
