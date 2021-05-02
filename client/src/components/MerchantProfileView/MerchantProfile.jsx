import React, { useState } from 'react';
import ToggleSwitch from '../ToggleSwitch.jsx'
import { Link } from 'react-router-dom';

const MerchantProfile = ({ merchant, user, userSubs }) => {


  return (

    <div>
      <div>
        <h5>{merchant.name}</h5>
        <img/>
        <h2>Info</h2>
        <p>
          {merchant.info}
        </p>
      </div>
      <button onClick={() => console.log(merchant.id, userSubs)}>View Menu</button>
      <button>Locate</button>
      <div>
      <h5>Leave a review:</h5>
        <form onSubmit={(e) => {
          e.preventDefault();

        }}>
          <input type="text" maxlength="255"></input>
          <button>Submit</button>
        </form>
      </div>
      <div>
        <h5>Reviews:</h5>
        {merchant.Reviews.map(review => <p><b>{review.User.name}</b>: {review.message}</p>)}
      </div>
    </div>
  )
};

export default MerchantProfile;