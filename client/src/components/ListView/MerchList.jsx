import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next'

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
  text-align: center;
`

const Ul = styled.ul`
margin-left: -76px;
margin-top: 0px;
background-color:#ffd1dc;

`
const OpenTxt = styled.div`
font-family: 'Ubuntu';
color: white;
font-weight: bold;
font-size:20px;
color: white;
margin-bottom: -19px;

`
const ClosedTxt = styled.div`
font-family: 'Ubuntu';
font-weight: bold;
font-size:20px;
color: white;
margin-bottom: -19px;
`

const MerchList = ({ merchant, selectMerchant }) => {
  const { name, isOpen } = merchant
  const {t} = useTranslation()

  return (

    <Wrap>
    <div className="merchant-listing">
      <Ul>
        <img></img>
        {
          isOpen ? 
          <OpenTxt>{t('openTxt')}</OpenTxt> :
          <ClosedTxt>{t('closedTxt')}</ClosedTxt>
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