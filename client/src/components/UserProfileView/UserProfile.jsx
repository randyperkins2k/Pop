import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile.jsx'
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next'

const Div2 = styled.div`
margin: 30px;
`
const Div = styled.div`

margin: 53px 0 6px ;
`

const UserProfile = ({ user }) => {
  const [editWindowOpen, setEditWindowOpen] = useState(false);
  const {t} = useTranslation()
console.log(user)
  return (
    <div>
      <h1>{t("userProfileTxt")}</h1>
      <hr/>
      <Div2></Div2>
      <img src={user.picture}/>
      <br/>
      <br/>
      <h5>{user.name}</h5>
      <br/>
      <h5>{user.email}</h5>
      <Div></Div>
      <button 
       onClick={() => {
         setEditWindowOpen(true)
      }}>{t("editYourProfileBtn")}</button>
      {
        editWindowOpen ?
        <EditProfile close={setEditWindowOpen}/>
        :
        ''
      }
    </div>
  )
};
///
export default UserProfile;
