import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile.jsx'
import styled, { css } from 'styled-components';
import { useTranslation } from 'react-i18next'

// const EditProfileBtn = styled.button`
//   margin-left: 11px;
//   margin-top: 30px;
//   background-color: white;
//   border-style: solid;
//   border-width: 1px;
//   border-color: lightgray;
//   border-radius: 6px;
//   transition: .01s;
//   ${props => props.editProfilePrimary && css`
//   opacity: .5;
//   color: black;
//   background-color: #ffd1dc;
//   font-size: 11.25px;
//   `}
// `
// const ProfileWrap = styled.div`
//   margin-top: 30px;
//   text-align: center;
//   font-family: 'Ubuntu';
// `

const UserProfile = ({ user }) => {
  const [editWindowOpen, setEditWindowOpen] = useState(false);
  const [editProfilePrimary, setEditProfilePrimary] = useState(false)
  const {t} = useTranslation()
console.log(user)
  return (
    <div>
      <h5>{t("userProfileTxt")}</h5>
      <img src={user.picture}/>
      <br/>
      <br/>
      <h5>{user.name}</h5>
      <br/>
      <h5>{user.email}</h5>
      <button 
      editProfilePrimary={editProfilePrimary}
       onClick={() => {
         setEditWindowOpen(true)
         setEditProfilePrimary(!editProfilePrimary)
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
