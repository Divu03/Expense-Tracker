import React, { useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);
    const [sign, setSign] = useState(0);

    const { addTransaction, saveChanges } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();

        const newTransaction = {
            text: text ? text : 'not written',
            amount: sign === 0 ? +amount : -amount
        };

        addTransaction(newTransaction);
    };

    return (
        <div>
            <h3>
                Add new transaction
            </h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" id='text' value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount">
                        Amount
                    </label>
                    <input type="number" id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
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
            {/* <button className="btn" onClick={saveChanges}>Save Changes</button> */}
        </div>
    );
};
