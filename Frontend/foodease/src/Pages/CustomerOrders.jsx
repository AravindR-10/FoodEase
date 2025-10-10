import React, { useEffect, useState } from 'react';
import CustomerService from '../Services/CustomerService';
import { useNavigate } from 'react-router-dom';

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const customerId = parseInt(localStorage.getItem('userId'));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await CustomerService.getOrdersByCustomer(customerId);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [customerId]);

  const handleViewOrderDetails = (orderId) => {
    navigate(`/customer/orders/details/${orderId}`);
  };

  const handleViewPaymentDetails = (orderId) => {
    navigate(`/customer/payments/${orderId}`);
  };

  const handleDeliveryStatus = (orderId) => {
    navigate(`/customer/delivery-status/${orderId}`);
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Your Orders</h2>
        {loading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="row">
            {orders.map((order) => (
              <div className="col-md-6 mb-4" key={order.id}>
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">Order #{order.id}</h5>
                    <p className="card-text">
                      <strong>Restaurant:</strong> {order.restaurantName || 'N/A'}<br />
                      <strong>Total Items:</strong> {order.orderItems?.length || 0}<br />
                      <strong>Status:</strong> {order.status || 'N/A'}
                    </p>
                    <button
                      className="btn btn-primary me-5"
                      onClick={() => handleViewOrderDetails(order.id)}
                    >
                      Order Details
                    </button>
                    <button
                      className="btn btn-success me-5"
                      onClick={() => handleViewPaymentDetails(order.id)}
                    >
                      Payment Details
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleDeliveryStatus(order.id)}
                    >
                      Delivery Status
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerOrders;