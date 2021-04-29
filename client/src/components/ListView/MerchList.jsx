import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MerchantInfo = styled.button`
  margin-left: 1px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-radius: 6px;
`

const MerchList = ({ merchant, selectMerchant }) => {

  return (
    <div className="merchant-listing">
      <li>
        <img></img>
        <span></span>
        <h2>{merchant.name}</h2>
        <h2></h2>
        <Link to='/profile'>
          <MerchantInfo onClick={() => selectMerchant(merchant)}>Merchant Info</MerchantInfo>
        </Link>
      </li>
    </div>
  )
};

export default MerchList;