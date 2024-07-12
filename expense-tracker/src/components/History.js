import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext,useGlobal } from '../context/GlobalState';
import { Transaction } from './Transaction';
import { Link, useNavigate } from 'react-router-dom';

export const History = () => {
    const { fetchLastFiveTransactions, fetchAllTransactions, transactions } = useContext(GlobalContext);
    console.log("1");
    const [viewMore, setViewMore] = useState(false);
    const navigate = useNavigate();

  // useEffect(() => {
  //   fetchLastFiveTransactions();
  //   console.log("2");
  // },[]);
  // console.log("3");

  // const handleViewMore = () => {
  //   fetchAllTransactions();
  //   setViewMore(true);
  // };

  return (
    <div>
      <h3>History</h3>
      <ul className="list">
        {transactions.map(transaction => (
          <Transaction key={transaction.id} transaction={transaction} />
        ))}
      </ul>
      {/* {!viewMore && <button onClick={handleViewMore}>View More</button>} */}
      <nav>
        <Link to={"/"} className='nav-item'>Home</Link>
      </nav>

    </div>
  );
};
