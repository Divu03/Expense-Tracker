import React,{ useState, useContext } from 'react'
import { AuthContext } from '../context/AuthState';

export const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const {loginUser} = useContext(AuthContext);

    const onSubmit = e =>{
        e.preventDefault();

        const userLoggedin = {
            email,
            password
        }

        loginUser(userLoggedin)
    }

  return (
    <div>
        <h1>
            Add new transaction
        </h1>
        <form onSubmit={onSubmit}>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email" />
            </div>
            <div className="form-control">
                <label htmlFor="password">Text</label>
                <input type="password" id='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
            </div>
            <button className="btn">Add transaction</button>
        </form>
    </div>
  )
}
