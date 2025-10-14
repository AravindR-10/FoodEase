import React, { useEffect, useState } from 'react';
import AdminService from '../Services/AdminService';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = roleFilter
        ? await AdminService.getUsersByRole(roleFilter)
        : await AdminService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  return (
    <div className="container mt-4">
      <h2>All Registered Users</h2>

      <div className="mb-3">
        <label htmlFor="roleFilter" className="form-label">Filter by Role:</label>
        <select
          id="roleFilter"
          className="form-select w-25"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="CUSTOMER">Customer</option>
          <option value="RESTAURANT_OWNER">Restaurant Owner</option>
          <option value="DELIVERY_PARTNER">Delivery Partner</option>
        </select>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllUsers;