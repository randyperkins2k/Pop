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
        <span></span>
        <Link to='/profile'>
          <button
            onClick={() => selectMerchant(merchant)}>{isOpen ? 
              <div style={
                {marginLeft: '240px', margin: '3px', height:'10px', width: '10px', backgroundColor: '#84e184', borderRadius: '50%',
                borderColor: 'black', border: 'solid', borderWidth: 'thin', display: 'inline-grid'}
              }></div> :
              <div style={
                {height:'10px', width: '10px', backgroundColor: '#8f9292', margin: '3px', borderRadius: '50%', display: 'inline-grid',
                borderColor: 'black', border: 'solid', borderWidth: 'thin'}
              }></div>}{ name }</button>
        </Link>
      </Ul>
    </div>
  )
};


export default MerchList;





