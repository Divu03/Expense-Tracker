import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Transaction } from './Transaction';

export const History = () => {
  const { fetchLastFiveTransactions, fetchAllTransactions, transactions } = useContext(GlobalContext);
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    fetchLastFiveTransactions();
  }, [fetchLastFiveTransactions]);

  const handleViewMore = () => {
    fetchAllTransactions();
    setViewMore(true);
  };

  return (
    <div>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
      {!viewMore && <button onClick={handleViewMore}>View More</button>}
    </div>
  );
};
