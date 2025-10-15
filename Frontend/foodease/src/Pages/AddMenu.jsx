import React, { useState } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantService from '../Services/RestaurantService';

const AddMenuItem = () => {
  const { id: restaurantId } = useParams();
  const [menuItem, setMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    available: true,
    restaurantId: restaurantId
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RestaurantService.addMenuItem(restaurantId, menuItem);
      navigate(`/restaurant/${restaurantId}/menu`);
    } catch (err) {
      console.error(err);
      setError('Failed to add menu item. Please try again.');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Add New Menu Item</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Item Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={menuItem.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={menuItem.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={menuItem.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Availability</Form.Label>
          <Form.Select
            name="available"
            value={menuItem.available}
            onChange={handleChange}
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </Form.Select>
        </Form.Group>

        <Button variant="success" type="submit">
          Add Item
        </Button>
      </Form>
    </Container>
  );
};

export default AddMenuItem;