import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const IncomeExpenses = () => {
    const { income,expense,saveChanges } = useContext(GlobalContext);
    saveChanges();

    return (
        <div className="inc-exp-container">
            <div>
                <h4>Income</h4>
                <p className="money plus">{income}</p>
            </div>
            <div>
                <h4>Expense</h4>
                <p className="money minus">{expense}</p>
            </div>
        </div>
    );
};