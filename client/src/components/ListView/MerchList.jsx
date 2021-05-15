import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next'

const Ul = styled.ul`
background-color: ${props => props.theme.mode === 'dark' ? '#803452' : '#f5abc9'};
`

const MerchList = ({ merchant, selectMerchant }) => {
  const { name, isOpen } = merchant
  const {t} = useTranslation()

  return (

   
    <div className="merchant-listing">
      <Ul>
        <img></img>
        {
          isOpen ? 
          <div>{t('openTxt')}</div> :
          <div>{t('closedTxt')}</div>
        }
        <span></span>
        <Link to='/profile'>
          <button onClick={() => selectMerchant(merchant)}>{ name }</button>
        </Link>
      </Ul>
    </div>



  )
};

export default MerchList;





