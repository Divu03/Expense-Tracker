import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Transaction = ({ transaction }) => {
  const { deleteTransaction } = useContext(GlobalContext);
  const [showDelete, setShowDelete] = useState(false);

  const sign = transaction.amount < 0 ? '-' : '+';

  const handleListItemClick = () => {
    setShowDelete(!showDelete);
  };

  return (
    <div>
      <li
        className={transaction.amount < 0 ? 'minus' : 'plus'}
        onClick={handleListItemClick}
      >
        {transaction.text}{' '}
        <span>{sign}₹ {Math.abs(transaction.amount)}</span>
        {showDelete && (
          <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">
            x
          </button>
        )}
      </li>
    </div>
  );
};
