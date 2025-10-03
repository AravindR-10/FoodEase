import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import AppNavbar from '../Components/AppNavbar';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
    <AppNavbar/>
    <Container className="text-center mt-5">
      <h1>Welcome to FoodEase</h1>
      <p className="lead">Your one-stop solution for food ordering and delivery</p>

      <Row className="justify-content-md-center mt-4">
        <Col md="auto">
          <Button variant="primary" onClick={() => navigate('/login')}>
            Login
          </Button>
        </Col>
        <Col md="auto">
          <Button variant="success" onClick={() => navigate('/register')}>
            Register
          </Button>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default Home;