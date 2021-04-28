import React, { useState } from 'react';
import './ListView.css'

const MerchList = ({ merchant }) => {

  return (
    <div className="merchant-listing">
      <li>
        <img></img>
        <span></span>
        <h2>{merchant.name}</h2>
        <h2></h2>
        <button>profile</button>
      </li>
    </div>
  )
};

export default MerchList;