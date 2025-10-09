import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantService from '../Services/RestaurantService';

const DeliveryPartner = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(null);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const { orderId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const delivery = await RestaurantService.getDeliveryByOrderId(orderId);
        setDeliveryInfo(delivery);
      } catch (error) {
        if (error.response && error.response.status === 403) {
          setDeliveryInfo(null);
        } else {
          console.error('Error fetching delivery info:', error);
        }
      }

      try {
        const data = await RestaurantService.getDeliveryPartner();
        setPartners(data);
      } catch (error) {
        console.error('Error fetching delivery partners:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderId]);

  const handleAssignDelivery = async (partnerId) => {
    setAssigning(partnerId);
    try {
      const deliveryData = {
        partnerId,
        orderId,
      };
      const response = await RestaurantService.createDelivery(deliveryData);
      alert(`Delivery assigned to partner ${partnerId}`);
      setDeliveryInfo(response);
    } catch (error) {
      console.error('Error assigning delivery:', error);
      alert('Failed to assign delivery');
    } finally {
      setAssigning(null);
    }
  };

  if (loading) return <p>Loading delivery partners...</p>;

  return (
    <div className="container mt-4">
      <h2>Available Delivery Partners</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Partner ID</th>
            <th>Name</th>
            <th>Email</th>
            {deliveryInfo && <th>Delivery Status</th>}
            <th>Assign</th>
          </tr>
        </thead>
        <tbody>
          {partners.map((partner) => {
            const isAssigned = deliveryInfo?.partnerId === partner.id;
            return (
              <tr key={partner.id}>
                <td>{partner.id}</td>
                <td>{partner.username}</td>
                <td>{partner.email}</td>
                {deliveryInfo && (
                  <td>
                    {isAssigned ? (
                      <span className="badge bg-success">{deliveryInfo.status}</span>
                    ) : (
                      <span className="badge bg-secondary">Not Assigned</span>
                    )}
                  </td>
                )}
                <td>
                  {isAssigned ? (
                    <button className="btn btn-success" disabled>
                      Assigned
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAssignDelivery(partner.id)}
                      disabled={assigning === partner.id || deliveryInfo}
                    >
                      {assigning === partner.id ? 'Assigning...' : 'Assign Delivery'}
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryPartner;