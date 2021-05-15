import React, { useState, useEffect } from 'react';
import MerchantProfile from '../../MerchantProfileView/MerchantProfile.jsx';
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const H2 = styled.div`
margin-top: 15px;
color:#f5abc9;
font-size: 1.5rem;
`

const Div = styled.div`
margin-top: 1px;

`

const EditInfo = ({ merchant, selectMerchant, yourPopups, setYourPopups, userSubs, setUserSubs, merchData, setMerchData }) => {
  //console.log(merchant.info);
  const { t } = useTranslation()
  const [text, setText] = useState(merchant.info);
  const updateInfo = () => {
    console.log(text);
    if (text) {
      axios.put('/api/merchants/updateinfo', {
        id: merchant.id, info: text
      })
      .then(result => {
        console.log(result.data)
        const updatedMerchant = Object.assign({}, merchant);
        updatedMerchant.info = text;
        selectMerchant(updatedMerchant);
        //update merch data
        const updatedMerchData = merchData.slice();
        updatedMerchData.forEach(merch => {
          if (merch.id === merchant.id) {
            merch.info = text;
          }
        });
        setMerchData(updatedMerchData);
        //update your popups
        const updatedYourPopups = yourPopups.slice();
        updatedYourPopups.forEach(merch => {
          if (merch.id === merchant.id) {
            merch.info = text;
          }
        });
        setYourPopups(updatedYourPopups);
        //update userSubs
        const updatedSubs = userSubs.slice();
        updatedSubs.forEach(merch => {
          if (merch.id === merchant.id) {
            merch.info = text;
          }
        });
        setUserSubs(updatedSubs);
        //clear text field
        setText('');
      })
      .catch(err => console.log(err));
    }
  };

  return (
  <div>
    <div>
      <H2> {t("editTxt")} {`${merchant.name}'s`}: </H2>
      <br/>
      <hr/>
      <br/>
      <input value={text} onChange={(e) => setText(e.target.value) }></input>
      <Div></Div>
      <button
      onClick={ ()=> updateInfo()}>{t("updateInfoBtn")}</button>
    </div>
    <br></br>
    <div>
      <MerchantProfile merchant={merchant} style={{fontFamily: 'Ubuntu'}}/>
    </div>
  </div>
  )
};

export default EditInfo;
