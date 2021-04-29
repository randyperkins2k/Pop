import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import YourPopupView from './YourPopupView.jsx';

const YourPopUps = ({ merchData, selectMerch }) => {
  const [ yourPopups, setYourPopups ] = useState([]);
  const [ adminId, setAdminId] = useState(231);

  useState(() =>{
    setYourPopups(() => {
     return merchData.merchants.filter(merch => merch.admin_id === adminId);
    })
  },[])

  return (
    <div>
      <h5>Your popups page</h5>
      {
        yourPopups.map(merch => {
          return <YourPopupView 
            key={merch.id} 
            merchant={merch}
            selectMerch={selectMerch}
            />
        })
      }
    </div>
  )
};

export default YourPopUps;