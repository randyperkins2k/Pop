import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditProfile from './EditProfile.jsx'


const UserProfile = ({ user }) => {
  const [editWindowOpen, setEditWindowOpen] = useState(false);

  return (
    <div>
      <h5>User Profile Page</h5>
      <img src={user.picture}/>
      <h5>{user.name}</h5>
      <h5>{user.email}</h5>
      <h5>Phone</h5>
      <button onClick={() => setEditWindowOpen(true)}>Edit Your Profile</button>
      {
        editWindowOpen ?
        <EditProfile close={setEditWindowOpen}/>
        :
        ''
      }
    </div>
  )
};

export default UserProfile;
