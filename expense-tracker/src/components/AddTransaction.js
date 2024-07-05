import React,{ useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
    const [text,setText] = useState('');
    const [amount,setAmount] = useState(0);
    const [sign,setSign] = useState(0);

    const {addTransaction} = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();

        const newTransaction= {
            id : Math.floor(Math.random() * 100000000),
            text : text ? text : 'not written',
            amount: sign === 0 ? +amount : -amount
        }
        
        addTransaction(newTransaction);
    }

  return (
    <div>
        <h3>
            Add new transaction
        </h3>
        <form onSubmit={onSubmit}>
        <div className="form-control">
            <label htmlFor="text">Text</label>
            <input type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className='form-control'>
        <label>Transaction Type</label>
            <div className="transaction-type">
                <button
                type="button"
                className={`btn I ${sign === 0 ? 'active' : ''}`}
                onClick={() => setSign(0)}
                >
                    Income
                </button>
                <button
                type="button"
                className={`btn E ${sign === 1 ? 'active' : ''}`}
                onClick={() => setSign(1)}
                >
                    Expense
                </button>
            </div>
        </div>
        <div className="form-control">
            <label htmlFor="amount">
                Amount
            </label>
            <input type="number" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
        </form>
    </div>
  )
}
