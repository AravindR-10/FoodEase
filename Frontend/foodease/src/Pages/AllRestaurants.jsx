import React, { useEffect, useState } from 'react';
import AdminService from '../Services/AdminService';

const AllRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await AdminService.getAllRestaurants();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="container mt-4">
      <h2>All Restaurants</h2>

      {loading ? (
        <p>Loading restaurants...</p>
      ) : restaurants.length === 0 ? (
        <p>No restaurants found.</p>
      ) : (
        <div className="row g-4 mt-3">
          {restaurants.map((restaurant) => (
            <div className="col-md-6 col-lg-4" key={restaurant.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{restaurant.name}</h5>
                  <p className="card-text">
                    <strong>Address:</strong> {restaurant.address}<br />
                    <strong>Rating:</strong> {restaurant.rating}<br />
                    <strong>Owner:</strong> {restaurant.ownerName} (ID: {restaurant.ownerId})
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRestaurants;