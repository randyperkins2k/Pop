import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MerchantInfo = styled.button`
  font-family: 'Ubuntu';
  padding: 16px 80px;
  font-size: 18px;
  border-width: 0px;
  margin-top: 5px;
  border-color: transparent;
  color: black;
  border-radius: 100px;
  background-color: transparent;

`
const Wrap = styled.div`
  bacground-color: blue;
`

const Ul = styled.ul`
margin-left:-54px;
margin-top: 0px;
background-color:#ffd1dc;

`

const MerchList = ({ merchant, selectMerchant }) => {
  const { name, isOpen } = merchant

  return (

    <Wrap>
    <div className="merchant-listing">
      <Ul>
        <img></img>
        {
          isOpen ? 
          <h5>Open</h5> :
          <h5>Closed</h5>
        }
        <span></span>
        <div></div>
        <Link to='/profile'>
          <MerchantInfo onClick={() => selectMerchant(merchant)}>{ name }</MerchantInfo>
        </Link>
      </Ul>
    </div>

    </Wrap>

  )
};

export default MerchList;