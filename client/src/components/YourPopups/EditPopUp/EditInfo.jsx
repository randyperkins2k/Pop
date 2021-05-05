import React, { useState, useEffect } from 'react';
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
      })
      .catch(err => console.log(err));
    }
  };

  return (
  <div>
    <h3>edit {`${merchant.name}'s`} info: </h3>
    <textarea value={text} onChange={(e) => setText(e.target.value) }></textarea>
    <button onClick={ ()=> updateInfo()}>update info</button>
  </div>
  )
};

export default EditInfo;
