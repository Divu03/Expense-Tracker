import React, { useState } from 'react';

export const Header = ({ onLogout, onViewHistory }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const logoUrl = "./logo512.png";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    onLogout();
    toggleMenu();
  };

  const handleViewHistory = () => {
    onViewHistory();
    toggleMenu();
  };

  return (
    <div className='header'>
      <h2>Expense Tracker</h2>
      <img src={logoUrl} alt="Logo" className="account-icon" onClick={toggleMenu} />
      {menuOpen && (
        <div className="menu">
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleViewHistory}>View History</button>
        </div>
      )}
    </div>
  );
};
