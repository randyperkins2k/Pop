import React, { useState } from 'react';

const Window = ({ merchant }) => {

  return (
    <div>
      <span></span>
      <h2>{merchant.name}</h2>
      <h2>{merchant.website}</h2>
      <button>Profile</button>
    </div>
  )
}

export default Window;