import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MerchList = ({ merchant, selectMerchant }) => {

  return (
    <div className="merchant-listing">
      <li>
        <img></img>
        <span></span>
        <h2>{merchant.name}</h2>
        <h2></h2>
        <Link to='/profile'>
          <button onClick={() => selectMerchant(merchant)}>profile</button>
        </Link>
      </li>
    </div>
  )
};

export default MerchList;