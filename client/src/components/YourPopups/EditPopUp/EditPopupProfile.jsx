import React, { useState } from 'react';
import MerchantProfile from '../../MerchantProfileView/MerchantProfile.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import * as merchData from '../../openMerch.json';
// const merchant = merchData.merchants[0];

const EditPopupProfile = ({ merchant }) => {
  const closeBusiness = () => {
    axios.put(`/closemerchant/${merchant.id}`)
      .catch(err => console.log('closing merchant error', err));
  }

  return (
    <div>
      <Link to='/yourpopups'>
       <button>Back</button>
      </Link>
      <div className='controlPanel'>
        <h5>Control Panel</h5>
        <button>Open for business</button>
        <button>Edit info</button>
        <button>Upload a picture</button>
        <button>Edit Menu</button>
        <button>Add an owner</button>
        <button onClick={() => closeBusiness()}>Close</button>
      </div>
      <div className='profilePreview'>
        <MerchantProfile merchant={merchant}/>
      </div>
    </div>
  )
};

export default EditPopupProfile;