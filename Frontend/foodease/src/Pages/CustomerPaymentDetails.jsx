import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerService from '../Services/CustomerService';

const CustomerPaymentDetails = () => {
  const { orderId } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const data = await CustomerService.getPaymentByOrder(orderId);
        setPayment(data);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [orderId]);

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Payment Details</h2>
        {loading ? (
          <p>Loading payment details...</p>
        ) : payment ? (
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Payment for Order #{payment.orderId}</h5>
              <p className="card-text">
                <strong>Amount:</strong> ₹{payment.amount}<br />
                <strong>Status:</strong> {payment.status}<br />
                <strong>Timestamp:</strong> {new Date(payment.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <p>No payment details found for this order.</p>
        )}
      </div>
    </>
  );
};

export default CustomerPaymentDetails;