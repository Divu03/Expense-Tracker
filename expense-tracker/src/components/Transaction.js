import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const [showActions, setShowActions] = useState(false);

  const sign = transaction.amount < 0 ? '-' : '+';

  const formattedDate = transaction.timestamp.seconds
  ? new Date(transaction.timestamp.seconds * 1000).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
    }) // Firestore Timestamp
  : transaction.timestamp instanceof Date
  ? transaction.timestamp.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
    }) // JS Date object
  : '';

  const handleListItemClick = () => {
    setShowActions(!showActions);
  };

  return (
    <div>
      <li
        className={transaction.amount < 0 ? 'minus' : 'plus'}
        onClick={handleListItemClick}
      >
        {console.log(transaction)}
        {formattedDate && <span>{formattedDate} </span>}
        {transaction.text}{' '}
        <span>{sign}₹ {Math.abs(transaction.amount)}</span>
        {showActions && (
          <>
            <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">
              X
            </button>
            <button onClick={() => { } } className="edit-btn">
              E
            </button>
          </>
        )}
      </li>
    </div>
  );
};
