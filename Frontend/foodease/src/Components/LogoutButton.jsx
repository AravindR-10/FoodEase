import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {

    const navigate = useNavigate();
    const handleLogout = () => {

        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userId');

        navigate('/login');
    };

    return (
        <button className="btn btn-danger" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
