import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import YourPopupView from './YourPopupView.jsx';
import styled from 'styled-components';
import CreatePop from './CreatePop.jsx'

const Create = styled.button`
  margin-left: -1px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
`

const YourPopUps = ({ merchData, selectMerch }) => {
  const [ yourPopups, setYourPopups ] = useState();
  const [ adminId, setAdminId] = useState(231);

  // useEffect(() =>{
  //   setYourPopups(() => {
  //    return merchData.merchants.filter(merch => merch.admin_id === adminId);
  //   })
  // },[])

  return (
    <div>
      <h5>Your popups page</h5>
      <Link to='/create'>
      <Create onClick={() => console.log(!!yourPopups)}>Create a Pop Up</Create>
      </Link>
      { yourPopups ? 
        yourPopups.map(merch => {
          return <YourPopupView 
            key={merch.id} 
            merchant={merch}
            selectMerch={selectMerch}
            />
          })
          :
          <h3>You don't own any Pop Ups</h3>
        }
    </div>
  )
};

export default YourPopUps;