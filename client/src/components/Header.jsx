import React from 'react';
import * as api from '../api/projectApi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { USER_SIGNOUT } from '../constants/actionTypes';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { AiOutlinePoweroff } from 'react-icons/ai';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await api.logoutUser();
    dispatch({
      type: USER_SIGNOUT,
    });
    navigate('/');
  };

  const { name } = useSelector((state) => state.loginUserReducer.user.user);

  return (
    <Navbar className="navbar-div">
      <Container>
        <Navbar.Brand className="headline">Technopalette</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Link to="/profile">
            <Navbar.Text className="sub-heading link-style-1">
              {name}
            </Navbar.Text>
          </Link>
          <Navbar.Text>
            <AiOutlinePoweroff
              onClick={handleLogout}
              className="icon-style-1 fs-4 mx-3"
            />
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
