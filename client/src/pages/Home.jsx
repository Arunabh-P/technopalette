import React from 'react';
import { Container } from 'react-bootstrap';
import Header from '../components/Header';
import Hello from '../images/hello.gif';

const Home = () => {
  return (
    <>
      <Header />
      <Container className="home-container">
        <img className="home-img" src={Hello} alt="" />
      </Container>
    </>
  );
};

export default Home;
