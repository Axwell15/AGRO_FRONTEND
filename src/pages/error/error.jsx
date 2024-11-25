import './error.style.css';
import React from 'react';

const error = () => {
  return (
    <div className='bg-container'>
      <div className='card-error'>
        <h1 className='text-6xl'>404</h1>
        <h2 className='text-3xl'>Page not found</h2>
      </div>
    </div>
  )
};

export default error;