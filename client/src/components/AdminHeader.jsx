import React from 'react';
import * as api from '../api/projectApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ADMIN_SIGNOUT } from '../constants/actionTypes';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { AiOutlinePoweroff } from 'react-icons/ai';

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await api.logoutUser();
    dispatch({
      type: ADMIN_SIGNOUT,
    });
    navigate('/admin');
  };
  const { name } = useSelector((state) => state.loginAdminrReducer.user.user);
  return (
    <Navbar className="navbar-div">
      <Container>
        <Navbar.Brand className="headline">Technopalette</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text className="sub-heading link-style-1">{name}</Navbar.Text>
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

export default AdminHeader;
