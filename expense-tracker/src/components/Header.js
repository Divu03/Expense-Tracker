import React from 'react';

export const Header = () => {

  const logoUrl = "./logo512.png";
  return (
    <div className='header'>
      <h2>Expense Tracker</h2>
      <img src={logoUrl} alt="Logo" className="account-icon" />{/*here there should be a menu that show option of logout and also history and other, history sholud be saved in firestore and last five should be shown at start and other can be accesed through onClick here */}
    </div>
  )
}
