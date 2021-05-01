import React, { useState } from 'react';
import ToggleSwitch from '../ToggleSwitch.jsx'
import { Link } from 'react-router-dom';

const MerchantProfile = ({ merchant, user, userSubs }) => {

  
  return (

    <div>
      <div>
        <h5>{merchant.name}</h5>
        <img/>
        <h2>Info</h2>
        <p>
          {merchant.info}
        </p>
      </div>
      <button onClick={() => console.log(merchant.id, userSubs)}>View Menu</button>
      <button>Locate</button>
      <div>
        <h5>Picture Feed Will Go Here</h5>
      </div>
    </div>
  )
};

export default MerchantProfile;