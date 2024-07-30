//user screen with user details and menu optionsimport React from 'react';
import React,{ useContext,useEffect,useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';



export const User = ({onLogout}) => {
    const {name,email,mobile,fetchUserInitialData} = useContext(GlobalContext);
    const currentUser = auth.currentUser;

    useEffect(() => {
        fetchUserInitialData(currentUser);
    }, [currentUser]);

    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };


    return (
        <div>
            {mobile===0? 
                (
                    <p>Loading user data...</p>
                ) : (<>
                    <table>
                        <tbody>
                        <tr>
                            <td className='user-key'>Name</td>
                            <td className='user-data'>{name}</td>
                        </tr>
                        <tr>
                            <td className='user-key'>Email</td>
                            <td className='user-data'>{email}</td>
                        </tr>
                        <tr>
                            <td className='user-key'>Mobile</td>
                            <td className='user-data'>{mobile}</td>
                        </tr>
                        </tbody>
                    </table>
                    <button className='btn' onClick={goHome}>Go Home</button>
                    <button className='btn logout' onClick={onLogout}>Logout</button>
                </>)
            }
        </div>
    );
};