import React, { useState } from 'react';
import ToggleSwitch from '../ToggleSwitch.jsx'
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components'

const MerchantProWrap = styled.div`
text-align: center;
`


const ViewMenuBtn = styled.button`
  text-align: center;
  color: black;
  font-family: 'Ubuntu';
  padding: 5px 16px;
  background-color: white;
  font-size: 11px;
  border-radius: 6px;
  border-width: 1px;
  border-color: lightgray;
  transition: ease 0.01s all;
  ${props => props.viewMenuPrimary && css`
opacity: .5;
color: black;
background-color: #ffd1dc;
font-size: 11.25px;
`}
`
const LocateBtn = styled.button`
  text-align: center;
  color: black;
  font-family: 'Ubuntu';
  padding: 5px 16px;
  background-color: white;
  font-size: 11px;
  border-radius: 6px;
  border-width: 1px;
  border-color: lightgray;
  transition: ease 0.01s all;
  ${props => props.locatePrimary && css`
opacity: .5;
color: black;
background-color: #ffd1dc;
font-size: 11.25px;
`}
`
const H2 = styled.div`
font-family: 'Ubuntu';
text-align: center;
`
const P = styled.div`
font-family: 'Ubuntu';
text-align: center;
margin-top: 30px;
`



const MerchantProfile = ({ merchant, user, userSubs }) => {
  const [ locatePrimary, setLocatePrimary ] = useState(false)
  const [ viewMenuPrimary, setViewMenuPrimary ] = useState(false)
  console.log('viewMenuPrimary', viewMenuPrimary)



  return (

    <MerchantProWrap>
      <div>
        <H2>{merchant.name}</H2>
        <img/>
        <H2>Info</H2>
        <p>
          {merchant.info}
        </p>
      </div>
      <LocateBtn 
      locatePrimary={locatePrimary}
      onClick={() => {
        setLocatePrimary(!locatePrimary)
        setViewMenuPrimary(false)
      }}>Locate</LocateBtn><br/>
      <ViewMenuBtn
      viewMenuPrimary={viewMenuPrimary}
      onClick={() => {
        setViewMenuPrimary(!viewMenuPrimary)
        setLocatePrimary(false)
        console.log('hey there', merchant.id, userSubs)
       }}>View Menu</ViewMenuBtn>
      <div>
        <P>Upload a photo</P>
      </div>
    </MerchantProWrap>
  )
};

export default MerchantProfile;