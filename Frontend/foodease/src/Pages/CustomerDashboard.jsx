import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerService from '../Services/CustomerService';
import CustomerNavbar from '../Components/CustomerNavbar';
import { Button } from 'react-bootstrap';

const CustomerDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loadingRestaurants, setLoadingRestaurants] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await CustomerService.getAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoadingRestaurants(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleViewMenu = (restaurantId) => {
    navigate(`/customer/${restaurantId}/menu`);
  };

  const handleViewOrders = () => {
    navigate('/customer/orders');
  };

  return (
    <>
      <CustomerNavbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Restaurants</h2>
          <Button variant="success" onClick={handleViewOrders}>
            View Orders
          </Button>
        </div>

        {loadingRestaurants ? (
          <p>Loading restaurants...</p>
        ) : (
          <div className="row">
            {restaurants.map((restaurant) => (
              <div className="col-md-4 mb-4" key={restaurant.id}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{restaurant.name}</h5>
                    <p className="card-text">
                      <strong>Rating:</strong> {restaurant.rating} <br />
                      <strong>Location:</strong> {restaurant.address}
                    </p>
                    <button
                      className="btn btn-info"
                      onClick={() => handleViewMenu(restaurant.id)}
                    >
                      View Menu
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

export default CustomerDashboard;