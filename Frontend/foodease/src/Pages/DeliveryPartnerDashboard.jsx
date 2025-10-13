import React, { useEffect, useState } from 'react';
import DeliveryService from '../Services/DeliveryService';
import CommonNavbar from '../Components/CommonNavbar';

const DeliveryDashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const partnerId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const data = await DeliveryService.getDeliveriesByPartner(partnerId);
        setDeliveries(data);
      } catch (err) {
        setError('Failed to load deliveries');
      } finally {
        setLoading(false);
      }
    };

    if (partnerId) {
      fetchDeliveries();
    } else {
      setError('Partner ID not found in localStorage');
      setLoading(false);
    }
  }, [partnerId]);

  if (loading) return <p>Loading deliveries...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
    <CommonNavbar/>
    <div className="container mt-4">
      <h2>My Deliveries</h2>
      {deliveries.length === 0 ? (
        <p>No deliveries found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Delivery ID</th>
              <th>Order ID</th>
              <th>Restaurant</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Last Delivery</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td>{delivery.id}</td>
                <td>{delivery.orderId}</td>
                <td>{delivery.restaurantName}</td>
                <td>{delivery.customerName}</td>
                <td>{delivery.status}</td>
                <td>{new Date(delivery.lastUpdate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </>
  );
};

export default DeliveryDashboard;
