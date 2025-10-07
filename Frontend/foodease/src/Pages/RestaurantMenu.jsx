import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantService from '../Services/RestaurantService';

const RestaurantMenu = () => {
  const { id: restaurantId } = useParams();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const data = await RestaurantService.getMenuItemsByRestaurant(restaurantId);
        setMenuItems(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load menu items.');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [restaurantId]);

  const handleAddMenuItem = () => {
    navigate(`/restaurant/${restaurantId}/menu/add`);
  };

  const handleUpdateMenuItem = (menuItemId) => {
    navigate(`/restaurant/${restaurantId}/menu/${menuItemId}/edit`);
  };

  const handleDeleteMenuItem = async (menuItemId) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      try {
        await RestaurantService.deleteMenuItem(menuItemId);
        setMenuItems(menuItems.filter(item => item.id !== menuItemId));
      } catch (err) {
        console.error(err);
        setError('Failed to delete menu item.');
      }
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
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Menu Items</h2>
        <Button variant="success" onClick={handleAddMenuItem}>
          + Add Menu Item
        </Button>
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {menuItems.length === 0 ? (
          <p>No menu items found.</p>
        ) : (
          menuItems.map((item) => (
            <Col md={4} key={item.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    <strong>Description:</strong> {item.description} <br />
                    <strong>Price:</strong> ₹{item.price} <br />
                    <strong>Availability:</strong> {item.available == 1 ? 'Available' : 'Not Available'}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="warning"
                      onClick={() => handleUpdateMenuItem(item.id)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteMenuItem(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default RestaurantMenu;