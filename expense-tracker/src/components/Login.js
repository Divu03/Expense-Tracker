import React,{ useState, useContext } from 'react'
import { AuthContext } from '../context/AuthState';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {loginUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (e) =>{
        e.preventDefault();

        const user = {
            email,
            password
        }

        try {
            await loginUser(user);
            navigate('/');
        } catch (error) {
            console.error("Error logging in", error);
        }
    }

    const handleForgotPassword = () => {
        navigate('/reset-password');
    };

  return (
    <div className='ls'>
        <h1>
            Login
        </h1>
        <form onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
            </div>
            <div className="form-control">
                <div className="label-container">
                    <label htmlFor="password">Password</label>
                    <p className='warning'>(min 8 characters)</p>
                </div>
                <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
            </div>
            <button className="btn sl" disabled={password.length < 8}>Login</button>
        </form>
        <div className='flex-container'>
            <nav>
                <p>Not a user <Link to="/signup" className="nav-item">signup</Link> </p>
            </nav>
            <button className='btn E FP' onClick={handleForgotPassword}>Forgot Password?</button>
        </div>
    </div>
  )
}
