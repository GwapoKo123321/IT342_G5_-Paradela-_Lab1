import React, { useEffect, useState } from 'react';
import { getCurrentUser, logoutUser } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (!currentUser) navigate('/login');
        else setUser(currentUser);
    }, [navigate]);

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div className="fullscreen-dashboard">
            <h1 className="welcome-text">WELCOME BACK!</h1>
            <h2 className="user-subtitle">{user.username || user.email || "User"}</h2>

            <div className="dashboard-content">
                <p>You have successfully logged into the protected area.</p>
                <p>User ID: <strong>{user.userId}</strong></p>
            </div>

            <button onClick={handleLogout} className="logout-btn-large">
                LOG OUT
            </button>
        </div>
    );
}