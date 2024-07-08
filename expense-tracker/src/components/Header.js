import React, { useState } from 'react';

export const Header = ({ onLogout, onViewHistory }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const logoUrl = "./logo512.png";

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='header'>
      <h2>Expense Tracker</h2>
      <img src={logoUrl} alt="Logo" className="account-icon" onClick={toggleMenu} />
      {menuOpen && (
        <div className="menu">
          <button onClick={onLogout}>Logout</button>
          <button onClick={onViewHistory}>View History</button>
          {/* Add more menu options here if needed */}
        </div>
      )}
    </div>
  );
};
