import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile.jsx'
import styled from 'styled-components';


const EditProfileBtn = styled.button`
  margin-left: 56px;
  background-color: white;
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  border-radius: 6px;
`


const UserProfile = ({ user }) => {
  const [editWindowOpen, setEditWindowOpen] = useState(false);

  return (
    <div>
      <h5>User Profile Page</h5>
      <img src={user.picture}/>
      <h5>{user.name}</h5>
      <h5>{user.email}</h5>
      <h5>Phone</h5>
      <EditProfileBtn onClick={() => setEditWindowOpen(true)}>Edit Your Profile</EditProfileBtn>
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
