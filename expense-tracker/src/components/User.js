//user screen with user details and menu optionsimport React from 'react';
import React,{ useContext,useEffect,useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { auth } from '../firebase/firebase';
import { Link } from 'react-router-dom';



export const User = ({onLogout}) => {
    const {name,email,mobile,fetchUserInitialData} = useContext(GlobalContext);
    const currentUser = auth.currentUser;

    useEffect(() => {
        fetchUserInitialData(currentUser);
    }, [currentUser]);


    return (
        <div>
            {mobile===0? 
                (
                    <p>Loading user data...</p>
                ) : (<>
                    <table>
                        <tbody>
                        <tr>
                            <td>Name</td>
                            <td className='user-data'>{name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td className='user-data'>{email}</td>
                        </tr>
                        <tr>
                            <td>Mobile</td>
                            <td className='user-data'>{mobile}</td>
                        </tr>
                        </tbody>
                    </table>
                    <button className='btn' onClick={onLogout}>Logout</button>
                    <Link to={"/"} className='nav-item'>Home</Link>
                </>)
            }
        </div>
    );
};