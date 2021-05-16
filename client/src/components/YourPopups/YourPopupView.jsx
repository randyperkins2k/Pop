import React, { useState } from 'react';
import EditPopupProfile from './EditPopUp/EditPopupProfile.jsx';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components'
import axios from 'axios';
import { useTranslation } from 'react-i18next'

const H1 = styled.h1`
    margin-top: 3px;
    margin-bottom: 16px;
    font-family: 'Londrina Solid', cursive;
    color: #fff;
    text-align: center;
    margin-bottom: .5rem;
`

const YourPopupView = ({ merchant, selectMerch, yourPopups, setYourPopups, merchData, setMerchData, userSubs, setUserSubs }) => {
  //lets get rid of some of these popups
  const {t} = useTranslation()
  console.log('hello from your popup');
  console.log(merchant);
  const deleteMerch = () => {
    if (confirm(`${t("doYouWantToDelete")} ${merchant.name}?`) === true) {
      console.log('deleted');
      console.log(merchant.id, typeof merchant.id);
      axios.delete(`/api/merchants/delete/${merchant.id}`)
        .then(results => {
          console.log(results.data);
          const yourPopupsCopy = yourPopups.slice();
          const merchDataCopy = merchData.slice();
          const userSubsCopy = userSubs.slice();
          setYourPopups(yourPopupsCopy.filter(merch => merch.id !== merchant.id));
          setMerchData(merchDataCopy.filter(merch => merch.id !== merchant.id));
          setUserSubs(userSubsCopy.filter(merch => merch.id !== merchant.id));
        })
    } else {
      console.log('not deleted');
    }
  };

  return (
    <div className="merchant-listing">
      <div>
        <img></img>
        <span></span>
        {
          merchant.isOpen ?
          <h3>{t('openTxt')}</h3> :
          <h3>{t('closedTxt')}</h3>
        }
        <H1>{merchant.name}</H1>
        <h2></h2>
        <Link
          to={`/edit`}
        >
          <button
          onClick={() => {
            selectMerch(merchant)
            }}>{t('editBtn')}</button>
        </Link>
        <button
          onClick={() => {
            deleteMerch(merchant)
            }}>{t('deleteBtn')}</button>
            <br/>
            <br/>
      </div>
    </div>
  )
};

export default YourPopupView;