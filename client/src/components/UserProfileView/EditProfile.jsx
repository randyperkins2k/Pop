import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EditProfile = ({ close }) => {
  
  return (
    <div>
      <h3>Edit your Profile</h3>
      <a onClick={() => close(false)}>X</a>
      <input placeholder='Phone number'></input>
      <input placeholder='email address'></input>
      <input placeholder='Phone number'></input>
    </div>
  )
};

export default EditProfile;