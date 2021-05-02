import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import YourPopupView from './YourPopupView.jsx';
import styled, { css } from 'styled-components';
import CreatePop from './CreatePop.jsx'

const Create = styled.button`
  margin-top: 30px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-radius: 6px;
  transition: .01s;
  ${props => props.createPopUpPrimary && css`
  opacity: .5;
  color: black;
  background-color: #ffd1dc;
  font-size: 11.25px;
  `}
`
const YourPopWrap = styled.div`
  margin-top: 60px;
  text-align: center;
  font-family: 'Ubuntu';
  div {
    margin-top: 30px;
    color: #ffd1dc;
    margin-bottom: 30px:
    
    
  }
`

const YourPopUps = ({ yourPopups, setYourPopups, merchData, selectMerch, setSelectedMerchant }) => {
  const [createPopUpPrimary, setCreatePopUpPrimary] = useState(false)
  //const [ yourPopups, setYourPopups ] = useState();
  //const [ adminId, setAdminId] = useState(231);

  // useEffect(() =>{
  //   setYourPopups(() => {
  //    return merchData.merchants.filter(merch => merch.admin_id === adminId);
  //   })
  // },[])

  return (
    <YourPopWrap>
      <h5>Your pop ups</h5>
      <Link to='/create'>
      <Create 
      createPopUpPrimary={createPopUpPrimary} 
      onClick={() => {
        console.log(!!yourPopups)
        setCreatePopUpPrimary(!createPopUpPrimary)
      }}>Create a Pop Up</Create>
      </Link>
        <div>
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
    </YourPopWrap>
  )
};

export default YourPopUps;