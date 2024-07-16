import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
    const { income,expense } = useContext(GlobalContext);

    const total = Number(income) - Number(expense);

    return (
        <div className='balanceDiv'>
            <h4>Your Balance</h4>
            <h1>${total.toFixed(2)}</h1>
        </div>
    );
};