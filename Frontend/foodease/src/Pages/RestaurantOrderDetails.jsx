import React, { useEffect, useState } from 'react';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import RestaurantService from '../Services/RestaurantService';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const data = await RestaurantService.getOrderDetails(orderId);
        setOrder(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load order details.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  
return (
  <Container className="mt-4">
    <h2>Order #{order.id} Details</h2>
    <h3>Total: ₹{order.totalAmount}</h3>
    <h4>Items:</h4>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Price (₹)</th>
          <th>Quantity</th>
          <th>Total Price (₹)</th>
        </tr>
      </thead>
      <tbody>
        {order.orderItems.map((item, index) => (
          <tr key={index}>
            <td>{item.menuItemName}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>{item.price * item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Container>
);

};

export default OrderDetails;