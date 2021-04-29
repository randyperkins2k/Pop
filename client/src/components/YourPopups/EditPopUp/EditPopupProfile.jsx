import React, { useState } from 'react';
import MerchantProfile from '../../MerchantProfileView/MerchantProfile.jsx';
import { Link } from 'react-router-dom';
// import * as merchData from '../../openMerch.json';
// const merchant = merchData.merchants[0];

const EditPopupProfile = ({ merchant }) => {

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
        <button></button>
        <button></button>
        <button></button>
      </div>
      <div className='profilePreview'>
        <MerchantProfile merchant={merchant}/>
      </div>
    </div>
  )
};

export default EditPopupProfile;