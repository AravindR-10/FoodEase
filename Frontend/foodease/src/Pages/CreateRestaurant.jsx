import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RestaurantService from '../Services/RestaurantService';
import AuthService from '../Services/AuthService';

const CreateRestaurant = () => {
  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    rating: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ownerId = AuthService.getCurrentUserId();
      const newRestaurant = { ...restaurant, ownerId };
      await RestaurantService.createRestaurant(newRestaurant);
      navigate('/restaurant');
    } catch (err) {
      console.error(err);
      setError('Failed to create restaurant. Please try again.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Create New Restaurant</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={restaurant.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={restaurant.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="text"
            name="rating"
            value={restaurant.rating}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Create Restaurant
        </Button>
      </Form>
    </Container>
  );
};

export default CreateRestaurant;