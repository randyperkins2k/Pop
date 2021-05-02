import React, { useState } from 'react';
import MerchantProfile from '../../MerchantProfileView/MerchantProfile.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import * as merchData from '../../openMerch.json';
// const merchant = merchData.merchants[0];


const EditPopupProfile = ({ merchant, merchData, setMerchData }) => {
  const [openOrClosed, setOpenOrClosed] = useState('');

  const closeBusiness = () => {
    axios.put(`/closemerchant/${merchant.id}`)
      .then(() => {
        setOpenOrClosed(' is closed');
        let merchants = merchData;
        console.log(merchants);
        console.log(merchant.id);
        merchants.forEach(merch => {
          if (merch.id === merchant.id) {
            merch.isOpen = false;
          }
        })
        setMerchData(merchants);
      })
      .catch(err => console.log('closing merchant error', err));
  }

  const openBusiness = () => {
    axios.put(`/openmerchant/${merchant.id}`)
      .then(() => setOpenOrClosed(' is open'))
      .catch(err => console.log('opening merchant error', err));
  }

  return (
    <div>
      <Link to='/yourpopups'>
       <button>Back</button>
      </Link>
      <div className='controlPanel'>
        <h5>Control Panel</h5>
        <button onClick={() => openBusiness()}>Open for business</button>
        <button>Edit info</button>
        <button>Upload a picture</button>
        <button>Edit Menu</button>
        <button>Add an owner</button>
        <button onClick={() => closeBusiness()}>Close</button>
      </div>
      <div className='profilePreview'>
        <MerchantProfile
          merchant={merchant}
          openOrClosed={openOrClosed}
          setOpenOrClosed={setOpenOrClosed}
        />
      </div>
    </div>
  )
};

export default EditPopupProfile;