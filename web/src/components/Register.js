import React, { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const [msg, setMsg] = useState({ text: '', type: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(user);
            setMsg({ text: 'Registration Successful! Redirecting...', type: 'success' });
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setMsg({ text: 'Error: ' + error, type: 'error' });
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Create Account</h2>
            <form onSubmit={handleSubmit}>
                <input name="username" placeholder="Username" onChange={handleChange} required />
                <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            {msg.text && <p className={`message ${msg.type}`}>{msg.text}</p>}
        </div>
    );
}