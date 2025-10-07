import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantService from '../Services/RestaurantService';

const EditRestaurant = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState({
    name: '',
    address: '',
    rating: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const data = await RestaurantService.getRestaurantById(id);
        setRestaurant(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load restaurant details.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  const handleChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RestaurantService.updateRestaurant(id, restaurant);
      navigate('/restaurant');
    } catch (err) {
      console.error(err);
      setError('Failed to update restaurant. Please try again.');
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Edit Restaurant Details</h2>
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
            type="number"
            name="rating"
            value={restaurant.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Restaurant
        </Button>
      </Form>
    </Container>
  );
};

export default EditRestaurant;