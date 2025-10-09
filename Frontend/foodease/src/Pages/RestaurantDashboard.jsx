import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RestaurantService from '../Services/RestaurantService';
import AuthService from '../Services/AuthService';
import RestaurantNavbar from '../Components/RestaurantNavbar';

const RestaurantDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const ownerId = AuthService.getCurrentUserId();
        const data = await RestaurantService.getRestaurantsByOwner(ownerId);
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleViewMenu = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}/menu`);
  };

  const handleUpdate = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}/edit`);
  };

  const handleOrders = (restaurantId) => {
    navigate(`/restaurant/${restaurantId}/orders`);
  }

  const handleDelete = async (restaurantId) => {
    if (window.confirm('Are you sure you want to delete this restaurant?')) {
      try {
        await RestaurantService.deleteRestaurant(restaurantId);
        setRestaurants(restaurants.filter(r => r.id !== restaurantId));
      } catch (error) {
        console.error('Error deleting restaurant:', error);
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
    <>
      <RestaurantNavbar />
      <Container className="mt-4">
        <div className="d-flex justify-content-between align-items-center mb-1">
          <h2>Your Restaurants</h2>
          <div className='d-flex gap-2'>
            <Button variant="success" onClick={() => navigate('/restaurant/create')}>
              + Create Restaurant
            </Button>
          </div>
        </div>
        <Row>
          {restaurants.map((restaurant) => (
            <Col md={6} key={restaurant.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{restaurant.name}</Card.Title>
                  <Card.Text>
                    <strong>Address:</strong> {restaurant.address} <br />
                    <strong>Rating:</strong> {restaurant.rating ?? 'N/A'}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="primary"
                      onClick={() => handleViewMenu(restaurant.id)}
                    >
                      View Menu
                    </Button>

                    <Button variant="info" onClick={() => handleOrders(restaurant.id)}>
                      View Orders
                    </Button>

                    <Button
                      variant="warning"
                      onClick={() => handleUpdate(restaurant.id)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(restaurant.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default RestaurantDashboard;