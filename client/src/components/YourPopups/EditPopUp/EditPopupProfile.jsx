import React, { useState } from 'react';
import MerchantProfile from '../../MerchantProfileView/MerchantProfile.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled, { css } from 'styled-components'
import UploadPic from './UploadPic.jsx';
import ToggleOpenClose from '../../ToggleOpenClose.jsx'
import { useTranslation } from 'react-i18next'


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


const EditPopupProfile = ({ merchant, selectMerchant, merchData, setMerchData }) => {
  const [openOrClosed, setOpenOrClosed] = useState('');
  const [ uploadPicWindow, setUploadPicWindow ] = useState(false);
  const { t } = useTranslation()


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
       <BackBtn>{t("backBtn")}</BackBtn>
      </Link>
      <div className='controlPanel'>
        <h6>Control panel</h6>
        <Link to="/editinfo">
          <EditInfoBtn>{t("editInfoBtn")}</EditInfoBtn>
        </Link>
        <UploadBtn
          onClick={() => setUploadPicWindow(true)}
        >Upload photo</UploadBtn>
        <Link to="/editmenu">
          <EditMenuBtn>{t("editMenuBtn")}</EditMenuBtn>
        </Link>
        <Link to="/editowner">
          <EditOwnerBtn>{t("editOwnerBtn")}</EditOwnerBtn>
        </Link>
        <Link to='/openpopmap'>
        <OpenShopBtn>{t("openShopBtn")}</OpenShopBtn>
        </Link>
        <CloseBusinessBtn
          onClick={() => closeBusiness()}
          >{t("closeShopBtn")}
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