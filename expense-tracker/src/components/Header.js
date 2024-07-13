import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const Header = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [menuOpen, setMenuOpen] = useState(false);
    const logoUrl = "./logo512.png";

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleUserClick = () => {
        navigate('/user'); // Redirect to User.js
        toggleMenu();
    };

    return (
        <div className='header'>
            <h2>Expense Tracker</h2>
            <img src={logoUrl} alt="Logo" className="account-icon" onClick={handleUserClick} />
        </div>
    );
};
