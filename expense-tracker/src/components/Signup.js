import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthState';
import { Link, useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');

    const { signupUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        const newUser = {
            email,
            password,
            name,
            date : Date.now,
            mobile
        };

        try {
            await signupUser(newUser);
            navigate('/');
        } catch (error) {
            console.error("Error signing up", error);
        }
    };

    return (
        <div className='ls'>
            <h1>Signup</h1>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                </div>
                <div className="form-control">
                    <label htmlFor="mobile">Mobile</label>
                    <input type="number" id='mobile' value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile" />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="form-control">
                    <div className="label-container">
                        <label htmlFor="password">Password</label>
                        <p className='warning'>(min 8 characters)</p>
                    </div>
                    <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <button className="btn sl">Signup</button>
            </form>
            <nav>
                <p>Already a user <Link to="/login" className="nav-item">login</Link> </p>
            </nav>
        </div>
    );
};
