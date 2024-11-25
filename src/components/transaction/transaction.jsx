import React from 'react'
import './transaction.style.css'

const transaction = ({ transaction }) => {
  const date = new Date(transaction.date).toLocaleDateString();
  return (
    <article className='transaction-card'>
      <h3 className='transaction-date'>{date}</h3>
      <h2 className='transaction-type'>Tipo de Transacción: {transaction.type}</h2>
      <h2 className='transaction-price'>Monto: {transaction.value}</h2>
    </article>
  )
}

export default transaction