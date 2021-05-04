import React, { useState } from 'react';
import MerchantProfile from '../../MerchantProfileView/MerchantProfile.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled, { css } from 'styled-components'
import UploadPic from './UploadPic.jsx';
import ToggleOpenClose from '../../ToggleOpenClose.jsx'
// import * as merchData from '../../openMerch.json';
// const merchant = merchData.merchants[0];


const EditYourPopUpWrap = styled.div`
margin-top: 30px;
text-align: center;
font-family: 'Ubuntu';
h6 {
  margin-top: 30px;
  font-family: 'helvetica';
}
`
const OpenShopBtn = styled.button`
color: black;
font-family: 'Ubuntu';
padding: 5px 16px;
background-color: white;
font-size: 11px;
border-radius: 6px;
border-width: 1px;
border-color: lightgray;
transition: ease 0.01s all;

`
const BackBtn = styled.button`
color: black;
font-family: 'Ubuntu';
padding: 5px 16px;
background-color: white;
font-size: 11px;
border-radius: 6px;
border-width: 1px;
border-color: lightgray;
`
const EditInfoBtn = styled.button`
color: black;
font-family: 'Ubuntu';
padding: 5px 16px;
background-color: white;
font-size: 11px;
border-radius: 6px;
border-width: 1px;
border-color: lightgray;
`
const UploadBtn = styled.button`
color: black;
font-family: 'Ubuntu';
padding: 5px 16px;
background-color: white;
font-size: 11px;
border-radius: 6px;
border-width: 1px;
border-color: lightgray;
`
const EditMenuBtn = styled.button`
color: black;
font-family: 'Ubuntu';
padding: 5px 16px;
background-color: white;
font-size: 11px;
border-radius: 6px;
border-width: 1px;
border-color: lightgray;
`
const EditOwnerBtn = styled.button`
color: black;
font-family: 'Ubuntu';
padding: 5px 16px;
background-color: white;
font-size: 11px;
border-radius: 6px;
border-width: 1px;
border-color: lightgray;
`
const CloseBusinessBtn = styled.button`
color: black;
font-family: 'Ubuntu';
padding: 5px 16px;
background-color: white;
font-size: 11px;
border-radius: 6px;
border-width: 1px;
border-color: lightgray;
`


const EditPopupProfile = ({ merchant, merchData, setMerchData }) => {
  const [openOrClosed, setOpenOrClosed] = useState('');
  const [ uploadPicWindow, setUploadPicWindow ] = useState(false);


  const closeBusiness = () => {
    axios.put(`/closemerchant/${merchant.id}`)
      .then(() => {
        setOpenOrClosed(' is closed');
        let merchants = merchData;
        merchants.forEach(merch => {
          if (merch.id === merchant.id) {
            merch.isOpen = false;
          }
        });
        setMerchData(merchants);
      })
      .catch(err => console.log('closing merchant error', err));
  }

  const openBusiness = () => {
    axios.put(`/openmerchant/${merchant.id}`)
      .then(() => {
        setOpenOrClosed(' is open');
        let merchants = merchData;
        merchants.forEach(merch => {
          if (merch.id === merchant.id) {
            merch.isOpen = true;
          }
        });
        setMerchData(merchants);
      })
      .catch(err => console.log('opening merchant error', err));
  }

  return (
    <EditYourPopUpWrap >
      <Link to='/yourpopups'>
       <BackBtn>Back</BackBtn>
      </Link>
      <div className='controlPanel'>
        <h6>Control panel</h6>
        <EditInfoBtn>Edit info</EditInfoBtn>
        <UploadBtn
          onClick={() => setUploadPicWindow(true)}
        >Upload photo</UploadBtn>
        <EditMenuBtn>Edit menu</EditMenuBtn>
        <EditOwnerBtn>Edit owner</EditOwnerBtn>
        <Link to='/openpopmap'>
        <OpenShopBtn>Open shop</OpenShopBtn>
        </Link>
        <CloseBusinessBtn
          onClick={() => closeBusiness()}
          >Close
        </CloseBusinessBtn>
      </div>
      {
        uploadPicWindow ? 
        <UploadPic
          merchant={merchant}
        /> :
        ''
      }
      <div className='profilePreview'>
        <MerchantProfile merchant={merchant} openOrClosed={openOrClosed} setOpenOrClosed={setOpenOrClosed} style={{fontFamily: 'Ubuntu'}}/>
      </div>
    </EditYourPopUpWrap >
  )
};

export default EditPopupProfile;