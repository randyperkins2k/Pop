import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Window = ({ merchant, selectMerchant, setMLPrimary }) => {
console.log('hey whats up', setMLPrimary)
  return (
    <div>
      <span></span>
      <h2>{merchant.name}</h2>
      <h2>{merchant.website}</h2>
      <Link to='/profile'>
        <button onClick={() => {
          selectMerchant(merchant)
          setMLPrimary(false)
        }}>Profile</button>
      </Link>
    </div>
  )
}

export default Window;