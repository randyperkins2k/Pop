import React, { useState, useEffect } from 'react';
import MerchantProfile from '../../MerchantProfileView/MerchantProfile.jsx';
import axios from 'axios';

const EditInfo = ({ merchant, selectMerchant, yourPopups, setYourPopups, userSubs, setUserSubs, merchData, setMerchData }) => {
  //console.log(merchant.info);
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
  <div>
    <div>
      <h3>edit {`${merchant.name}'s`} {t("infoTxt")}: </h3>
      <textarea value={text} onChange={(e) => setText(e.target.value) }></textarea>
      <button onClick={ ()=> updateInfo()}>update info</button>
    </div>
    <br></br>
    <div>
      <MerchantProfile merchant={merchant} style={{fontFamily: 'Ubuntu'}}/>
    </div>
  </div>
  )
};

export default EditInfo;
