import React, { useState } from 'react';
import EditPopupProfile from './EditPopUp/EditPopupProfile.jsx';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components'

const EditMerchBtn = styled.button`

color: black;
font-family: 'Ubuntu';
padding: 6px 16px;
background-color: white;
font-size: 11px;

border-radius: 6px;
border-width: 1px;
border-color: lightgray;
transition: ease 0.01s all;

margin-top:3px;
`

const YourPopupView = ({ merchant, selectMerch, yourPopups, setYourPopups, merchData, setMerchData, userSubs, setUserSubs }) => {
  //lets get rid of some of these popups
  const deleteMerch = () => {
    if (confirm(`Do you want to delete ${merchant.name}?`) === true) {
      console.log('deleted');
    } else {
      console.log('not deleted');
    }
  };

  return (
    <div className="merchant-listing">
      <div>
        <img></img>
        <span></span>
        <h2>{merchant.name}</h2>
        <h2></h2>
        <Link
          to={`/edit`}
        >
          <EditMerchBtn
          onClick={() => {
            selectMerch(merchant)
            }}>Edit</EditMerchBtn>
        </Link>
        <EditMerchBtn
          onClick={() => {
            deleteMerch(merchant)
            }}>Delete</EditMerchBtn>
      </div>
    </div>
  )
};

export default YourPopupView;