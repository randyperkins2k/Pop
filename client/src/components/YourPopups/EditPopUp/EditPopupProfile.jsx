import React, { useState } from 'react';
import MerchantProfile from '../../MerchantProfileView/MerchantProfile.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled, { css } from 'styled-components'
import ToggleOpenClose from '../../ToggleOpenClose.jsx'
// import * as merchData from '../../openMerch.json';
// const merchant = merchData.merchants[0];

// const Create = styled.button`
//   margin-left: -1px;
//   color: black;
//   font-family: 'Ubuntu';
//   padding: 5px 16px;
//   background-color: white;
//   font-size: 11px;
//   border-radius: 6px;
//   border-width: 1px;
//   border-color: lightgray;
//   transition: ease 0.01s all;
// `

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
${props => props.openShopPrimary && css`
opacity: .5;
color: black;
background-color: #ffd1dc;
font-size: 11.25px;
`}
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


const EditPopupProfile = ({ merchant }) => {
const [ openShopPrimary, setOpenShopPrimary ] = useState(false)


  const closeBusiness = () => {
    axios.put(`/closemerchant/${merchant.id}`)
      .catch(err => console.log('closing merchant error', err));
  }

  return (
    <EditYourPopUpWrap >
      <Link to='/yourpopups'>
       <BackBtn>Back</BackBtn>
      </Link>
      <div className='controlPanel'>
        <h6>Control panel</h6>
        <EditInfoBtn>Edit info</EditInfoBtn>
        <UploadBtn>Upload photo</UploadBtn>
        <EditMenuBtn>Edit menu</EditMenuBtn>
        <EditOwnerBtn>Edit owner</EditOwnerBtn>
        <OpenShopBtn
         openShopPrimary={openShopPrimary}
         onClick = {() => {
           setOpenShopPrimary(!openShopPrimary)
          }}
         >Open shop</OpenShopBtn>
          <CloseBusinessBtn
          onClick={() => closeBusiness()}
          >Close</CloseBusinessBtn>
      </div>
      <div className='profilePreview'>
        <ToggleOpenClose/>
        <MerchantProfile merchant={merchant} style={{fontFamily: 'Ubuntu'}}/>
      </div>
    </EditYourPopUpWrap >
  )
};

export default EditPopupProfile;