import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUserAction } from '../actions/userAction';
import RegImg from '../images/banner/register.jpg';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !phone) {
      setError('Please fill all fields..');
      return;
    }

    function onlyNumbers(str) {
      return /^[0-9]*$/.test(str);
    }
    if (onlyNumbers(phone) === false) {
      setError('Only type numbers..');
      return;
    }
    if (phone.length !== 10) {
      setError('Please Enter correct phone number..');
      return;
    }

    const success = await dispatch(
      registerUserAction({ name, email, phone, password })
    );

    if (success) {
      navigate('/home');
    }
  };

  return (
    <>
      <Container className="login-reg-page">
        <div className="login-reg-page-wrapper">
          <div
            className="login-reg-img-div"
            style={{ backgroundImage: `url(${RegImg})` }}
          ></div>
          <div className="login-reg-form-div">
            <div className="login-reg-form">
              <h1 className="headline text-center mb-4">Register now</h1>
              <input
                className="mb-4 input-style-1"
                type="text"
                name="name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="mb-4 input-style-1"
                type="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="mb-4 input-style-1"
                type="text"
                name="phone"
                placeholder="Enter Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
              <button onClick={handleRegister} className="button-1">
                Register
              </button>
              <p className="p-text mt-2">
                Already have an account? <Link to="/login">Click here</Link>{' '}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
