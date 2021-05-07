import React, { useState, useEffect } from 'react';
import MerchantProfile from '../../MerchantProfileView/MerchantProfile.jsx';
import axios from 'axios';
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const Div = styled.div`
text-align: center;
font-family: 'Ubuntu';
 h3 {
   margin-top: 36px;

 }
 button {
  color: black;
  font-family: 'Ubuntu';
  padding: 5px 16px;
  background-color: white;
  font-size: 11px;
  border-radius: 6px;
  border-width: 1px;
  border-color: lightgray;
  }
  input {
    box-sizing:border-box;
    margin-top: 18px;
    margin-bottom: 18px;
    background-color: #fafafa;
    width:80%;
    resize: vertical;
    padding:21px;
    border-radius:15px;
    border:0;
    box-shadow:4px 4px 10px;
 }
`



const EditInfo = ({ merchant, selectMerchant, yourPopups, setYourPopups, userSubs, setUserSubs, merchData, setMerchData }) => {
  //console.log(merchant.info);
  const [ updateInfoPrimary, setUpdateInfoPrimary ] = useState(false)
  const { t } = useTranslation()
  const [text, setText] = useState(merchant.info);
  const updateInfo = () => {
    console.log(text);
    if (text) {
      axios.put('/api/merchant/updateinfo', {
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
  <Div>
    <div>
      <h3> {t("editTxt")} {`${merchant.name}'s`}: </h3>
      <input value={text} onChange={(e) => setText(e.target.value) }></input>
      <button
      updateInfoPrimary={updateInfoPrimary} 
      onClick={ ()=> updateInfo()}>{t("updateInfoBtn")}</button>
    </div>
    <br></br>
    <div>
      <MerchantProfile merchant={merchant} style={{fontFamily: 'Ubuntu'}}/>
    </div>
  </Div>
  )
};

export default EditInfo;
