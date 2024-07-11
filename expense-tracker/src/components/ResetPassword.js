import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthState';
import { Link,useNavigate } from 'react-router-dom';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const {sendResetEmail} = useContext(AuthContext)

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await sendResetEmail(email);
      setMessage('Reset email sent successfully.');
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3 seconds
    } catch (error) {
      setMessage('Error sending reset email. Please try again.');
      console.error('Error sending reset email', error);
    }
  };

  return (
    <div className="reset-password">
      <h1>Reset Password</h1>
      <form onSubmit={handleResetPassword}>
        <div className='form-control'>
          <label htmlFor='resetEmail'>Email</label>
          <input
            type='email'
            id='resetEmail'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email to reset password'
            required
          />
        </div>
        <button type='submit' className='btn E'>Send Reset Email</button>
      </form>
      {message && <p>{message}</p>}
      <nav>
        <p>
          Remembered your password? <Link to="/login" className="nav-item">Login</Link>
        </p>
      </nav>
    </div>
  );
};
