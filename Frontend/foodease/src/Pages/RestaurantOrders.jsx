import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import RestaurantService from '../Services/RestaurantService';

const OrdersPage = () => {
  const { id: restaurantId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await RestaurantService.getOrdersByRestaurant(restaurantId);
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [restaurantId]);

  const handleViewOrder = (orderId) => {
    navigate(`/restaurant/${restaurantId}/orders/${orderId}`);
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
      <h2>Orders</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <Col md={4} key={order.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Order #{order.id}</Card.Title>
                  <Card.Text>
                    <strong>Customer:</strong> {order.customerName} <br />
                    <strong>Status:</strong> {order.status} <br />
                    <strong>Total:</strong> ₹{order.totalAmount}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleViewOrder(order.id)}>
                    View Order
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default OrdersPage;