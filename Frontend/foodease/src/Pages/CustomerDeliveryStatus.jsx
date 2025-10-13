import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerService from '../Services/CustomerService';

const CustomerDeliveryDetails = () => {
  const { orderId } = useParams();
  const [delivery, setDelivery] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const data = await CustomerService.getDeliveryStatus(orderId);
        setDelivery(data);
      } catch (error) {
        console.error('Error fetching delivery details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDelivery();
  }, [orderId]);

  return (
    <>
      <div className="container mt-4">
        <h2 className="mb-4">Delivery Details</h2>
        {loading ? (
          <p>Loading delivery details...</p>
        ) : delivery ? (
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Delivery details for Order #{delivery.orderId}</h5>
              <p className="card-text">
                <strong>Delivery Partner Name: </strong>{delivery.partnerName}<br />
                <strong>Status:</strong> {delivery.status}<br />
                <strong>Last Updated:</strong> {new Date(delivery.lastUpdate).toLocaleString()}
              </p>
            </div>
          </div>
        ) : (
          <p>No delivery details found for this order.</p>
        )}
      </div>
    </>
  );
};

export default CustomerDeliveryDetails;