import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAdminAction } from '../actions/adminAction';
import LogInImg from '../images/banner/adminLogin.jpg';

const AdminLogin = () => {
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

    const success = await dispatch(loginAdminAction({ email, password }));

    if (success) {
      navigate('/adminHome');
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
              <h1 className="headline text-center mb-4">Admin Login</h1>

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
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminLogin;
