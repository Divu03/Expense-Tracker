//user screen with user details and menu optionsimport React from 'react';
import React,{ useContext,useEffect,useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { auth } from '../firebase/firebase';


export const User = ({ onLogout, onViewHistory }) => {
    const {name,email,mobile,fetchUserInitialData} = useContext(GlobalContext);
    const currentUser = auth.currentUser;

    useEffect(() => {
        fetchUserInitialData(currentUser);
    }, []);


    return (
        <div>
            {mobile===0? 
                (
                    <p>Loading user data...</p>
                ) : (<>
                    <h3 className='user-data'>Name : {name}</h3>
                    <h3 className='user-data'>Email : {email}</h3>
                    <h3 className='user-data'>Mobile : {mobile}</h3>
                    <button className='btn' onClick={onViewHistory}>View History</button>
                    <button className='btn' onClick={onLogout}>Logout</button>
                </>)
            }
        </div>
    );
};