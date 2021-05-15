import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next'

const Ul = styled.ul`
background-color: ${props => props.theme.mode === 'dark' ? '#803452' : '#ffd1dc'};
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




// const MerchantInfo = styled.button`
//   font-family: 'Ubuntu';
//   padding: 16px 80px;
//   font-size: 18px;
//   border-width: 0px;
//   margin-top: 5px;
//   border-color: transparent;
//   color: black;
//   border-radius: 100px;
//   background-color: transparent;

// `
// const Wrap = styled.div`
//   text-align: center;
// `

// const Ul = styled.ul`
// margin-left: -76px;
// margin-top: 0px;
// background-color:#ffd1dc;

// `
// const OpenTxt = styled.div`
// font-family: 'Ubuntu';
// color: white;
// font-weight: bold;
// font-size:20px;
// color: white;
// margin-bottom: -19px;

// `
// const ClosedTxt = styled.div`
// font-family: 'Ubuntu';
// font-weight: bold;
// font-size:20px;
// color: white;
// margin-bottom: -19px;
// `
