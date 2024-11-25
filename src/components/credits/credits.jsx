import { useState, useEffect } from 'react'
import './credits.style.css'
import Transaction from '../transaction/transaction'
import { getCredits, addCreditsToUser, substractCreditsFromUser } from '../../helpers/credits';
import { getTransactions } from '../../helpers/transactions';

const credits = () => {
  const [credits, setCredits] = useState(null);
  const [transactions, setTransactions] = useState(null);
  useEffect(() => {
    getCredits().then((data) => {
      setCredits(data.credits);
    });

    getTransactions().then((data) => {
      data.alltransactions.reverse();
      setTransactions(data.alltransactions);
    });
  }, [])
  return (
    <div className='credits'>
      <div className='credits-action'>
        <article className='credits-info'>
          <p className='credits-text'>Tus créditos son:</p>
          <h3 className='your-credits'>{credits}</h3>
          <button id='add-credits' className='credits-btn' onClick={async () => {
            addCreditsToUser().then(
              (res) => {
                setCredits(res.credits);
                transactions.unshift(res.transaction.transaction);
              }
            );
          }} >Agregar Créditos</button>
          <button id='withdraw-credits' className='credits-btn' onClick={async () => {
            substractCreditsFromUser().then((res) => {
              setCredits(res.credits);
              transactions.unshift(res.transaction.transaction);
            });
          }}>Retirar Créditos</button>
        </article>
      </div>


      <div className='credits-record'>
        <h2 className='record-text'>Historial</h2>
        <hr />
        {transactions && transactions.map((transaction) => (
          <Transaction transaction={transaction} key={transaction._id} />
        ))}
      </div>
    </div>
  )
}

export default credits