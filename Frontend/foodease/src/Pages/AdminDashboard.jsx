import React, { useEffect, useState } from 'react';
import AdminService from '../Services/AdminService';
import { useNavigate } from 'react-router-dom';
import CommonNavbar from '../Components/CommonNavbar';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await AdminService.getAdminStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch admin stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!stats) return <p>No data available.</p>;

  return (
    <>
    <CommonNavbar/>
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      <div className="row g-4">
        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">Users</h5>
                <button className="btn btn-sm btn-primary" onClick={() => navigate('/admin/users')}>
                  View All
                </button>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Total Users: {stats.totalUsers}</li>
                <li className="list-group-item">Customers: {stats.totalCustomers}</li>
                <li className="list-group-item">Restaurant Owners: {stats.totalRestaurantOwners}</li>
                <li className="list-group-item">Delivery Partners: {stats.totalDeliveryPartners}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h5 className="card-title mb-0">Restaurants</h5>
                <button className="btn btn-sm btn-primary" onClick={() => navigate('/admin/restaurants')}>
                  View All
                </button>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Total Restaurants: {stats.totalRestaurants}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Orders</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Total Orders: {stats.totalOrders}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Deliveries</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Total Deliveries: {stats.totalDeliveries}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Revenue</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Total Revenue: ₹{stats.totalRevenue.toFixed(2)}</li>
                <li className="list-group-item">Avg. Order Value: ₹{stats.averageOrderValue.toFixed(2)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;