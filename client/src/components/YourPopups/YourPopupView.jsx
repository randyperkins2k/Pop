import React, { useState } from 'react';
import EditPopupProfile from './EditPopUp/EditPopupProfile.jsx';
import { Link } from 'react-router-dom';

const YourPopupView = ({ merchant, selectMerch }) => {

  return (
    <div className="merchant-listing">
      <li>
        <img></img>
        <span></span>
        <h2>{merchant.name}</h2>
        <h2></h2>
        <Link
          to={`/edit`}
        >
          <button onClick={() => selectMerch(merchant)}>Edit</button>
        </Link>
      </li>
    </div>
  )
};

export default YourPopupView;