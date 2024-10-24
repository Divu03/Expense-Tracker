import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker'; // Import DatePicker
import { GlobalContext } from '../context/GlobalState';
import 'react-datepicker/dist/react-datepicker.css'; // Import datepicker CSS

export const AddTransaction = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const [sign, setSign] = useState(0);
    const [useCustomDate, setUseCustomDate] = useState(false); // Track if the user wants to use a custom date
    const [selectedDate, setSelectedDate] = useState(new Date()); // Default to current date

    const { addTransaction } = useContext(GlobalContext);

    const onSubmit = (e) => {
        e.preventDefault();

        const newTransaction = {
            text: text ? text : 'not written',
            amount: sign === 0 ? +amount : -amount,
            timestamp: selectedDate, // Use the selected date (either default or custom)
        };

        addTransaction(newTransaction);
    };

    return (
        <div>
            <h3 className='home-data'>
                Add new transaction
            </h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input 
                        type="text" 
                        id='text' 
                        value={text} 
                        onChange={(e) => setText(e.target.value)} 
                        placeholder="Enter text..." 
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">Amount</label>
                    <input 
                        type="number" 
                        id='amount' 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        placeholder="Enter amount..." 
                    />
                </div>
                <div className='form-control'>
                    <label htmlFor='useCustomDate'>Use Custom Date?</label>
                    <input
                        type="checkbox"
                        id='useCustomDate'
                        checked={useCustomDate}
                        onChange={() => setUseCustomDate(!useCustomDate)}
                    />
                    {useCustomDate && (
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    )}
                </div>
                <div className='form-control'>
                    <label htmlFor='typebtn'>Transaction Type</label>
                    <div className="transaction-type">
                        <button
                            type="button"
                            id='typebtn'
                            className={`btn I ${sign === 0 ? 'active' : ''}`}
                            onClick={() => setSign(0)}
                        >
                            Income
                        </button>
                        <button
                            type="button"
                            id='typebtn'
                            className={`btn E ${sign === 1 ? 'active' : ''}`}
                            onClick={() => setSign(1)}
                        >
                            Expense
                        </button>
                    </div>
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </div>
    );
};