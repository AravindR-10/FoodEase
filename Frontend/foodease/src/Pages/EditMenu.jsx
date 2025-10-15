import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantService from '../Services/RestaurantService';

const EditMenuItem = () => {
  const { id: restaurantId, menuItemId } = useParams();
  const [menuItem, setMenuItem] = useState({
    name: '',
    description: '',
    price: '',
    available: true,
    restaurantId: restaurantId,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        const data = await RestaurantService.getMenuItemById(menuItemId);
        setMenuItem(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load menu item.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [menuItemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await RestaurantService.updateMenuItem(menuItemId, menuItem);
      navigate(`/restaurant/${restaurantId}/menu`);
    } catch (err) {
      console.error(err);
      setError('Failed to update menu item. Please try again.');
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
      <h2>Edit Menu Item</h2>
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

        <Button variant="primary" type="submit">
          Update Item
        </Button>
      </Form>
    </Container>
  );
};

export default EditMenuItem;
