import React from 'react';

export const Header = () => {

  const logoUrl = "./logo512.png";
  return (
    <div className='header'>
      <h2>Expense Tracker</h2>
      <img src={logoUrl} alt="Logo" className="account-icon" />
    </div>
  )
}
