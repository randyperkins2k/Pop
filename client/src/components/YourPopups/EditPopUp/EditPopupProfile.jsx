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


// const EditYourPopUpWrap = styled.div`
// margin-top: 30px;
// text-align: center;
// font-family: 'Ubuntu';
// h6 {
//   margin-top: 30px;
//   font-family: 'helvetica';
// }
// `
// const OpenShopBtn = styled.button`
// color: black;
// font-family: 'Ubuntu';
// padding: 5px 16px;
// background-color: white;
// font-size: 11px;
// border-radius: 6px;
// border-width: 1px;
// border-color: lightgray;
// transition: ease 0.01s all;

// `
// const BackBtn = styled.button`
// color: black;
// font-family: 'Ubuntu';
// padding: 5px 16px;
// background-color: white;
// font-size: 11px;
// border-radius: 6px;
// border-width: 1px;
// border-color: lightgray;
// `
// const EditInfoBtn = styled.button`
// color: black;
// font-family: 'Ubuntu';
// padding: 5px 16px;
// background-color: white;
// font-size: 11px;
// border-radius: 6px;
// border-width: 1px;
// border-color: lightgray;
// `
// const UploadBtn = styled.button`
// color: black;
// font-family: 'Ubuntu';
// padding: 5px 16px;
// background-color: white;
// font-size: 11px;
// border-radius: 6px;
// border-width: 1px;
// border-color: lightgray;
// `
// const EditMenuBtn = styled.button`
// color: black;
// font-family: 'Ubuntu';
// padding: 5px 16px;
// background-color: white;
// font-size: 11px;
// border-radius: 6px;
// border-width: 1px;
// border-color: lightgray;
// `
// const EditOwnerBtn = styled.button`
// color: black;
// font-family: 'Ubuntu';
// padding: 5px 16px;
// background-color: white;
// font-size: 11px;
// border-radius: 6px;
// border-width: 1px;
// border-color: lightgray;
// `
// const CloseBusinessBtn = styled.button`
// color: black;
// font-family: 'Ubuntu';
// padding: 5px 16px;
// background-color: white;
// font-size: 11px;
// border-radius: 6px;
// border-width: 1px;
// border-color: lightgray;
// `


const EditPopupProfile = ({ merchant, selectMerchant, merchData, setMerchData }) => {
  const [ openOrClosed, setOpenOrClosed] = useState('');
  const [ uploadPicWindow, setUploadPicWindow ] = useState(false);
  const { t } = useTranslation()


  const closeBusiness = () => {
    axios.put(`/api/merchants/closemerchant/${merchant.id}`)
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
    axios.put(`/api/merchants/openmerchant/${merchant.id}`)
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
    <div >
      <Link to='/yourpopups'>
       <button>{t("backBtn")}</button>
      </Link>
      <div className='controlPanel'>
        <h6>Control panel</h6>
        <Link to="/editinfo">
          <button>{t("editInfoBtn")}</button>
        </Link>
        <button
          onClick={() => setUploadPicWindow(true)}
        >Upload photo</button>
        <Link to="/editmenu">
          <button>{t("editMenuBtn")}</button>
        </Link>
        <Link to="/editowner">
          <button>{t("editOwnerBtn")}</button>
        </Link>
        <Link to='/openpopmap'>
          {merchant.isOpen ? (<button>Close</button>) : (<button>Open</button>)}
        </Link>
      </div>
      {
        uploadPicWindow ?
        <UploadPic
          merchant={merchant}
          setUploadPicWindow={setUploadPicWindow}
        /> :
        ''
      }
      <div className='profilePreview'>
        <MerchantProfile merchant={merchant} openOrClosed={openOrClosed} setOpenOrClosed={setOpenOrClosed} style={{fontFamily: 'Ubuntu'}}/>
      </div>
    </div >
  )
};

export default EditPopupProfile;