import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthState';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');

    const { signupUser } = useContext(AuthContext);

    const onSubmit = e => {
        e.preventDefault();

        const newUser = {
            email,
            password,
            name,
            date : Date.now,
            mobile
        };

        signupUser(newUser);
    };

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Password</label>
                    <input type="text" id='name' value={password} onChange={(e) => setName(e.target.value)} placeholder="Password" />
                </div>
                <div className="form-control">
                    <label htmlFor="mobile">Password</label>
                    <input type="number" id='mobile' value={password} onChange={(e) => setMobile(e.target.value)} placeholder="Password" />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                </div>
                <button className="btn">Signup</button>
            </form>
        </div>
    );
};
